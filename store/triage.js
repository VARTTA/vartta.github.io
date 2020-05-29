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
  addSelectedUser(state, user) {
    if (
      !state.selectedUsers.map((a) => a.screen_name).includes(user.screen_name)
    )
      state.selectedUsers.push(user)
  },
  removeSelectedUser(state, username) {
    const index = state.selectedUsers
      .map((a) => a.screen_name)
      .indexOf(username)
    state.selectedUsers.splice(index, 1)
  },
  updateUsers(state, val) {
    state.users = val
  },
}

export const actions = {
  reset({ commit }) {
    commit('resetSelectedUsers')
    commit('resetUsers')
  },
}
