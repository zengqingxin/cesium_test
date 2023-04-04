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
    return {};
  },
  mounted() {
    //三维场景初始化
    CesiumByZh.init("cesiumContainer", function () {
      //这里可以写初始化完成后想要执行的操作
    });
    // this.loadgltfmodel(CesiumByZh.viewer, CesiumByZh.Cesium);
    this.loadPointEntity(CesiumByZh.viewer, CesiumByZh.Cesium)
  },
  methods: {
    loadgltfmodel(viewer, Cesium) {
      const plane = viewer.entities.add({
        name: "gltf model",
        position: Cesium.Cartesian3.fromDegrees(114.222, 23.51545454, 400),
        model: {
          uri: "./assets/Models/ferrari2.gltf",
          scale: 1,
        },
      });
      viewer.flyTo(plane);
    },
    //加载点位数据并实现点击监听
    loadPointEntity(viewer, Cesium) {
      let self = this
      let promise1 = Cesium.GeoJsonDataSource.load(
        "./assets/geojson/BSZJson1.geojson"
      );
      promise1.then((dataSource) => {
        viewer.dataSources.add(dataSource);
        console.log(dataSource,'dataSourcedataSource');
        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
          var eneity= entities[i];
          eneity.billboard.show = false
          eneity.model = {
            uri: "./assets/Models/ferrari2.gltf",
            scale: 1,
          };
        }
        //为entitiy添加 点击监听
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (movement) {
          //这里是屏幕坐标
          var pickObject = viewer.scene.pick(movement.position);
          //这里是空间坐标系
            let cartesian = viewer.scene.pickPosition(movement.position)
           //空间坐标转为世界坐标（弧度）
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          if (Cesium.defined(pickObject)) {
              if(pickObject.primitive.isCesium3DTileset == undefined){
                pickObject.primitive.silhouetteColor  = Cesium.Color.GREEN
                pickObject.primitive.silhouetteSize = 3.0
           // 弧度转为角度（经纬度）
              let lon = Cesium.Math.toDegrees(cartographic.longitude);
              let lat = Cesium.Math.toDegrees(cartographic.latitude);
              let hei = 1
              self.loadArrow(viewer,Cesium,lon,lat,hei)
              console.log(lon,lat,hei,'经度纬度高度');

              }
             
          } else {
            console.log('222');
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      });
      viewer.flyTo(promise1);
    },

    //绘制三个方向的坐标轴
    loadArrow(viewer,Cesium,lon,lat,hei){
    var arrowx = viewer.entities.add({
    name:"arrowx",
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        lon,lat,hei,lon+0.00003,lat,hei]),
      width:25,
      arcType:Cesium.ArcType.NONE,
      material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED),
    },
    })
    var arrowy = viewer.entities.add({
    name:"arrowy",
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        lon,lat,hei,lat+0.00003,hei]),
      width:25,
      arcType:Cesium.ArcType.NONE,
      material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GREEN),
    },

  });
   
   
  var arrowz = viewer.entities.add({
    name:"arrowz",
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        lon,lat,hei,lat,hei+5]),
      width:25,
      arcType:Cesium.ArcType.NONE,
      material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.BLUE),
    },
  });
console.log(arrowz,arrowx,arrowy);

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

