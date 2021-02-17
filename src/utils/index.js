  /**
 * @author: WangXinYu
 * @describe: 下载文件方法
 * @create: 2019/7/19 16:25
 **/
//import store from '../store';
import myAxios from 'axios';
function downloadFile(param , url, method, myFileName) {
  // myAxios.defaults.headers.common['Authorization'] =
  console.log(1)
  console.log(param)
  //   sessionStorage.getItem('token') || store.state.common.token;
  myAxios({
    method: method,
    url: url,
    params: param,
    responseType: 'blob'
  }).then((res) => {
    // console.log(res)
    if (!res) return;
    // if (res.data.type === 'application/json') {
    //   this.$notify({
    //     type: 'error',
    //     title: '错误',
    //     message: '下载失败，文件生成错误'
    //   });
    //   return;
    // }
    // if (res.data.size === 0) {
    //   this.$notify({
    //     type: 'warning',
    //     title: '无数据',
    //     message: '要下载的文件数据为空'
    //   });
    //   return;
    // }
    let filename = myFileName,
      blob = res.data;

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      let blobURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }
  });
}


export default downloadFile ;
