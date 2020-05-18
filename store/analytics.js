export const state = () => ({
  selectedMachineLearningMethod: '',
  selectedSentimentAnalysisMethod: '',
  selectedTopic: '',
})

export const mutations = {
  resetSelectedMachineLearningMethod(state) {
    state.selectedMachineLearningMethod = ''
  },
  resetSelectedSentimentAnalysisMethod(state) {
    state.selectedSentimentAnalysisMethod = ''
  },
  resetSelectedTopic(state) {
    state.selectedTopic = ''
  },
  updateSelectedMachineLearningMethod(state, data) {
    state.selectedMachineLearningMethod = data
  },
  updateSelectedSentimentAnalysisMethod(state, data) {
    state.selectedSentimentAnalysisMethod = data
  },
  updateSelectedTopic(state, data) {
    state.selectedTopic = data
  },
}

export const actions = {
  reset({ commit }) {
    commit('resetSelectedMachineLearningMethod')
    commit('resetSelectedSentimentAnalysisMethod')
    commit('resetSelectedTopic')
  },
}
