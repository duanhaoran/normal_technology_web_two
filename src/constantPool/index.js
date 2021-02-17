/*
 * Created by SoulMen
 */
//1.引入vue
import Vue from 'vue';
//2.新创建一个vue实例
let v = new Vue();
//3.在新的实例上使用组件

  function successMession() {
    v.$message({
      type: 'success',
      message: '操作成功！!',
      center: true
    });
  }
  function falseMession() {
  this.$message({
    type: 'danger',
    message: '操作失败！！',
    center: true
  })
}

