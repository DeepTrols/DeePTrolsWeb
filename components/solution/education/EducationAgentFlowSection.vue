<script setup lang="ts">
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg?url'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { educationDiagram, educationFlowSteps } from '~/data/solutions/education'
</script>

<template>
  <SectionShell title-id="education-agent-flow-title" container-spacing="top">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        title-id="education-agent-flow-title"
        eyebrow="AI 原生教育"
        title="从 Copilot 到 Agent，让 AI 真正完成教育任务"
        subtitle="传统 Copilot 主要辅助回答问题和生成内容，智曜通过 Agent Runtime 将大模型、知识、工具与校园业务系统连接起来，让 AI 能够理解目标、自主规划并调用工具执行任务，从“给出答案”进一步走向“完成任务”。"
        align="center"
        width="wide"
      />
    </div>

    <div class="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <!-- 左侧：理解 / 规划 / 执行 三步骤（EMQX Edge 1:1 立体方块排版） -->
      <div class="rounded-3xl border border-default bg-dt-bg-soft/30 p-8 shadow-sm backdrop-blur-xl lg:p-10">
        <div class="space-y-10">
          <div
            v-for="step in educationFlowSteps"
            :key="step.badge"
            class="relative flex flex-col items-start gap-6 text-left lg:flex-row lg:items-start"
          >
            <div class="relative shrink-0">
              <div class="relative h-[120px] w-[120px]">
                <div class="[perspective:800px]">
                  <div class="relative [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
                    <div
                      class="absolute h-[104px] w-[104px] border bg-default [transform:translateZ(-12px)]"
                      :class="step.cubeColors.shadow"
                    ></div>
                    <div
                      class="relative h-[104px] w-[104px] overflow-hidden border bg-default [transform:translateZ(12px)]"
                      :class="step.cubeColors.top"
                    >
                      <div class="absolute inset-0" :class="step.cubeColors.tint"></div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <component :is="step.icon" class="size-9" :class="step.cubeColors.icon" />
                      </div>
                    </div>
                    <div
                      class="absolute left-0 top-0 h-[104px] w-[24px] origin-left border bg-muted [transform:rotateY(-90deg)_translateX(-12px)]"
                      :class="step.cubeColors.left"
                    ></div>
                    <div
                      class="absolute bottom-0 left-0 h-[24px] w-[104px] origin-bottom border-x bg-default [transform:rotateX(90deg)_translateY(12px)]"
                      :class="step.cubeColors.front"
                    ></div>
                  </div>
                </div>
                <div
                  class="absolute -right-2 -top-2 rounded-full border border-default bg-default px-2.5 py-1 text-[10px] font-semibold text-muted shadow-sm"
                >
                  {{ step.badge }}
                </div>
              </div>
            </div>
            <div class="pt-2">
              <div class="flex items-center gap-2">
                <h3 class="text-lg font-semibold text-highlighted">{{ step.title }}</h3>
              </div>
              <p class="m-0 mt-2 text-sm font-semibold text-primary">{{ step.subtitle }}</p>
              <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted">{{ step.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in step.tags"
                  :key="tag"
                  class="rounded-md border border-default bg-default px-2.5 py-1 text-[10px] font-semibold text-muted shadow-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：智曜·AgentOS 架构图（EMQX Edge 760×500 绝对定位画布 1:1 复刻） -->
      <div class="flex min-w-0 flex-col">
        <p class="m-0 text-xs font-semibold uppercase tracking-wide text-muted">Zhiyao AgentOS Architecture Diagram</p>
        <div class="mt-4 flex flex-1 flex-col justify-center overflow-hidden rounded-2xl bg-dt-bg-soft/30">
          <div class="@container aspect-[760/500] w-full">
            <div class="relative h-[500px] w-[760px] origin-top-left [transform:scale(calc(100cqw/760px))]">
              <div class="pointer-events-none absolute inset-0">
                <div
                  class="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-fuchsia-500/6 to-blue-500/8 blur-3xl"
                ></div>
              </div>
              <svg class="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 760 500" aria-hidden="true">
                <defs>
                  <linearGradient id="educationHubLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.35" />
                    <stop offset="50%" stop-color="var(--color-primary)" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.35" />
                  </linearGradient>
                  <filter id="educationLineGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <line
                  v-for="line in [
                    [380, 64, 380, 150],
                    [220, 152, 320, 220],
                    [220, 326, 320, 260],
                    [560, 152, 440, 220],
                    [560, 326, 440, 260],
                    [380, 330, 380, 392],
                  ]"
                  :key="line.join('-')"
                  :x1="line[0]"
                  :y1="line[1]"
                  :x2="line[2]"
                  :y2="line[3]"
                  stroke="url(#educationHubLine)"
                  stroke-width="1.5"
                  stroke-dasharray="4 6"
                  filter="url(#educationLineGlow)"
                >
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
                </line>
              </svg>

              <!-- 顶部：用户与应用入口 -->
              <div class="absolute left-1/2 top-[12px] flex -translate-x-1/2 items-center gap-4">
                <span
                  v-for="entry in educationDiagram.entries"
                  :key="entry.name"
                  class="flex h-[56px] w-[210px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 text-[13px] font-semibold text-highlighted shadow-sm backdrop-blur-xl"
                >
                  <component :is="entry.icon" class="size-5 shrink-0 text-muted" />
                  <span class="flex flex-col">
                    <span class="text-[12px] font-semibold text-highlighted">{{ entry.name }}</span>
                    <span class="text-[11px] font-semibold text-muted">{{ entry.label }}</span>
                  </span>
                </span>
              </div>

              <!-- 左侧能力块 -->
              <div class="absolute left-0 top-[120px]">
                <div
                  class="flex h-[64px] w-[220px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-3 text-[12px] font-semibold text-highlighted shadow-sm backdrop-blur-xl"
                >
                  <component :is="educationDiagram.leftTop.icon" class="size-5 shrink-0 text-muted" />
                  <span class="flex flex-col">
                    <span class="text-[12px] font-semibold text-highlighted">{{ educationDiagram.leftTop.title }}</span>
                    <span class="text-[11px] font-semibold text-muted">{{ educationDiagram.leftTop.label }}</span>
                  </span>
                </div>
              </div>
              <div class="absolute left-0 top-[300px]">
                <div
                  class="flex h-[64px] w-[200px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 text-[12px] font-semibold text-highlighted shadow-sm backdrop-blur-xl"
                >
                  <component :is="educationDiagram.leftBottom.icon" class="size-4 shrink-0 text-muted" />
                  <span class="flex flex-col">
                    <span class="text-[12px] font-semibold text-highlighted">{{ educationDiagram.leftBottom.title }}</span>
                    <span class="text-[11px] font-semibold text-muted">{{ educationDiagram.leftBottom.label }}</span>
                  </span>
                </div>
              </div>

              <!-- 右侧能力块 -->
              <div class="absolute right-0 top-[120px]">
                <div
                  class="flex h-[64px] w-[200px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 text-[12px] font-semibold text-highlighted shadow-sm backdrop-blur-xl"
                >
                  <component :is="educationDiagram.rightTop.icon" class="size-4 shrink-0 text-muted" />
                  <span class="flex flex-col">
                    <span class="text-[12px] font-semibold text-highlighted">{{ educationDiagram.rightTop.title }}</span>
                    <span class="text-[11px] font-semibold text-muted">{{ educationDiagram.rightTop.label }}</span>
                  </span>
                </div>
              </div>
              <div class="absolute right-0 top-[300px]">
                <div
                  class="flex h-[64px] w-[200px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 text-[12px] font-semibold text-highlighted shadow-sm backdrop-blur-xl"
                >
                  <component :is="educationDiagram.rightBottom.icon" class="size-4 shrink-0 text-muted" />
                  <span class="flex flex-col">
                    <span class="text-[12px] font-semibold text-highlighted">{{ educationDiagram.rightBottom.title }}</span>
                    <span class="text-[11px] font-semibold text-muted">{{ educationDiagram.rightBottom.label }}</span>
                  </span>
                </div>
              </div>

              <!-- 中央立体方块：智曜·AgentOS -->
              <div class="absolute left-1/2 top-[170px] -translate-x-1/2">
                <div class="relative h-[160px] w-[160px]">
                  <div class="animate-value-flow">
                    <div class="[perspective:900px]">
                      <div class="relative [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
                        <div class="absolute h-[150px] w-[150px] border border-primary/25 bg-default [transform:translateZ(-15px)]"></div>
                        <div class="absolute h-[150px] w-[150px] border border-primary/20 bg-default [transform:translateZ(-16px)]"></div>
                        <div class="relative h-[150px] w-[150px] overflow-hidden border border-primary/50 bg-muted [transform:translateZ(14px)]">
                          <div class="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/10 to-blue-400/15"></div>
                          <div
                            class="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,var(--color-primary)_1px,transparent_1px),linear-gradient(225deg,var(--color-primary)_1px,transparent_1px)] [background-size:26px_26px]"
                          ></div>
                          <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <img :src="zhiyaoLogo" class="mb-2 size-7" alt="" />
                            <div class="text-[13px] font-semibold text-highlighted">{{ educationDiagram.center.name }}</div>
                            <div class="mt-1 text-[12px] font-semibold text-muted">{{ educationDiagram.center.caption }}</div>
                          </div>
                        </div>
                        <div
                          class="absolute left-0 top-0 h-[150px] w-[28px] origin-left border border-primary/30 bg-default [transform:rotateY(-90deg)_translateX(-14px)]"
                        ></div>
                        <div
                          class="absolute bottom-0 left-0 h-[28px] w-[150px] origin-bottom border-x border-primary/30 bg-default [transform:rotateX(90deg)_translateY(14px)]"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 底部：基础能力 -->
              <div class="absolute left-1/2 top-[242px] w-[460px] -translate-x-1/2">
                <div class="rounded-3xl border border-default bg-white/95 px-8 py-5 shadow-sm backdrop-blur-xl">
                  <div class="grid grid-cols-3 gap-3">
                    <div
                      v-for="foundation in educationDiagram.foundations"
                      :key="foundation.label"
                      class="flex items-center justify-center gap-2 px-2 py-1 text-[13px] font-semibold text-muted"
                    >
                      <component :is="foundation.icon" class="size-6" />
                      {{ foundation.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
