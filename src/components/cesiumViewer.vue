<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import CesiumByZh from "../components/CesiumByZh";

export default {
  name: "cesiumViewer",
  props: {
    msg: String,
  },
  data() {
    return {
    }
  },
  mounted() {
    //三维场景初始化
    CesiumByZh.init("cesiumContainer", function () {
      //这里可以写初始化完成后想要执行的操作

    });
    this.loadgltfmodel(CesiumByZh.viewer,CesiumByZh.Cesium)

  },
  methods: {
   
    loadgltfmodel(viewer, Cesium){
      const plane = viewer.entities.add({
        name: "gltf model",
        position: Cesium.Cartesian3.fromDegrees(114.222, 21.51545454, 4000),
        model: {
          uri: "./assets/Models/ferrari2.gltf",
          scale:1,
        }
      });
       viewer.flyTo(plane)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
}
</style>

