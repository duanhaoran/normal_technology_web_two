const state = {
  user_name: sessionStorage.getItem('username') || '',
  show: false,
  token: sessionStorage.getItem('token') || '',
  user_id: sessionStorage.getItem('user_id') || ''
};
const getters = {
  not_show(state) {
    return !state.show;
  },
  get_token(state) {
    return state.token;
  },
  get_userName(state) {
    return state.user_name;
  },
  get_user_id(state) {
    return state.user_id;
  }
};
const mutations = {
  user_name(state,username){
    sessionStorage.setItem('username',username)
    state.user_name = username
  },
  user_id(state,user_id){
    sessionStorage.setItem('user_id',user_id)
    state.user_id = user_id
  },
  switch_show(state) {
    state.show = !state.show;
  },
  set_token(state, token) {
    sessionStorage.setItem('token', token);
    state.token = token;
  },
  del_token(state) {
    sessionStorage.removeItem('token');
    state.token = '';
  }
};
const actions = {
  switch_show(context) {
    context.commit('switch_show');
  },
  set_token({commit}, token) {
    commit('set_token', token);
  },
  user_name({commit}, username) {
    commit('user_name', username);
  },
  del_token({commit}) {
    commit('del_token');
  },
  user_id({commit}, user_id) {
    commit('user_id', user_id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
