export const strict = false
function initialState() {
  return {
    selectedUsers: [],
    usersSet: [],
  }
}
export const state = () => ({
  selectedUsers: [],
  users: [],
})

export const mutations = {
  reset(state) {
    const initial = initialState()
    Object.keys(initial).forEach((key) => {
      state[key] = initial[key]
    })
  },
  updateSelectedUsers(state, val) {
    state.selectedUsers = val
  },
  updateUsersSet(state, val) {
    state.usersSet = val
  },
}
