<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { Button, message, Space, Table, Tag } from 'ant-design-vue';

import { requestClient } from '#/api/request';

defineOptions({ name: 'LeadsList' });

type LeadStatus = 'closed' | 'followed' | 'new';

interface LeadRecord {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
}

const statusText: Record<LeadStatus, string> = {
  closed: '已关闭',
  followed: '已跟进',
  new: '新线索',
};

const statusColor: Record<LeadStatus, string> = {
  closed: 'default',
  followed: 'orange',
  new: 'blue',
};

const leads = ref<LeadRecord[]>([]);
const loading = ref(false);
const updatingId = ref<null | number>(null);

async function fetchLeads() {
  loading.value = true;
  try {
    leads.value = await requestClient.get<LeadRecord[]>('/admin/leads');
  } finally {
    loading.value = false;
  }
}

async function setStatus(id: number, status: LeadStatus) {
  updatingId.value = id;
  try {
    await requestClient.request(`/admin/leads/${id}`, {
      data: { status },
      method: 'PATCH',
    });
    message.success('状态已更新');
    await fetchLeads();
  } finally {
    updatingId.value = null;
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('zh-CN', { hour12: false });
}

const columns = [
  { dataIndex: 'createdAt', title: '提交时间', width: 170 },
  { dataIndex: 'name', title: '姓名', width: 120 },
  { dataIndex: 'company', title: '公司', width: 160 },
  { dataIndex: 'contact', title: '联系方式', width: 180 },
  { dataIndex: 'message', ellipsis: true, title: '咨询内容' },
  { dataIndex: 'source', title: '来源', width: 110 },
  { dataIndex: 'status', title: '状态', width: 100 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 180 },
];

onMounted(fetchLeads);
</script>

<template>
  <div class="p-4">
    <Table
      :columns="columns"
      :data-source="leads"
      :loading="loading"
      :pagination="{
        pageSize: 20,
        showTotal: (total: number) => `共 ${total} 条`,
      }"
      row-key="id"
      :scroll="{ x: 1200 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'createdAt'">
          {{ formatTime(record.createdAt) }}
        </template>
        <template v-else-if="column.dataIndex === 'contact'">
          <div v-if="record.phone">{{ record.phone }}</div>
          <div v-if="record.email">{{ record.email }}</div>
          <span v-if="!record.phone && !record.email">—</span>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <Tag :color="statusColor[record.status as LeadStatus]">
            {{ statusText[record.status as LeadStatus] }}
          </Tag>
        </template>
        <template v-else-if="column.dataIndex === 'actions'">
          <Space>
            <Button
              v-if="record.status === 'new'"
              :loading="updatingId === record.id"
              size="small"
              type="primary"
              @click="setStatus(record.id, 'followed')"
            >
              标记跟进
            </Button>
            <Button
              v-if="record.status !== 'closed'"
              :loading="updatingId === record.id"
              size="small"
              @click="setStatus(record.id, 'closed')"
            >
              标记关闭
            </Button>
          </Space>
        </template>
      </template>
      <template #emptyText>
        暂无线索。提交官网 /contact
        表单后会出现在这里（未配置数据库时列表始终为空）。
      </template>
    </Table>
  </div>
</template>
