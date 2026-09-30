<script lang="ts" setup>
import type { ComponentRegistryEntry, HeroVisualEntry } from '#/api/components';
import type { PageInput, PageSection } from '#/api/pages';
import type { SectionPreset } from '#/api/presets';

import { computed, onActivated, onMounted, onUnmounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Button,
  Drawer,
  Form,
  FormItem,
  Input,
  InputNumber,
  message,
  RadioGroup,
  Select,
  Textarea,
} from 'ant-design-vue';

import { getComponentsApi } from '#/api/components';
import { createPageApi, getAdminPageApi, updatePageApi } from '#/api/pages';
import { listPresetsApi } from '#/api/presets';

import {
  parseJsonField,
  statusOptions,
  toJsonText,
} from '../content/shared/options';
import SectionsEditor from './components/SectionsEditor.vue';
import {
  createSection,
  customSectionOptions,
  sectionTypeOptions,
} from './sections';

defineOptions({ name: 'PageEdit' });

const route = useRoute();
const router = useRouter();
// slug 含斜杠（/solutions/x），走 query 传参避免路径参数编码问题
const pageSlug = computed(() => {
  const raw = route.query.slug;
  return typeof raw === 'string' && raw ? raw : null;
});
const isEdit = computed(() => pageSlug.value !== null);

const loading = ref(false);
const saving = ref(false);

const form = reactive<PageInput>({
  sections: [],
  seoDescription: '',
  slug: '',
  sortOrder: 0,
  status: 'draft',
  title: '',
});
const sectionsText = ref('');
// 结构化 / JSON 高级双模式：切结构化时先解析 JSON 草稿，失败则留在 JSON 模式
const sectionMode = ref<'json' | 'structured'>('structured');

// 组件管理（015.12）：新增区块下拉按启停过滤；拉取失败回退全量（不影响已编辑内容）
// 组件注册表（015.13）：custom props 描述符表单数据源；模板库供面板拖入
const disabledComponents = ref<string[]>([]);
const customComponents = ref<ComponentRegistryEntry[]>([]);
const heroVisuals = ref<HeroVisualEntry[]>([]);
// 015.19d：hero 视觉纳入组件启停后，split-visual 视觉下拉同步按禁用过滤
const enabledHeroVisuals = computed(() =>
  heroVisuals.value.filter((visual) => !disabledComponents.value.includes(visual.name)),
);
const presets = ref<SectionPreset[]>([]);
const enabledSectionTypeOptions = computed(() =>
  sectionTypeOptions.filter(
    (option) => !disabledComponents.value.includes(option.value),
  ),
);
const enabledCustomSectionOptions = computed(() =>
  customSectionOptions.filter(
    (option) => !disabledComponents.value.includes(option.value),
  ),
);
const enabledCustomComponents = computed(() =>
  customComponents.value.filter(
    (entry) => !disabledComponents.value.includes(entry.name),
  ),
);

async function loadPresets() {
  try {
    const payload = await listPresetsApi();
    presets.value = payload.presets;
  } catch {
    // 拉取失败回退空模板列表
  }
}

// 草稿预览（015.13）：iframe 加载主站 ?preview=1（cookie 同站共享）；未保存新页禁用
// 实时预览（015.19e）：live=1 + Drawer 打开后把未保存 sections postMessage 给 iframe（origin 双向白名单，绝不 '*'）
const previewOpen = ref(false);
const previewStamp = ref(0);
// 预览 slug 只接受站内绝对路径：route.query.slug 可被构造，不过滤协议会把
// javascript:/data: 送进同源 iframe 的 src，形成管理员上下文执行面
// （'*' 余量兼容首页 '/'；下划线兼容接管路径 /about_us）
const PREVIEW_SLUG_RE = /^\/[a-z0-9_/-]*$/;
const previewFrame = useTemplateRef<HTMLIFrameElement>('previewFrame');
const previewUrl = computed(() => {
  const base = import.meta.env.DEV ? 'http://localhost:3000' : '';
  const slug = form.slug || pageSlug.value || '';
  if (!PREVIEW_SLUG_RE.test(slug)) return '';
  return `${base}${slug}?preview=1&live=1&_t=${previewStamp.value}`;
});

const LIVE_PREVIEW_TYPE = 'dt-cms-live-preview';
const LIVE_READY_TYPE = 'dt-cms-live-preview-ready';
const liveTargetOrigin = import.meta.env.DEV
  ? 'http://localhost:3000'
  : window.location.origin;

function currentPreviewSections(): null | PageSection[] {
  if (sectionMode.value === 'json') {
    return parseJsonField(sectionsText.value) as null | PageSection[];
  }
  return form.sections;
}

function postLivePreview() {
  const frame = previewFrame.value;
  if (!previewOpen.value || !frame?.contentWindow) return;
  const sections = currentPreviewSections();
  if (!sections) return; // JSON 模式解析失败不 post，主站侧保持上一帧
  // form.sections 是 reactive 代理，postMessage 结构化克隆会 DataCloneError → 先转纯对象
  const plainSections = JSON.parse(JSON.stringify(sections)) as PageSection[];
  frame.contentWindow.postMessage(
    {
      payload: {
        seoDescription: form.seoDescription,
        title: form.title,
        sections: plainSections,
      },
      type: LIVE_PREVIEW_TYPE,
    },
    liveTargetOrigin,
  );
}

let liveTimer: null | ReturnType<typeof setTimeout> = null;
function scheduleLivePreview() {
  if (liveTimer) clearTimeout(liveTimer);
  liveTimer = setTimeout(postLivePreview, 300);
}

// 主站页 hydration 完成后回发 ready：iframe @load 首发常早于监听器挂载，靠握手补发首帧
function onPreviewReady(event: MessageEvent) {
  if (event.origin !== liveTargetOrigin) return;
  const data = event.data as { type?: string } | null;
  if (data?.type !== LIVE_READY_TYPE) return;
  postLivePreview();
}

watch(
  [() => form.sections, sectionsText, sectionMode],
  scheduleLivePreview,
  { deep: true },
);
watch(previewOpen, (open) => {
  if (open) {
    window.addEventListener('message', onPreviewReady);
    scheduleLivePreview();
  } else {
    window.removeEventListener('message', onPreviewReady);
  }
});
onUnmounted(() => window.removeEventListener('message', onPreviewReady));
function openPreview() {
  if (!previewUrl.value) return;
  previewStamp.value = Date.now();
  previewOpen.value = true;
}

const sectionsPlaceholder =
  '[{"type":"richText","blocks":[{"type":"paragraph","text":"正文"}]}]';

function handleModeChange() {
  if (sectionMode.value === 'json') {
    sectionsText.value = toJsonText(form.sections);
    return;
  }
  const parsed = parseJsonField(sectionsText.value) as null | PageSection[];
  if (!parsed) {
    message.error('JSON 草稿无法解析，已留在 JSON 模式');
    sectionMode.value = 'json';
    return;
  }
  form.sections = parsed;
}

async function loadRecord() {
  if (!isEdit.value) {
    return;
  }
  const slug = pageSlug.value;
  if (slug === null) {
    return;
  }
  if (loading.value) {
    return;
  }
  loading.value = true;
  try {
    const payload = await getAdminPageApi(slug);
    Object.assign(form, payload);
    sectionsText.value = toJsonText(payload.sections);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await Promise.allSettled([
    (async () => {
      const payload = await getComponentsApi();
      disabledComponents.value = payload.disabled;
      customComponents.value = payload.registry;
      heroVisuals.value = payload.heroVisuals;
    })(),
    loadPresets(),
  ]);
  if (!isEdit.value) {
    form.sections = [createSection('richText')];
    sectionsText.value = toJsonText(form.sections);
    return;
  }
  await loadRecord();
});

// keep-alive 页签再次激活时重取最新记录，避免保存时用旧数据静默覆盖他人修改；
// 首次激活紧随 onMounted 触发，跳过以免双重拉取（组件/模板库仅挂载时拉取）
let activatedOnce = false;
onActivated(() => {
  if (activatedOnce) {
    void loadRecord();
  } else {
    activatedOnce = true;
  }
});

async function save(publish = false) {
  const sections =
    sectionMode.value === 'json'
      ? (parseJsonField(sectionsText.value) as null | PageSection[])
      : form.sections;
  if (!sections) {
    message.error('区块 sections JSON 格式错误（须为数组，可为空 []）');
    return;
  }
  const payload = {
    ...form,
    sections,
    status: publish ? ('published' as const) : form.status,
  };
  saving.value = true;
  try {
    if (isEdit.value) {
      const slug = pageSlug.value;
      if (slug === null) {
        return;
      }
      await updatePageApi(slug, {
        sections,
        seoDescription: form.seoDescription,
        sortOrder: form.sortOrder,
        status: payload.status,
        title: form.title,
      });
    } else {
      await createPageApi(payload);
    }
    message.success(publish ? '已发布' : '已保存');
    router.push('/pages');
  } catch {
    // 失败提示由请求拦截器统一弹出；此处吞掉避免 unhandled rejection
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <!-- 预览打开时给右侧腾出抽屉宽度：非模态抽屉不遮罩，但会盖住表单，靠 padding 让表单回流到左侧 -->
  <div :class="previewOpen ? 'p-4 pr-[56%]' : 'p-4'">
    <Form :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
      <FormItem label="页面路径" required>
        <Input
          v-model:value="form.slug"
          :disabled="isEdit"
          placeholder="/solutions/smart-retail（含前导斜杠，创建后不可改）"
        />
        <div class="mt-1 text-xs text-gray-400">
          小写字母/数字/连字符；代码路由与 /api /admin /cases /demo /news
          /uploads 前缀为保留路径
        </div>
      </FormItem>
      <FormItem label="页面标题" required>
        <Input
          v-model:value="form.title"
          :maxlength="500"
          placeholder="页面 H1 与浏览器标题"
        />
      </FormItem>
      <FormItem label="SEO 描述">
        <Textarea
          v-model:value="form.seoDescription"
          :maxlength="500"
          :rows="2"
        />
      </FormItem>
      <FormItem label="排序" required>
        <InputNumber v-model:value="form.sortOrder" :min="0" />
      </FormItem>
      <FormItem label="状态">
        <Select
          v-model:value="form.status"
          :options="statusOptions"
          style="max-width: 200px"
        />
      </FormItem>
      <FormItem label="区块 sections">
        <RadioGroup
          v-model:value="sectionMode"
          class="mb-2"
          option-type="button"
          :options="[
            { label: '结构化', value: 'structured' },
            { label: 'JSON', value: 'json' },
          ]"
          @change="handleModeChange"
        />
        <SectionsEditor
          v-if="sectionMode === 'structured'"
          v-model:sections="form.sections"
          :custom-components="enabledCustomComponents"
          :custom-section-options="enabledCustomSectionOptions"
          :hero-visuals="enabledHeroVisuals"
          :presets="presets"
          :section-type-options="enabledSectionTypeOptions"
          @preset-saved="loadPresets"
        />
        <Textarea
          v-else
          v-model:value="sectionsText"
          class="font-mono"
          :placeholder="sectionsPlaceholder"
          :rows="14"
        />
        <div class="mt-1 text-xs text-gray-400">
          支持 hero / metrics / featureGrid / cta / richText / logoStrip /
          imageBanner / custom 区块；服务端 zod 兜底校验
        </div>
      </FormItem>
      <FormItem :wrapper-col="{ offset: 3, span: 16 }">
        <Button
          :loading="saving"
          class="mr-2"
          type="primary"
          @click="save(false)"
        >
          保存
        </Button>
        <Button :loading="saving" class="mr-2" @click="save(true)">
          保存并发布
        </Button>
        <Button
          class="mr-2"
          :disabled="!isEdit"
          title="右侧非模态预览：不保存也能看到当前编辑内容"
          @click="openPreview"
        >
          预览草稿
        </Button>
        <Button @click="router.push('/pages')">返回</Button>
      </FormItem>
    </Form>

    <!-- 非模态（:mask="false"）+ 右侧半宽：左边改表单，右边实时看效果；带遮罩会拦截表单点击 -->
    <Drawer
      v-model:open="previewOpen"
      :mask="false"
      placement="right"
      title="草稿预览（实时同步未保存内容）"
      width="55%"
    >
      <iframe
        v-if="previewOpen && previewUrl"
        ref="previewFrame"
        class="h-full w-full border-0"
        :src="previewUrl"
        title="草稿预览"
        @load="postLivePreview"
      ></iframe>
    </Drawer>
  </div>
</template>
