import Vue from 'vue'

let commonJS = {
install (Vue, option) {
    if (!sessionStorage.length) {
      localStorage.setItem('getSession', Date.now());
    };
    if (process.env.NODE_ENV === 'production') {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?xxxx";
        hm.id = "baidu_tj";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
    // 该事件是核心 sessionStorage 丢失
    window.addEventListener('storage', function(event) {
      //已有窗口
      if (event.key == 'getSession') {
        localStorage.setItem('setSession', JSON.stringify(sessionStorage));
        localStorage.removeItem('setSession');
      }
      //新开窗口
      else if(event.key == 'setSession' && !sessionStorage.length) {
        let data = JSON.parse(event.newValue);
        //赋给这个窗口的sessionStorage
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    });
    // 格式化 日期
    Vue.prototype.toStringDate = function (value){
      let result = ""
      if (value) {
        let data = new Date(value)
        let year = data.getFullYear();
        let month = data.getMonth() + 1;
        let date = data.getDate();
        result = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date)
      }
      return result
    }
    // 格式化传参方式
    Vue.prototype.urlEncode = function (param) {
      if (!param) return '';
      let url ='?'
      for (let k in param) {
        url += k + '=' + param[k] + '&'
      }
      return url.substring(0, url.length - 1)
    }
    // 讲时间戳转成时分
    Vue.prototype.toStringTime = function (value) {
      let result = ""
      if (value) {
        let T = new Date(value)
        let Format = (Q) => {
          return Q < 10 ? '0' + Q : Q
        }
        result = Format(T.getHours()) + ':' + Format(T.getMinutes())
      }
      return result
    }
    Vue.prototype.format = function(value, fmt) {
      fmt = fmt || 'yyyy-MM-dd hh:mm'
      let that = new Date(value)
      var o = {
        "M+" : that.getMonth()+1,                 //月份
        "d+" : that.getDate(),                    //日
        "h+" : that.getHours(),                   //小时
        "m+" : that.getMinutes(),                 //分
        "s+" : that.getSeconds(),                 //秒
        "q+" : Math.floor((that.getMonth()+3)/3), //季度
        "S"  : that.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (that.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
      for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
      }
      return fmt;
    }
    Vue.prototype.checkModule = function(moduleId) {
      let moduleSettings = JSON.parse(localStorage.getItem('moduleSettings')) || []
      return moduleSettings.some((item) => {
        return item.id === moduleId
      })
    }
    // 讲字符串时间戳转成时分
    Vue.prototype.toTimeStamp = function (value) {
      let result = ""
      if (value) {
        value = Number(value)
        let T = new Date(value)
        let Format = (Q) => {
          return Q < 10 ? '0' + Q : Q
        }
        result = Format(T.getHours()) + ':' + Format(T.getMinutes())
      }
      return result
    }
    // 讲字符串时间戳转成日期
    Vue.prototype.toDateStamp = function (value) {
      let result = ""
      if (value) {
        value = Number(value)
        let data = new Date(value)
        let year = data.getFullYear();
        let month = data.getMonth() + 1;
        let date = data.getDate();
        result = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date)
      }
      return result
    }
    // 讲字符串时间戳转成日期
    Vue.prototype.timeStamp = function (msd) {
      var time = msd
      if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
          time = parseInt(time / 60.0) + "分钟";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60) + "分钟";
        } else if (time >= 60 * 60 * 24) {
          time = parseInt(time / 3600.0 / 24) + "天" + parseInt((parseFloat(time / 3600.0 / 24) -
            parseInt(time / 3600.0 / 24)) * 24) + "小时" + parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60) + "分钟";
        } else {
          time = parseInt(time) + "秒";
        }
      }
      return time;
    }
  }
}

Vue.use(commonJS)

