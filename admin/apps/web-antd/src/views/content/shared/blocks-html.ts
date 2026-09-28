/**
 * ArticleBlock[] ↔ 富文本 HTML 双向转换（纯函数，无依赖）。
 * 存储协议不变：heading(2-4)/paragraph/list/quote/image/divider；
 * 行内格式（加粗/斜体/链接/颜色）靠 textContent 在 HTML→blocks 方向自然剥离。
 *
 * image.caption 以 <img title> 属性承载：tiptap Image 扩展（@tiptap/extension-image v3）
 * 原生声明 src/alt/title(/width/height) 属性，未声明属性（如 data-caption）会被编辑器
 * schema 剥离，导致 blocks→HTML→编辑器→HTML→blocks 往返丢失；title 为 null 时
 * prosemirror 序列化会跳过该属性，无 caption 的图片不产生冗余属性。
 * 公开站仍按协议以 block.caption → figcaption 渲染，服务端协议不变。
 */

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function clampHeadingLevel(level: unknown): number {
  const raw = typeof level === 'number' ? level : 2;
  return Math.min(4, Math.max(2, Math.round(raw)));
}

function asRecord(value: unknown): null | Record<string, unknown> {
  return value !== null && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : null;
}

function textOf(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function blocksToHtml(blocks: unknown[]): string {
  const parts: string[] = [];
  for (const raw of blocks) {
    const block = asRecord(raw);
    if (!block) continue;
    switch (block.type) {
      case 'divider': {
        parts.push('<hr>');
        break;
      }
      case 'heading': {
        const level = clampHeadingLevel(block.level);
        parts.push(`<h${level}>${escapeHtml(textOf(block.text))}</h${level}>`);
        break;
      }
      case 'image': {
        const src = escapeHtml(textOf(block.src));
        const alt = escapeHtml(textOf(block.alt));
        // caption → title（编辑器侧载体，见文件头注释）；无/纯空白 caption 不输出属性
        const caption = textOf(block.caption).trim();
        const title = caption === '' ? '' : ` title="${escapeHtml(caption)}"`;
        parts.push(`<p><img src="${src}" alt="${alt}"${title}></p>`);
        break;
      }
      case 'list': {
        const items = Array.isArray(block.items) ? block.items : [];
        const tag = block.ordered === true ? 'ol' : 'ul';
        const lis = items
          .map((item) => `<li>${escapeHtml(textOf(item))}</li>`)
          .join('');
        parts.push(`<${tag}>${lis}</${tag}>`);
        break;
      }
      case 'paragraph': {
        parts.push(`<p>${escapeHtml(textOf(block.text))}</p>`);
        break;
      }
      case 'quote': {
        parts.push(
          `<blockquote>${escapeHtml(textOf(block.text))}</blockquote>`,
        );
        break;
      }
      default: {
        break;
      }
    }
  }
  return parts.join('');
}

function imageBlockFrom(img: Element): null | Record<string, unknown> {
  const src = img.getAttribute('src') ?? '';
  if (!src) return null;
  // title 为 caption 的编辑器侧载体；空/纯空白不回写（保持协议字段稀疏）
  const caption = (img.getAttribute('title') ?? '').trim();
  return {
    alt: img.getAttribute('alt') || '正文配图',
    ...(caption === '' ? {} : { caption }),
    src,
    type: 'image',
  };
}

/** p 内只含 img（允许空白文本）时按 image 块处理 */
function paragraphImages(el: Element): Element[] {
  const imgs: Element[] = [];
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      if ((node.textContent ?? '').trim()) return [];
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return [];
    const child = node as Element;
    if (child.tagName === 'IMG') {
      imgs.push(child);
    } else if (child.tagName === 'BR') {
      continue;
    } else {
      return [];
    }
  }
  return imgs;
}

export function htmlToBlocks(html: string): {
  blocks: unknown[];
  problems: string[];
} {
  const blocks: unknown[] = [];
  const problems: string[] = [];
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const reportUnsupported = (tag: string) => {
    const label = `不支持的元素：<${tag}>`;
    if (!problems.includes(label)) problems.push(label);
  };

  for (const node of doc.body.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? '').trim();
      if (text) blocks.push({ text, type: 'paragraph' });
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const el = node as Element;
    const tag = el.tagName;

    if (/^H[1-6]$/.test(tag)) {
      const text = (el.textContent ?? '').trim();
      if (!text) continue;
      const level = clampHeadingLevel(Number(tag.slice(1)));
      blocks.push({ level, text, type: 'heading' });
      continue;
    }
    if (tag === 'P') {
      const imgs = paragraphImages(el);
      if (imgs.length > 0) {
        for (const img of imgs) {
          const block = imageBlockFrom(img);
          if (block) blocks.push(block);
        }
        continue;
      }
      const text = (el.textContent ?? '').trim();
      if (text) blocks.push({ text, type: 'paragraph' });
      continue;
    }
    if (tag === 'OL' || tag === 'UL') {
      const items: string[] = [];
      for (const li of el.children) {
        if (li.tagName !== 'LI') continue;
        const text = (li.textContent ?? '').trim();
        if (text) items.push(text);
      }
      if (items.length > 0) {
        blocks.push({ items, ordered: tag === 'OL', type: 'list' });
      }
      continue;
    }
    if (tag === 'BLOCKQUOTE') {
      const text = (el.textContent ?? '').trim();
      if (text) blocks.push({ text, type: 'quote' });
      continue;
    }
    if (tag === 'HR') {
      blocks.push({ type: 'divider' });
      continue;
    }
    if (tag === 'IMG') {
      const block = imageBlockFrom(el);
      if (block) blocks.push(block);
      continue;
    }
    reportUnsupported(tag.toLowerCase());
  }

  return { blocks, problems };
}
