export const state = () => ({
  selectedUsers: [],
  users: [],
})

export const mutations = {
  resetSelectedUsers(state) {
    state.selectedUsers = []
  },
  resetUsers(state) {
    state.users = []
  },
  updateSelectedUsers(state, val) {
    state.selectedUsers = val
  },
  updateUsersSet(state, val) {
    state.usersSet = val
  },
}

export const actions = {
  reset({ commit }) {
    commit('resetSelectedUsers')
    commit('resetUsers')
  },
}
