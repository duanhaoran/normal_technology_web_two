import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import common from './modules/common';
import page from './modules/page';
import student from './modules/student';
import secondClass from './modules/secondClass';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    common,
    page,
    student,
    secondClass
  },
  strict: debug
});
