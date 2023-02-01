import { MIMETypeList } from '@/enum/mime'

export function setConfType(type) {
  const mime = MIMETypeList.find(v => v.label === type.toLowerCase());
  return mime.value;
}

export function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', ()=> {
      resolve(reader.result);
    });
    reader.readAsDataURL(blob);
  });
};


export function downloadFile(id) {
  return new Promise((resolve, reject) => {
    window.axios({
      url: '/api/tiji-resource/common/download',
      method: 'get',
      params: {
        id: id
      },
      responseType: 'blob' // 设置接收格式为blob格式
    }).then(res => {
      if (res && res.data && res.data.size != undefined && res.data.size != null) {
        const dataInfo = res.data;
        let reader = new window.FileReader();
        // 省略代码
        var fileNameEncode = res.headers['content-disposition'].split('fileName=')[1];
        // 解码
        const fileName = decodeURIComponent(fileNameEncode);
        // 使用readAsArrayBuffer读取文件, result属性中将包含一个 ArrayBuffer 对象以表示所读取文件的数据
        reader.readAsArrayBuffer(dataInfo);
        reader.onload = (e) => {
          const result = e.target.result;
          // 生成blob图片,需要参数(字节数组, 文件类型)
          const strList = fileName.split('.');
          const type = setConfType(res.headers.extension || strList[strList.length - 1]);
          const blob = new Blob([result], { type: setConfType(res.headers.extension || strList[strList.length - 1]) });
          let a = new FileReader();
          a.onload = function(e) {
            // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上
            const url = window.URL.createObjectURL(blob);
            resolve({
              id,
              url,
              base64: e.target.result,
              type,
              fileName,
              isImage: type.indexOf('image') !== -1
            });
          };
          a.readAsDataURL(blob);
          // this.url = url;
          /* if (type.indexOf('image') !== -1) {
            this.showImage = true;
          } else {
            let dom = document.createElement('a');
            dom.href = url;
            dom.download = decodeURI(fileName);
            dom.style.display = 'none';
            document.body.appendChild(dom);
            dom.click();
            dom.parentNode.removeChild(dom);
            window.URL.revokeObjectURL(url);
          } */
        };
      }
    }, () => {
      reject();
    }).catch((err) => {

    });
  });
};