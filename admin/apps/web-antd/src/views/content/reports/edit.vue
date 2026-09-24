<script lang="ts" setup>
import type { ReportInput, SolutionKey } from '#/api/content';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
  Textarea,
} from 'ant-design-vue';

import {
  createReportApi,
  getAdminReportApi,
  updateReportApi,
} from '#/api/content';

import ImageField from '../shared/ImageField.vue';
import {
  reportTypeOptions,
  solutionKeyOptions,
  statusOptions,
} from '../shared/options';

defineOptions({ name: 'ContentReportEdit' });

const route = useRoute();
const router = useRouter();
const reportId = computed(() => {
  const raw = Number(route.params.id);
  return Number.isInteger(raw) && raw > 0 ? raw : null;
});
const isEdit = computed(() => reportId.value !== null);

const loading = ref(false);
const saving = ref(false);

const form = reactive<
  Omit<ReportInput, 'solutionKey'> & { solutionKey?: SolutionKey }
>({
  category: '',
  featured: false,
  href: '',
  image: '',
  solutionKey: undefined,
  sortOrder: 0,
  status: 'draft',
  summary: '',
  title: '',
  type: '白皮书',
});

onMounted(async () => {
  if (!isEdit.value) {
    return;
  }
  const id = reportId.value;
  if (id === null) {
    return;
  }
  loading.value = true;
  try {
    const payload = await getAdminReportApi(id);
    Object.assign(form, {
      category: payload.category,
      featured: payload.featured,
      href: payload.href,
      image: payload.image,
      solutionKey: payload.solutionKey,
      sortOrder: payload.sortOrder,
      status: payload.status,
      summary: payload.summary,
      title: payload.title,
      type: payload.type,
    });
  } finally {
    loading.value = false;
  }
});

async function save(publish = false) {
  const payload: ReportInput = {
    ...form,
    solutionKey: form.solutionKey ?? null,
    status: publish ? 'published' : form.status,
  };
  saving.value = true;
  try {
    const id = reportId.value;
    await (id === null
      ? createReportApi(payload)
      : updateReportApi(id, payload));
    message.success(publish ? '已发布' : '已保存');
    router.push('/content/reports');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="p-4">
    <Form :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
      <FormItem label="标题" required>
        <Input v-model:value="form.title" :maxlength="500" />
      </FormItem>
      <FormItem label="类型" required>
        <Select
          v-model:value="form.type"
          :options="reportTypeOptions"
          style="max-width: 240px"
        />
      </FormItem>
      <FormItem label="分类" required>
        <Input
          v-model:value="form.category"
          :maxlength="200"
          placeholder="企业 AI / 数据要素 …"
          style="max-width: 240px"
        />
      </FormItem>
      <FormItem label="方案分类">
        <Select
          v-model:value="form.solutionKey"
          allow-clear
          :options="solutionKeyOptions"
          style="max-width: 240px"
        />
      </FormItem>
      <FormItem label="摘要" required>
        <Textarea v-model:value="form.summary" :rows="3" />
      </FormItem>
      <FormItem label="封面图" required>
        <ImageField v-model:value="form.image" />
      </FormItem>
      <FormItem label="下载链接" required>
        <Input
          v-model:value="form.href"
          placeholder="https://...（全站唯一，冲突返回 409）"
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
      <FormItem label="推荐到首页">
        <Switch v-model:checked="form.featured" />
        <span class="ml-2 text-xs text-gray-400">
          推荐且已发布的报告在新闻之后补足首页推荐位（按排序，最多共 4 条）
        </span>
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
        <Button @click="router.push('/content/reports')">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
