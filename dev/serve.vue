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
      :amount="54"
      padding-index
      start-at-zero
      spin-reverse
      image-path="http://host.docker.internal:8000/thumb/original?image=/combinations/360/2"
      file-name="{index}.jpg"
     />
  </div>
</template>
