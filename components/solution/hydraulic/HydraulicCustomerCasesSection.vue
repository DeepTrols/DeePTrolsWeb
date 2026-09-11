<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import { hydraulicCases } from '~/data/solutions/hydraulic'
</script>

<template>
  <section class="container pb-32 lg:pb-44">
    <div class="flex flex-col gap-11">
      <div v-for="item in hydraulicCases" :key="item.title" class="flex flex-col">
        <div
          class="flex flex-col rounded-lg border border-default lg:flex-row"
          :class="item.reversed ? 'lg:flex-row-reverse' : ''"
        >
          <div class="flex flex-col gap-6 p-8 lg:p-12 flex-1">
            <div class="flex items-center justify-center lg:hidden">
              <img
                class="h-20 w-20 object-contain"
                src="/images/solutions/hydraulic/image-placeholder.svg"
                alt=""
              />
            </div>
            <h3 class="text-2xl lg:text-3xl font-bold text-highlighted">{{ item.title }}</h3>
            <p class="text-base text-default leading-relaxed">{{ item.description }}</p>
            <div class="grid grid-cols-1 border border-default rounded-lg overflow-hidden lg:grid-cols-3">
              <div
                v-for="(stat, index) in item.stats"
                :key="stat.label"
                class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center"
                :class="index > 0 ? 'border-t lg:border-t-0 lg:border-l border-default' : ''"
              >
                <p class="text-lg lg:text-xl font-bold text-highlighted">
                  <span><span class="bg-[image:var(--dt-gradient-text)] bg-clip-text text-transparent">{{
                    stat.value
                  }}</span>{{ stat.label }}</span>
                </p>
              </div>
            </div>
            <div>
              <BaseButton href="/cases">查看案例详情</BaseButton>
            </div>
          </div>
          <div
            class="hidden lg:flex items-center justify-center border-default p-8 lg:p-12 lg:w-[320px]"
            :class="item.reversed ? 'border-r' : 'border-l'"
          >
            <img
              class="h-[100px] w-[100px] object-contain"
              src="/images/solutions/hydraulic/image-placeholder.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
