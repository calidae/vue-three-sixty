import Vue from 'vue';
import Dev from './serve.vue';
import { VueHammer } from 'vue2-hammer'

Vue.config.productionTip = false;

Vue.use(VueHammer)
new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
