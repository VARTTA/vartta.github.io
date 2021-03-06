export const strict = false
function initialState() {
  return {
    comparisonSlider: 1,
    comparisons: [{ analysis: '', machineLearning: '', topic: '' }]
  }
}
export const state = () => ({
  comparisonSlider: 1,
  comparisons: [{ analysis: '', machineLearning: '', topic: '' }]
})

export const mutations = {
  reset(state) {
    const initial = initialState()
    Object.keys(initial).forEach(key => {
      state[key] = initial[key]
    })
  },
  setComparisonSlider(state, value) {
    state.comparisonSlider = value
  },
  setComparisons(state, val) {
    state.comparisons = val
  },
  updateComparisons(state, count) {
    count = [1, 2, 3, 4, 6, 12][count - 1]
    if (state.comparisons.length < count) {
      for (let i = state.comparisons.length; i < count; i++)
        state.comparisons.push({
          analysis: '',
          machineLearning: '',
          topic: ''
        })
    } else if (state.comparisons.length > count) {
      state.comparisons.splice(count)
    }
  },
  /**
   *
   * @param state
   * @param payload: {index, MLid}
   */
  updateComparisonAnalysis(state, payload) {
    if (payload.index <= state.comparisons.length)
      state.comparisons[payload.index].analysis = payload.value
  },
  updateComparisonML(state, payload) {
    if (payload.index <= state.comparisons.length)
      state.comparisons[payload.index].machineLearning = payload.value
  },
  updateComparisonTopic(state, payload) {
    if (payload.index <= state.comparisons.length)
      state.comparisons[payload.index].topic = payload.value
  }
}
