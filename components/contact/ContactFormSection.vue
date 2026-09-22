<script setup lang="ts">
import { reactive, ref } from 'vue'
import { $fetch } from '#imports'
import { aboutAddress, aboutContacts } from '~/data/about'

// 线索表单（Phase 2）：提交 POST /api/leads；website 为蜜罐字段，真实用户不可见、保持为空
const form = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  message: '',
  website: '',
})

const submitState = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const inputClass
  = 'h-12 w-full rounded-md border border-muted bg-white px-3 text-base text-highlighted outline-none transition-colors placeholder:text-muted/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25'

const phonePattern = /^1[3-9]\d{9}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function handleSubmit() {
  errorMessage.value = ''
  const name = form.name.trim()
  const company = form.company.trim()
  const phone = form.phone.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name || !message) {
    errorMessage.value = '请填写您的姓名与咨询内容。'
    return
  }
  if (!phone && !email) {
    errorMessage.value = '请至少留下手机号或邮箱，方便我们与您联系。'
    return
  }
  if (phone && !phonePattern.test(phone)) {
    errorMessage.value = '手机号格式不正确，请检查后重试。'
    return
  }
  if (email && !emailPattern.test(email)) {
    errorMessage.value = '邮箱格式不正确，请检查后重试。'
    return
  }

  submitState.value = 'submitting'
  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: { name, company, phone, email, message, source: '/contact', website: form.website },
    })
    submitState.value = 'success'
  }
  catch {
    submitState.value = 'error'
    errorMessage.value = '提交失败，请稍后重试，或发送邮件至 contact@deeptrols.com。'
  }
}

function resetForm() {
  form.name = ''
  form.company = ''
  form.phone = ''
  form.email = ''
  form.message = ''
  form.website = ''
  submitState.value = 'idle'
  errorMessage.value = ''
}
</script>

<template>
  <section class="flow-root pb-32 lg:pb-44" aria-labelledby="contact-form-title">
    <div class="container">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h2 id="contact-form-title" class="text-2xl font-semibold leading-tight text-highlighted sm:text-3xl">
            告诉我们您的业务场景
          </h2>
          <p class="mt-4 max-w-xl text-base leading-7 text-muted">
            留下您的需求与联系方式，顾问团队将结合数据底座、知识工程与智能体能力，为您梳理可落地的智能化路径。
          </p>

          <ul class="mt-10 flex flex-col gap-6">
            <li v-for="item in aboutContacts" :key="item.label">
              <span class="block text-sm text-muted">{{ item.label }}</span>
              <a
                :href="item.href"
                class="mt-1 block text-lg font-semibold text-highlighted transition-colors hover:text-primary"
              >
                {{ item.value }}
              </a>
            </li>
          </ul>

          <div class="mt-10 border-t border-muted pt-8">
            <span class="block text-sm text-muted">公司地址</span>
            <p class="mt-1 text-lg font-semibold text-highlighted">{{ aboutAddress }}</p>
          </div>
        </div>

        <div class="rounded-2xl border border-muted bg-white p-6 shadow-[0_0_16px_rgba(15,23,42,0.08)] sm:p-10">
          <div v-if="submitState === 'success'" class="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
            <span class="grid size-14 place-items-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-7"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            <h3 class="mt-6 text-xl font-semibold text-highlighted">提交成功</h3>
            <p class="mt-3 max-w-sm text-base leading-7 text-muted">
              我们已收到您的需求，顾问团队将在 1 个工作日内与您联系。
            </p>
            <button
              type="button"
              class="dt-button dt-button--secondary mt-8"
              @click="resetForm"
            >
              继续提交新需求
            </button>
          </div>

          <form v-else aria-label="线索提交表单" novalidate @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-highlighted" for="contact-name">姓名 *</label>
                <input id="contact-name" v-model="form.name" type="text" name="name" placeholder="您的姓名" autocomplete="name" :class="inputClass">
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-highlighted" for="contact-company">公司</label>
                <input id="contact-company" v-model="form.company" type="text" name="company" placeholder="公司 / 组织名称" autocomplete="organization" :class="inputClass">
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-highlighted" for="contact-phone">手机号</label>
                <input id="contact-phone" v-model="form.phone" type="tel" name="phone" placeholder="方便联系的手机号" autocomplete="tel" :class="inputClass">
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-highlighted" for="contact-email">邮箱</label>
                <input id="contact-email" v-model="form.email" type="email" name="email" placeholder="工作邮箱" autocomplete="email" :class="inputClass">
              </div>
            </div>

            <div class="mt-5">
              <label class="mb-2 block text-sm font-medium text-highlighted" for="contact-message">咨询内容 *</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                placeholder="简单描述您的业务场景、目标或想了解的产品与方案"
                class="min-h-32 w-full rounded-md border border-muted bg-white px-3 py-2 text-base text-highlighted outline-none transition-colors placeholder:text-muted/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
              />
            </div>

            <!-- 蜜罐字段：对真实用户不可见，机器人填写后服务端直接拒绝 -->
            <div class="hidden" aria-hidden="true">
              <label for="contact-website">网站</label>
              <input id="contact-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
            </div>

            <p class="mt-3 text-xs leading-5 text-muted">手机号与邮箱至少填写一项；提交即表示同意我们就本次需求与您联系。</p>

            <p v-if="errorMessage" class="mt-4 text-sm text-red-600" role="alert">{{ errorMessage }}</p>

            <button
              type="submit"
              class="dt-button dt-button--primary dt-button--lg mt-6 w-full"
              :disabled="submitState === 'submitting'"
            >
              {{ submitState === 'submitting' ? '提交中…' : '提交需求' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
