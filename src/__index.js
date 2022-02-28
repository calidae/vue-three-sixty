import VueThreeSixty from './vue-three-sixty'
import { VueHammer } from 'vue2-hammer'

export {
    VueThreeSixty,
}

function install(Vue) {
  Vue.component('vue-three-sixty', VueThreeSixty)
  Vue.use(VueHammer)
}

export default { install }