import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 全局样式
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css


// console.log("888",process.env);

Vue.use(ElementUI);//全局注入


Vue.config.productionTip = false;

// 引入mock拦截
if(process.env.NODE_ENV === 'development'){
  require("./mock/mock") 
  // js采用node环境 用require
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
