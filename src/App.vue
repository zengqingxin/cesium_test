<template>
  <div >
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <cesiumViewer/> -->
    <gltfContal/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import cesiumViewer from '@/components/cesiumViewer.vue'
import gltfContal from '@/components/gltfContral.vue'
export default {
  // name: 'Home',
  components: {
    // HelloWorld,
    // cesiumViewer,
    gltfContal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
