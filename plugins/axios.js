import { Message } from 'element-ui';
export default function ({app, $axios, redirect}) {
  let token = sessionStorage.getItem('pl-token') || '';
  if (token) {
    $axios.defaults.headers.common['pl-token'] = token;
  } else {
    // if (location.href.indexOf('login') === -1) {
    //   location.href = '/login';
    // }
  }

  $axios.interceptors.response.use(function (response) {
    if (response.headers.isapi && response.headers.isapi == '1') {
      if (response.data.code === 200) {
        // response.data = response.data.data;
        return response.data;
      } else if (response.data.code === 401) {
        Message.error("登录失效,请重新登录")
        setTimeout(() => {
          app.router.replace('/login')
        }, 500)
      } else {
        Message({
          message: response.data.message,
          type: 'error'
        });
        return Promise.reject(response.data.message);
      }
    } else {
      return response
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code == 401) {
      Message({
        message: error.response.data.errMsg,
        type: 'error'
      });
      setTimeout(() => {
        app.router.replace('/login')
      }, 500)
    } else if (code >= 400 && code < 500) {
      Message({
        message: error.response.data.errMsg,
        type: 'error'
      });
    } else if (code == 500) {
      Message({
        message: '服务器内部错误',
        type: 'error'
      });
    }
  })
}
