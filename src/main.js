import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import pinia from './store/index'
// import 'bootstrap/dist/css/bootstrap-utilities.min.css'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'dialog-polyfill/dist/dialog-polyfill.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './permission'
Vue.use(VueCompositionApi)
// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)
Vue.use(ElementUI)

new Vue({
    el: '#App',
    router,
    pinia,
    render: h => h(App)
})
