<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from '#imports'

// 页脚订阅：仅采集邮箱，POST /api/leads（source='/footer-subscribe' 便于后台区分订阅线索与联系表单）
const email = ref('')
const submitState = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 用户重新输入即清除上一次的成功/失败提示（提交中禁用输入，不会触发）
function resetStatus() {
  if (submitState.value === 'submitting') return
  submitState.value = 'idle'
  statusMessage.value = ''
}

async function handleSubmit() {
  // 防重复提交：提交中直接忽略后续触发（按钮/输入框亦已 disabled）
  if (submitState.value === 'submitting') return
  const value = email.value.trim()
  if (!value || !emailPattern.test(value)) {
    submitState.value = 'error'
    statusMessage.value = '请输入有效的邮箱地址。'
    return
  }

  submitState.value = 'submitting'
  statusMessage.value = ''
  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: { email: value, source: '/footer-subscribe' },
    })
    email.value = ''
    submitState.value = 'success'
    statusMessage.value = '订阅成功，感谢关注 DeepTrols 最新资讯。'
  }
  catch {
    submitState.value = 'error'
    statusMessage.value = '订阅失败，请稍后重试。'
  }
}
</script>

<template>
  <div class="site-footer__subscribe">
    <div class="site-footer__subscribe-title">
      <h3>订阅 DeepTrols 最新资讯</h3>
    </div>
    <form
      class="site-footer__subscribe-form"
      aria-label="订阅 DeepTrols 最新资讯"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <div class="site-footer__input" data-slot="root">
        <input
          id="footer-email"
          v-model="email"
          type="email"
          name="email"
          placeholder="邮箱"
          required
          autocomplete="off"
          :disabled="submitState === 'submitting'"
          data-slot="base"
          @input="resetStatus"
        />
      </div>
      <button
        type="submit"
        data-slot="base"
        class="site-footer__subscribe-button dt-button dt-button--primary dt-button--lg"
        :disabled="submitState === 'submitting'"
      >
        <span data-slot="label" class="truncate">{{ submitState === 'submitting' ? '订阅中…' : '订阅' }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--lucide shrink-0 size-4"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          data-slot="trailingIcon"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7-7l7 7l-7 7"
          />
        </svg>
      </button>
      <p
        v-if="statusMessage"
        class="site-footer__subscribe-status"
        :class="submitState === 'error' ? 'is-error' : 'is-success'"
        :role="submitState === 'error' ? 'alert' : 'status'"
        aria-live="polite"
      >
        {{ statusMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
.site-footer__subscribe {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;

  h3 {
    margin: 0;
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
}

.site-footer__subscribe-title {
  width: 100%;
}

.site-footer__subscribe-form {
  display: flex;
  width: 100%;
  max-width: 640px;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.site-footer__input {
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 250px;
  flex-grow: 1;
  align-items: center;

  input {
    width: 100%;
    height: 48px;
    appearance: none;
    border: 0;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
    color: #ffffff;
    font-size: 16px;
    line-height: 24px;
    outline: none;
    padding: 8px 12px;
    transition:
      background 180ms ease,
      box-shadow 180ms ease;

    &::placeholder {
      color: var(--dt-color-text-dimmed);
    }

    &:focus-visible {
      box-shadow:
        inset 0 0 0 1px var(--dt-color-primary),
        0 0 0 2px var(--dt-color-primary);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}

.site-footer__subscribe-button {
  flex-shrink: 0;
}

.site-footer__subscribe-status {
  flex: 0 0 100%;
  margin: 0;
  font-size: 14px;
  line-height: 20px;

  &.is-success {
    color: #4ade80;
  }

  &.is-error {
    color: #f87171;
  }
}

@media (min-width: 768px) {
  .site-footer__subscribe {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .site-footer__subscribe-title {
    width: 41.6667%;
  }

  .site-footer__subscribe-form {
    width: 50%;
    max-width: none;
    flex-direction: row;
    margin-left: 8.333%;
  }
}
</style>
