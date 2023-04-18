<template>
  <div id="cesiumContainer"></div>
</template>

<script>
// import CesiumByZh from "../components/CesiumByZh";
// import * as Cesium from "cesium"
// 引入lodash库
// import { CheckboxGroup } from 'element-ui';
let viewer;
let Cesium;
export default {
  name: "gltfContal2",
  data() {
    return {};
  },
  mounted() {
    this.getCesiumDemo();
    // CesiumByZh.init("cesiumContainer", function () {
    //   //这里可以写初始化完成后想要执行的操作
    // });
    // this.loadglft(CesiumByZh.viewer, CesiumByZh.Cesium)
  },
  methods: {
    AddCircleGeometry(self) {
      var circle = new Cesium.CircleGeometry({
        center: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        radius: 1000000.0,
      });
      var geometry = Cesium.CircleGeometry.createGeometry(circle);

      let Maxtrix=Cesium.Transforms.eastNorthUpToFixedFrame( Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883))

      let boxInstance = new Cesium.GeometryInstance({
        geometry: geometry,

        modelMaxtrix: Maxtrix,

        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.AQUA
          ),
        },
        id: "top",
      });

      let primitive = new Cesium.Primitive({
        geometryInstances: [boxInstance],
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: false,
          translucent: false,
        }),
      });

      //用于存储矩阵的结果
      let tmMatrix = new Cesium.Matrix4();
      //初始矩阵
      let modelMaxtrix = boxInstance.modelMaxtrix;
      //转换的矩阵
      const translation = Cesium.Matrix4.fromTranslation(
        new Cesium.Cartesian3(100000, 0, 0)
      ); //Z轴10000
      console.log(translation,'translationtranslation');
      //矩阵转换
      // Cesium.Matrix4.multiply(modelMaxtrix, translation, tmMatrix);
      boxInstance.modelMaxtrix = tmMatrix
      // console.log(modelMaxtrix,'22222');
      viewer.scene.primitives.add(primitive);
      primitive.readyPromise.then(()=>{
      Cesium.Matrix4.multiply(modelMaxtrix, translation, tmMatrix);

      })
      
    },

    getCesiumDemo() {
      Cesium = window.Cesium;
      let self = this;
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmMyNGVlZi03N2YxLTQxZjUtYjcwZC1hYTc3YjgxNDBlNzkiLCJpZCI6MTAzNDc2LCJpYXQiOjE2NTk1MTYyNjR9.z1YkZ40RJPfzgm4SRWGL-nHZEASeA4cKlBd1cHA5_GU";
      viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, // 是否显示动画控件
        baseLayerPicker: false, // 是否显示图层选择控件
        geocoder: false, // 是否显示地名查找控件
        timeline: false, // 是否显示时间线控件
        sceneModePicker: false, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: false, // 是否显示点击要素之后显示的信息
        fullscreenButton: false, // 是否显示全屏按钮
        selectionIndicator: false, // 是否显示选中指示框
        scene3DOnly: true,
        homeButton: false,
        terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
      });
      viewer.scene.globe.depthTestAgainstTerrain = true;
      //禁止鼠标左键拖动地图
      // viewer.scene.screenSpaceCameraController.enableRotate=false
      //允许中建旋转视图
      viewer.scene.screenSpaceCameraController.enableTilt = true;
      //加载模型
      self.AddCircleGeometry(self);
    },
  },
};
</script>

<style>
</style>