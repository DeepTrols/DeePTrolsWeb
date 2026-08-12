import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { dlpHeroFeatures, dlpHeroQueryResults } from '~/data/dlp'

export type DlpHeroTab = 'generate' | 'query'

export function useDlpHeroAnimation() {
  const activeTab = ref<DlpHeroTab>('generate')
  const activeFeature = ref(0)
  const generatedRows = ref(0)
  const isGenerationDone = ref(false)
  const isQueryRunning = ref(false)
  const queryRows = ref(0)

  function resetGeneration() {
    activeFeature.value = 0
    generatedRows.value = 0
    isGenerationDone.value = false
  }

  function resetQuery() {
    isQueryRunning.value = false
    queryRows.value = 0
  }

  function switchTab(tab: DlpHeroTab) {
    if (tab === activeTab.value) {
      return
    }

    activeTab.value = tab

    if (tab === 'generate') {
      resetGeneration()
      startGeneration()
    } else {
      resetQuery()
    }
  }

  function runQuery() {
    isQueryRunning.value = true
  }

  function stopQuery() {
    isQueryRunning.value = false
    queryRows.value = 0
  }

  let generationTimer: ReturnType<typeof setTimeout> | null = null

  function startGeneration() {
    let featureIndex = 0
    let rowCount = 0

    const step = () => {
      if (activeTab.value !== 'generate') {
        return
      }

      if (featureIndex < dlpHeroFeatures.length) {
        activeFeature.value = featureIndex
        rowCount += 1
        generatedRows.value = rowCount
        featureIndex += 1
        generationTimer = setTimeout(step, 1000)
      } else {
        generationTimer = setTimeout(() => {
          isGenerationDone.value = true
          generationTimer = setTimeout(() => {
            if (activeTab.value === 'generate') {
              resetGeneration()
              startGeneration()
            }
          }, 3000)
        }, 500)
      }
    }

    generationTimer = setTimeout(step, 500)
  }

  watch(
    [isQueryRunning, activeTab],
    ([running, tab]) => {
      if (running && tab === 'query') {
        let revealedRows = 0

        const reveal = () => {
          if (revealedRows < dlpHeroQueryResults.length && isQueryRunning.value) {
            revealedRows += 1
            queryRows.value = revealedRows
            setTimeout(reveal, 150)
          }
        }

        setTimeout(reveal, 200)
      }
    },
    { immediate: true },
  )

  onMounted(() => {
    startGeneration()
  })

  onBeforeUnmount(() => {
    if (generationTimer) {
      clearTimeout(generationTimer)
    }
  })

  return {
    activeTab,
    activeFeature,
    generatedRows,
    isGenerationDone,
    isQueryRunning,
    queryRows,
    switchTab,
    runQuery,
    stopQuery,
  }
}
