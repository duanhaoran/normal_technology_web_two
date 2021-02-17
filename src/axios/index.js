import Vue from 'vue';
        import axios from 'axios';
        import {Message} from 'element-ui';
        import store from '../store';
        function initFn(params, callback, argument) {
          // 如果没有参数
          if (typeof argument === 'function') {
            callback = argument;
            params = {};
          }
          // 对象合并,确定最终参数
          return {
            // nparams: $.extend({}, params, baseParams),
            nparams: params,
            callback: callback
          };
        }

        function get(apiName, params, callback, mes = false) {
          var url = apiName;
          var obj = initFn(params, callback, arguments[1]);
          // var nparams = obj.nparams
          callback = obj.callback;
          axios.defaults.headers.common['Authorization'] =
            sessionStorage.getItem('token') ||
            localStorage.getItem('token') ||
            store.state.common.token;
          // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          axios

            .get(url, {
              params: params
            })
            .then((response) => {
              var result = response.data; // 返回所有数据
              // var data = response.data.data // 根据后端实际返回修改
              // 根据后端实际返回修改
              if (callback) callback(result);

              switch (result.code) {
                case 200:
                  // 成功
                  if (mes) {
                    Message.success({
                      title: '成功',
                      desc: result.msg
                    });
                  }
                  break;
                case 400:
                  // 失败
                  Message.error({
                    title: '失败',
                    desc: result.msg
                  });
                  break;
                case 401:
                  // 身份已过期，请重新登录!
                  Message.error({
                    title: '失败',
                    desc: '身份已过期，请重新登录'
                  });
                  break;
                case 403:
                  // 权限不足，无法添加!
                  Message.error({
                    title: '失败',
                    desc: '权限不足，无法操作'
                  });
                  break;
                case 500:
                  // 系统错误，请联系管理员!
                  Message.error({
                    title: '失败',
                    desc: '系统错误，请联系管理员'
                  });
                  break;
                default:
                  break;
              }
            })
            .catch((error) => {
              console.log(error);
              Message.warning({
                title: '提示',
                desc: '网络连接失败！'
              });
            });
        }

        function post(apiName, params, callback, mes = false) {
          var url =  apiName;
          var obj = initFn(params, callback, arguments[1]);
          var nparams = obj.nparams;
          callback = obj.callback;
          axios.defaults.headers.common['Authorization'] =
            store.state.common.token ||
            sessionStorage.getItem('token') ||
            localStorage.getItem('token');
          axios({
            method: 'post',
            url: url,
            data: nparams
          })
            .then((response) => {
              var result = response.data;
              // var data = response.data.data // 根据后端实际返回修改
              if (callback) callback(result);
              // 根据后端实际返回修改
              switch (result.code) {
                case 200:
                  // 成功
                  if (mes) {
                    Message.success({
                      title: '成功',
                      desc: result.msg
                    });
                  }
                  break;
                case 400:
                  // 失败
                  Message.error({
                    title: '失败',
                    desc: result.msg
                  });
          break;
        case 401:
          // 身份已过期，请重新登录!
          Message.error({
            title: '失败',
            desc: '身份已过期，请重新登录'
          });
          break;
        case 403:
          // 权限不足，无法添加!
          Message.error({
            title: '失败',
            desc: '权限不足，无法操作'
          });
          break;
        case 500:
          // 系统错误，请联系管理员!
          Message.error({
            title: '失败',
            desc: '系统错误，请联系管理员'
          });
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.log(error);
      Message.warning({
        title: '提示',
        desc: '网络连接失败！'
      });
    });
}

function put(apiName, params, callback, jsonType, mes = false) {
  var url = apiName;
  var obj = initFn(params, callback, arguments[1]);
  var nparams = obj.nparams;
  callback = obj.callback;
  axios.defaults.headers.common['Authorization'] =
    store.state.common.token ||
    sessionStorage.getItem('token') ||
    localStorage.getItem('token');
  // if (arguments[3]) {
  //   if (typeof arguments[3] === 'boolean' || jsonType === 'body') {
  //     nparams = qs.stringify(nparams);
  //     axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  //   }else if (jsonType === 'param') {
  //     axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  //   }
  // } else {
  //   // 没有第四个变量 默认为 application/json
  //   nparams = qs.stringify(nparams);
  //   axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  // }
  // if (typeof arguments[3] === 'boolean' || jsonType === 'body') {
  // }
  axios({
    method: 'put',
    url: url,
    data: nparams
  })
    .then((response) => {
      var result = response.data;
      // var data = response.data.data // 根据后端实际返回修改
      if (callback) callback(result);
      // 根据后端实际返回修改
      switch (result.code) {
        case 200:
          // 成功
          if (mes) {
            Message.success({
              title: '成功',
              desc: result.msg
            });
          }
          break;
        case 400:
          // 失败
          Message.error({
            title: '失败',
            desc: result.msg
          });
          break;
        case 401:
          // 身份已过期，请重新登录!
          Message.error({
            title: '失败',
            desc: '身份已过期，请重新登录'
          });
          break;
        case 403:
          // 权限不足，无法添加!
          Message.error({
            title: '失败',
            desc: '权限不足，无法操作'
          });
          break;
        case 500:
          // 系统错误，请联系管理员!
          Message.error({
            title: '失败',
            desc: '系统错误，请联系管理员'
          });
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.log(error);
      Message.warning({
        title: '提示',
        desc: '网络连接失败！'
      });
    });
}

function del(apiName, params, callback, mes = false) {
  var url =  apiName;
  var obj = initFn(params, callback, arguments[1]);
  var nparams = obj.nparams;
  callback = obj.callback;
  axios.defaults.headers.common['Authorization'] =
    store.state.common.token ||
    sessionStorage.getItem('token') ||
    localStorage.getItem('token');
  axios({
    method: 'delete',
    url: url,
    // data: nparams,
    params: params
    ,
  })
    .then((response) => {
      var result = response.data;
      // var data = response.data.data // 根据后端实际返回修改
      if (callback) callback(result);
      // 根据后端实际返回修改
      switch (result.code) {
        case 200:
          // 成功
          if (mes) {
            Message.success({
              title: '成功',
              desc: result.msg
            });
          }
          break;
        case 400:
          // 失败
          Message.error({
            title: '失败',
            desc: result.msg
          });
          break;
        case 401:
          // 身份已过期，请重新登录!
          Message.error({
            title: '失败',
            desc: '身份已过期，请重新登录'
          });
          break;
        case 403:
          // 权限不足，无法添加!
          Message.error({
            title: '失败',
            desc: '权限不足，无法操作'
          });
          break;
        case 500:
          // 系统错误，请联系管理员!
          Message.error({
            title: '失败',
            desc: '系统错误，请联系管理员'
          });
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.log(error);
      Message.warning({
        title: '提示',
        desc: '网络连接失败！'
      });
    });
}

const myAxios = {
  get,
  post,
  put,
  del
};
export default {
  get,
  post,
  put,
  del,
  install(Vue) {
    Vue.prototype.$axios = myAxios;
    Vue.prototype.axios = axios;
  }
};
