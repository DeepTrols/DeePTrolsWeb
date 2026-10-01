// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { blocksToHtml, htmlToBlocks } from '../admin/apps/web-antd/src/views/content/shared/blocks-html'

/**
 * 审计#19：blocks-html 双向转换回环行为测试（此前仅有源码文本合同，见 backend-admin.mjs）。
 * 被测文件为 admin 侧纯函数（无依赖，仅浏览器全局 DOMParser/Node），由 happy-dom 提供 DOM 环境。
 * 存储协议：heading(2-4)/paragraph/list/quote/image/divider；
 * caption 以 <img title> 承载往返（tiptap Image 扩展只保留 src/alt/title，见被测文件头注释）。
 * escapeHtml/clampHeadingLevel 未导出，经 blocksToHtml/htmlToBlocks 输出间接断言。
 */

/** blocks → HTML → blocks，并断言产物 HTML 无 problems */
function roundTrip(blocks: unknown[]): unknown[] {
  const html = blocksToHtml(blocks)
  const { blocks: parsed, problems } = htmlToBlocks(html)
  expect(problems).toEqual([])
  return parsed
}

describe('blocksToHtml → htmlToBlocks 全类型回环', () => {
  it('六类 block 混合回环：字段逐一还原（无 caption 的图片不回写 caption 键）', () => {
    const blocks = [
      { type: 'paragraph', text: '第一段' },
      { type: 'heading', level: 2, text: '标题二' },
      { type: 'heading', level: 3, text: '标题三' },
      { type: 'heading', level: 4, text: '标题四' },
      { type: 'list', ordered: false, items: ['甲', '乙'] },
      { type: 'list', ordered: true, items: ['第一步', '第二步'] },
      { type: 'quote', text: '引言' },
      { type: 'image', src: '/uploads/a.png', alt: '配图A', caption: '图注A' },
      { type: 'image', src: '/uploads/b.png', alt: '配图B' },
      { type: 'divider' },
    ]
    expect(roundTrip(blocks)).toStrictEqual([
      { type: 'paragraph', text: '第一段' },
      { type: 'heading', level: 2, text: '标题二' },
      { type: 'heading', level: 3, text: '标题三' },
      { type: 'heading', level: 4, text: '标题四' },
      { type: 'list', ordered: false, items: ['甲', '乙'] },
      { type: 'list', ordered: true, items: ['第一步', '第二步'] },
      { type: 'quote', text: '引言' },
      { type: 'image', src: '/uploads/a.png', alt: '配图A', caption: '图注A' },
      { type: 'image', src: '/uploads/b.png', alt: '配图B' },
      { type: 'divider' },
    ])
  })

  it('规范化语义（按实现）：list 缺省 ordered 回环补 false；空 items 列表 / 空文本块回环后被丢弃', () => {
    expect(roundTrip([{ type: 'list', items: ['x'] }])).toStrictEqual([{ type: 'list', ordered: false, items: ['x'] }])
    expect(roundTrip([{ type: 'list', ordered: true, items: [] }])).toEqual([])
    expect(roundTrip([{ type: 'paragraph', text: '' }, { type: 'heading', level: 2, text: '' }, { type: 'quote', text: '  ' }])).toEqual([])
  })

  it('文本首尾空白回环被 trim（HTML→blocks 方向统一 trim）', () => {
    expect(roundTrip([{ type: 'paragraph', text: '  前后  ' }])).toStrictEqual([{ type: 'paragraph', text: '前后' }])
  })
})

describe('caption 经 img title 往返不丢（含转义字符）', () => {
  it('引号 / & / < / > / 单引号 caption 精确往返，HTML 中为转义形态', () => {
    const caption = '他说："A&B" <C> 与 \'D\''
    const html = blocksToHtml([{ type: 'image', src: '/uploads/x.png', alt: 'a', caption }])
    expect(html).toContain('title="他说：&quot;A&amp;B&quot; &lt;C&gt; 与 \'D\'"')
    expect(htmlToBlocks(html).blocks).toStrictEqual([
      { type: 'image', src: '/uploads/x.png', alt: 'a', caption },
    ])
  })

  it('src/alt 特殊字符同样精确往返（属性值无法被引号截断）', () => {
    const src = '/uploads/a&b"c.png'
    const html = blocksToHtml([{ type: 'image', src, alt: 'alt"&<>' }])
    expect(html).toContain('src="/uploads/a&amp;b&quot;c.png"')
    expect(html).toContain('alt="alt&quot;&amp;&lt;&gt;"')
    expect(htmlToBlocks(html).blocks).toStrictEqual([{ type: 'image', src, alt: 'alt"&<>' }])
  })

  it('空/纯空白 caption 不产生 title 属性，回环不回写 caption 键', () => {
    const html = blocksToHtml([{ type: 'image', src: '/s.png', alt: 'a', caption: '   ' }])
    expect(html).toBe('<p><img src="/s.png" alt="a"></p>')
    expect(htmlToBlocks(html).blocks).toStrictEqual([{ type: 'image', src: '/s.png', alt: 'a' }])

    const parsed = htmlToBlocks('<p><img src="/t.png" alt="a" title="   "></p>')
    expect(parsed.blocks).toStrictEqual([{ type: 'image', src: '/t.png', alt: 'a' }])
  })

  it('caption 首尾空白在 blocks→HTML 方向即被 trim', () => {
    const html = blocksToHtml([{ type: 'image', src: '/s.png', alt: 'a', caption: '  图注  ' }])
    expect(html).toContain('title="图注"')
    expect(htmlToBlocks(html).blocks).toStrictEqual([{ type: 'image', src: '/s.png', alt: 'a', caption: '图注' }])
  })
})

describe('escapeHtml 边界（经 blocksToHtml 输出间接断言）', () => {
  it('文本节点转义 & < > "，单引号按实现不转义', () => {
    expect(blocksToHtml([{ type: 'paragraph', text: '<script>alert("x")</script>&\'单引号\'' }]))
      .toBe('<p>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;\'单引号\'</p>')
  })

  it('已转义序列不被双重转义：&lt; → &amp;lt;，且回环稳定', () => {
    const html = blocksToHtml([{ type: 'paragraph', text: '&lt;' }])
    expect(html).toBe('<p>&amp;lt;</p>')
    expect(htmlToBlocks(html).blocks).toStrictEqual([{ type: 'paragraph', text: '&lt;' }])
  })

  it('属性值转义阻止引号逃逸（注入的 onload 停留在 src 值内）', () => {
    const malicious = 'a" onload="alert(1)'
    const html = blocksToHtml([{ type: 'image', src: malicious, alt: '' }])
    expect(html).toContain('src="a&quot; onload=&quot;alert(1)"')
    const { blocks } = htmlToBlocks(html)
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({ type: 'image', src: malicious })
  })

  it('列表项 / 引用 / 标题文本同样转义', () => {
    expect(blocksToHtml([{ type: 'list', items: ['<b>&"'] }])).toBe('<ul><li>&lt;b&gt;&amp;&quot;</li></ul>')
    expect(blocksToHtml([{ type: 'quote', text: '<q>' }])).toBe('<blockquote>&lt;q&gt;</blockquote>')
    expect(blocksToHtml([{ type: 'heading', level: 2, text: '<h>' }])).toBe('<h2>&lt;h&gt;</h2>')
  })
})

describe('clampHeadingLevel 边界（经 heading 输出标签间接断言）', () => {
  it('blocks→HTML：越界级别钳制到 2-4，小数四舍五入，非 number 回退 2', () => {
    const heading = (level: unknown) => blocksToHtml([{ type: 'heading', level, text: 'x' }])
    expect(heading(1)).toBe('<h2>x</h2>')
    expect(heading(0)).toBe('<h2>x</h2>')
    expect(heading(-5)).toBe('<h2>x</h2>')
    expect(heading(2)).toBe('<h2>x</h2>')
    expect(heading(2.4)).toBe('<h2>x</h2>')
    expect(heading(2.5)).toBe('<h3>x</h3>')
    expect(heading(3.5)).toBe('<h4>x</h4>')
    expect(heading(4)).toBe('<h4>x</h4>')
    expect(heading(5)).toBe('<h4>x</h4>')
    expect(heading(99)).toBe('<h4>x</h4>')
    expect(heading('3')).toBe('<h2>x</h2>')
    expect(heading(undefined)).toBe('<h2>x</h2>')
    expect(heading(null)).toBe('<h2>x</h2>')
  })

  it('HTML→blocks：h1-h6 标签级别同样钳制到 2-4', () => {
    const { blocks } = htmlToBlocks('<h1>a</h1><h3>b</h3><h5>c</h5><h6>d</h6>')
    expect(blocks).toStrictEqual([
      { type: 'heading', level: 2, text: 'a' },
      { type: 'heading', level: 3, text: 'b' },
      { type: 'heading', level: 4, text: 'c' },
      { type: 'heading', level: 4, text: 'd' },
    ])
  })
})

describe('未知节点与空输入行为', () => {
  it('blocksToHtml：未知 type 与非对象条目被静默跳过', () => {
    expect(blocksToHtml([])).toBe('')
    expect(blocksToHtml([null, undefined, 'text', 42, { type: 'video', src: 'v.mp4' }, { type: 'paragraph', text: 'ok' }]))
      .toBe('<p>ok</p>')
  })

  it('htmlToBlocks：未知元素不产块，进入 problems（标签小写、同名去重），其内容不被提取', () => {
    const { blocks, problems } = htmlToBlocks('<div>a</div><table><tr><td>1</td></tr></table><div>b</div><section>c</section>')
    expect(blocks).toEqual([])
    expect(problems).toEqual(['不支持的元素：<div>', '不支持的元素：<table>', '不支持的元素：<section>'])
  })

  it('htmlToBlocks：空串 / 纯空白 / 空元素 → 空 blocks 与空 problems', () => {
    expect(htmlToBlocks('')).toStrictEqual({ blocks: [], problems: [] })
    expect(htmlToBlocks('   ')).toStrictEqual({ blocks: [], problems: [] })
    expect(htmlToBlocks('<p></p><p>  </p><h2></h2><blockquote> </blockquote><ul></ul>')).toStrictEqual({ blocks: [], problems: [] })
  })

  it('htmlToBlocks：顶层裸文本按段落收纳；图片缺 src 被跳过；混合文本+图片的 p 退化为段落', () => {
    expect(htmlToBlocks('hello').blocks).toStrictEqual([{ type: 'paragraph', text: 'hello' }])
    expect(htmlToBlocks('<p><img alt="无src"></p>').blocks).toEqual([])
    expect(htmlToBlocks('<p>文字<img src="a.png"></p>').blocks).toStrictEqual([{ type: 'paragraph', text: '文字' }])
  })

  it('htmlToBlocks：同段多图（允许 br）逐图成块，alt 缺省回退「正文配图」', () => {
    const { blocks } = htmlToBlocks('<p><img src="a.png"><br><img src="b.png" title="t" alt="B"></p>')
    expect(blocks).toStrictEqual([
      { type: 'image', src: 'a.png', alt: '正文配图' },
      { type: 'image', src: 'b.png', alt: 'B', caption: 't' },
    ])
    expect(htmlToBlocks('<img src="c.png">').blocks).toStrictEqual([{ type: 'image', src: 'c.png', alt: '正文配图' }])
  })

  it('htmlToBlocks：行内格式（加粗/斜体/链接/颜色）自然剥离为纯文本段落', () => {
    const { blocks, problems } = htmlToBlocks('<p><strong>粗</strong>与<em>斜</em>与<a href="/x">链接</a>与<span>颜色</span></p>')
    expect(blocks).toStrictEqual([{ type: 'paragraph', text: '粗与斜与链接与颜色' }])
    expect(problems).toEqual([])
  })

  it('htmlToBlocks：列表仅收集 li 子元素，空白 li 过滤，全空列表不成块', () => {
    expect(htmlToBlocks('<ul><li>a</li><li>   </li><li>b</li></ul>').blocks)
      .toStrictEqual([{ type: 'list', ordered: false, items: ['a', 'b'] }])
    expect(htmlToBlocks('<ol><li>一</li></ol>').blocks)
      .toStrictEqual([{ type: 'list', ordered: true, items: ['一'] }])
    expect(htmlToBlocks('<ol><li> </li></ol>').blocks).toEqual([])
    expect(htmlToBlocks('<ul>散落文字<li>a</li></ul>').blocks)
      .toStrictEqual([{ type: 'list', ordered: false, items: ['a'] }])
  })
})
