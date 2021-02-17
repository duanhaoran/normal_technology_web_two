const state = {
  show: false,
  activityListDetail: {},
  gradeCertification: {},
  StationNoticeDetail: {}
};
const getters = {
  not_show(state) {
    return !state.show;
  },
  get_activity_detail(state) {
    return state.activityListDetail;
  },
  get_stationnotice_detail(state) {
    return state.StationNoticeDetail;
  },
  get_grade_detail(state) {
    return state.gradeCertification;
  }
};
const mutations = {
  switch_show(state) {
    state.show = !state.show;
  },
  set_activity_detail(state, detail) {
    state.activityListDetail = detail;
  },
  set_stationnotice_detail(state, detail) {
    state.StationNoticeDetail = detail;
  },
  set_grade_detail(state, detail) {
    state.gradeCertification = detail;
  }
};
const actions = {
  switch_show(context) {
    context.commit('switch_show');
  },
  set_activity_detail(context, detail) {
    context.commit('set_activity_detail', detail);
  },
  set_stationnotice_detail(context, detail) {
    context.commit('set_stationnotice_detail', detail);
  },
  set_grade_detail(context, detail) {
    context.commit('set_grade_detail', detail);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
