const state = {
  activityDetail: {},
  activityDetail1: {},
  gradeOnlineStudent: {}
};
const getters = {
  get_activity_detail(state) {
    return state.activityDetail;
  },
  get_activity_detail1(state) {
    return state.activityDetail1;
  },
  get_grade_student(state) {
    return state.gradeOnlineStudent;
  }
};
const mutations = {
  set_activity_detail(state, detail) {
    state.activityDetail = detail;
  },
  set_activity_detail1(state, detail1) {
    state.activityDetail1 = detail1;
  },
  set_grade_student(state, student) {
    state.gradeOnlineStudent = student;
  }
};
const actions = {
  set_activity_detail(context, detail) {
    context.commit('set_activity_detail', detail);
  },
  set_activity_detail1(context, detail1) {
    context.commit('set_activity_detail1', detail1);
  },
  set_grade_student(context, student) {
    context.commit('set_grade_student', student);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
