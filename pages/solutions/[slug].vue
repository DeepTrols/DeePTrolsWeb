<script setup lang="ts">
import { computed } from 'vue'
import { createError, useRoute } from '#imports'
import SolutionPageTemplate from '~/components/solution/SolutionPageTemplate.vue'
import SolutionScenarioVisual from '~/components/solution/SolutionScenarioVisual.vue'
import { getSolutionUseCaseBySlug } from '~/data/solutions/use-cases'

const route = useRoute()
const routeSlug = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug[0] : slug
})

const currentPage = computed(() => {
  const page = getSolutionUseCaseBySlug(routeSlug.value ?? '')

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Solution use case not found',
      fatal: true,
    })
  }

  return page
})

const content = computed(() => currentPage.value.content)
</script>

<template>
  <SolutionPageTemplate :content="content">
    <template #hero-visual>
      <SolutionScenarioVisual :visual="currentPage.visual" />
    </template>
  </SolutionPageTemplate>
</template>
