export const strict = false
function initialState() {
  return {
    topicsTreeSelections: [],
    treeViewOpenItems: [],
    minimizeTopics: false,
  }
}
export const state = () => ({
  topicsTreeSelections: [],
  minimizeTopics: false,
})

export const mutations = {
  reset(state) {
    const initial = initialState()
    Object.keys(initial).forEach((key) => {
      state[key] = initial[key]
    })
  },
  updateTopicsTreeSelections(state, val) {
    state.topicsTreeSelections = val
  },
  updateMinimizeTopics(state, val) {
    state.minimizeTopics = val
  },
  updateTreeViewOpenItems(state, val) {
    state.treeViewOpenItems = val
  },
}
