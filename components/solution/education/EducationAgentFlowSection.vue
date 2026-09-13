<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import EducationArchitectureDiagram from '~/components/solution/education/EducationArchitectureDiagram.vue'
import { educationFlowSteps } from '~/data/solutions/education'
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

    <div class="mt-14 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
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

      <!-- 右侧：智曜·AgentOS 架构图（EMQX Edge 760 宽画布 1:1 复刻；高度与左侧卡片一致，元素按百分比带分布拉开间距） -->
      <div class="flex min-w-0 flex-col">
        <p class="m-0 text-xs font-semibold uppercase tracking-wide text-muted">Zhiyao AgentOS Architecture Diagram</p>
        <EducationArchitectureDiagram />
      </div>
    </div>
  </SectionShell>
</template>
