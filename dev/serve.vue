<script>
import Vue from 'vue';
import VueThreeSixty from '@/vue-three-sixty.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueThreeSixty
  }
});
</script>

<template>
  <div id="app">
    <vue-three-sixty
      :amount="36"
      image-path="https://scaleflex.airstore.io/demo/chair-360-36"
      file-name="chair_{index}.jpg?v1"
     />
  </div>
</template>
