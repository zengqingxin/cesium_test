<template>
  <div id="cesiumContainer"></div>
</template>

<script>
// import CesiumByZh from "../components/CesiumByZh";
// import * as Cesium from "cesium"
import ArrowPolyline from "./ArrowPolyline";
// 引入lodash库
import { throttle } from 'lodash';
// import { CheckboxGroup } from 'element-ui';
let viewer;
let Cesium;
export default {
  name: "gltfContal3",
  data() {
    return {
     
    };
  },
  mounted() {
    this.getCesiumDemo();
    // CesiumByZh.init("cesiumContainer", function () {
    //   //这里可以写初始化完成后想要执行的操作
    // });
    // this.loadglft(CesiumByZh.viewer, CesiumByZh.Cesium)
  },
  methods: {
    loadglft(self) {
      const center = new Cesium.Cartesian3.fromDegrees(110, 40,5);
      const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
      const model = viewer.scene.primitives.add(
        Cesium.Model.fromGltf({
          url: "./assets/Models/ferrari2.gltf",
          modelMatrix: matrix,
          scale: 3,
        })
      ); 
      // viewer.camera.lookAtTransform(matrix, new Cesium.Cartesian3(-50, 0, 10));
      viewer.camera.setView({
        destination:Cesium.Cartesian3.fromDegrees(110, 40,200),
        //方向、俯视和仰视的设置
        orientation:{
          /*
            heading ：旋转角
            pitch：俯仰角 +向上  -向下
          */
          heading:6,  //直接写数值 1代表60度，2也代表2*60度
          // heading:Cesium.Math.toRadians(90) //镜头旋转90度
          pitch:Cesium.Math.toRadians(-80)
        }
    })
      
        //为entitiy添加 点击监听
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        var start,end,offset
        const throttledCallback = throttle(function(move){
          end = new Cesium.Cartesian2(move.endPosition.x, move.endPosition.y)
          offset = new Cesium.Cartesian2();
          Cesium.Cartesian2.subtract(end, start, offset);
          console.log(offset);
        },1000)
        let axisZ,axisX,axisY,axisSphereZ,axisSphereY,axisSphereX
        handler.setInputAction(function (click) {
          //这里是屏幕坐标
          var pickObject = viewer.scene.pick(click.position);
          //获取起点坐标
            start = new Cesium.Cartesian2(click.position.x, click.position.y);
            //#region
            //并没有什么用
            // 这里是空间坐标系
            // let cartesian3 = viewer.scene.pickPosition(click.position)
              //  空间坐标转为世界坐标（弧度）
            // var cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
            // //通过获取模型当前经度维度高度，写出旋转矩阵。在由矩阵去控制模型的旋转
            // var lat=Cesium.Math.toDegrees(cartographic.latitude);
            // var lng=Cesium.Math.toDegrees(cartographic.longitude);
            // var alt=cartographic.height;
            // // 确定矩阵变化的原点 
            // let origin = Cesium.Cartesian3.fromDegrees(lng, lat, alt);
            // let transform = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
            //  // 旋转
            // let heading = Cesium.Math.toRadians(2);
            // let pitch = Cesium.Math.toRadians(2);
            // let roll = Cesium.Math.toRadians(2);
            // let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            // let matrix3 = Cesium.Matrix3.fromHeadingPitchRoll(hpr);
            // let rotation = Cesium.Matrix4.fromRotationTranslation(matrix3);
           //#endregion
           //定义箭头坐标和园轴坐标
        if (Cesium.defined(pickObject) && pickObject.id != 'axisY-line'
        && pickObject.id != 'axisX-line'&& pickObject.id != 'axisZ-line'
        && pickObject.id != 'axisX-arrow'&& pickObject.id != 'axisY-arrow'
        && pickObject.id != 'axisZ-arrow'&& pickObject.id != 'axisSphereX'
        && pickObject.id != 'axisSphereY'&& pickObject.id != 'axisSphereZ'
        ) {
         model.readyPromise.then((m) => {
        const center1 = Cesium.Matrix4.getTranslation(
          m.modelMatrix,
          new Cesium.Cartesian3()
        );
        const boundingShpere = m.boundingSphere;
        const radius = boundingShpere.radius;
         axisZ = new ArrowPolyline({
          Cesium,
          id: "axisZ",
          color: Cesium.Color.RED,
          position: center1,
          width: 0.25,
          headWidth: 0.75,
          length: radius * 2 + 10,
          headLength: 0.75,
        });
         axisX = new ArrowPolyline({
          Cesium,
          id: "axisX",
          color: Cesium.Color.GREEN,
          position: center1,
           width: 0.25,
          headWidth: 0.75,
          length: radius * 2 + 10,
          headLength: 0.75,
        });
         axisY = new ArrowPolyline({
          Cesium,
          id: "axisY",
          color: Cesium.Color.BLUE,
          position: center1,
          width: 0.25,
          headWidth: 0.75,
          length: radius * 2 + 10,
          headLength: 0.75,
        });
        const mx = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(90));
        const rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
        //X轴横轴柱子
        Cesium.Matrix4.multiply(
          axisX.geometryInstances[0].modelMatrix,
          rotationX,
          axisX.geometryInstances[0].modelMatrix
        );
        //X轴横轴圆锥
        Cesium.Matrix4.multiply(
          axisX.geometryInstances[1].modelMatrix,
          rotationX,
          axisX.geometryInstances[1].modelMatrix
        );
        const my = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(90));
        const rotationY = Cesium.Matrix4.fromRotationTranslation(my);
        //Y轴柱子
        Cesium.Matrix4.multiply(
          axisY.geometryInstances[0].modelMatrix,
          rotationY,
          axisY.geometryInstances[0].modelMatrix
        );
        //Y轴圆锥
        Cesium.Matrix4.multiply(
          axisY.geometryInstances[1].modelMatrix,
          rotationY,
          axisY.geometryInstances[1].modelMatrix
        );
        viewer.scene.primitives.add(axisZ);
        viewer.scene.primitives.add(axisX);
        viewer.scene.primitives.add(axisY);
        //以下是圆坐标轴
        const position = [];
        for (let i = 0; i <= 360; i += 3) {
          const sin = Math.sin(Cesium.Math.toRadians(i));
          const cos = Math.cos(Cesium.Math.toRadians(i));
          const x = radius * cos;
          const y = radius * sin;
          position.push(new Cesium.Cartesian3(x, y, 0));
        }
         axisSphereZ = self.createAxisSphere(
          "axisSphereZ",
          position,
          matrix,
          Cesium.Color.RED
        );
        viewer.scene.primitives.add(axisSphereZ);
         axisSphereY = self.createAxisSphere(
          "axisSphereY",
          position,
          matrix,
          Cesium.Color.GREEN
        );
        viewer.scene.primitives.add(axisSphereY);
        Cesium.Matrix4.multiply(
          axisSphereY.geometryInstances.modelMatrix,
          rotationY,
          axisSphereY.geometryInstances.modelMatrix
        );
         axisSphereX = self.createAxisSphere(
          "axisSphereX",
          position,
          matrix,
          Cesium.Color.BLUE
        );
        viewer.scene.primitives.add(axisSphereX);
        Cesium.Matrix4.multiply(
          axisSphereX.geometryInstances.modelMatrix,
          rotationX,
          axisSphereX.geometryInstances.modelMatrix
        );
        })
        } else if(Cesium.defined(pickObject)){
           handler.setInputAction(function (move) {
            console.log(axisY,'aaaaa');
            // console.log(lat,lng,alt,'经度维度高度');
              viewer.scene.screenSpaceCameraController.enableRotate=false //不允许旋转地图
              throttledCallback(move)
            
              // //计算鼠标在屏幕坐标系的偏移量
                // end = new Cesium.Cartesian2(move.endPosition.x, move.endPosition.y)
                // offset = new Cesium.Cartesian2();
                // Cesium.Cartesian2.subtract(end, start, offset);
              //  //更新起始位置和上次移动的时间
              //   console.log(offset);
              //进行操作，这里进行坐标轴，和模型的移动
                //X轴方向移动
              const translation=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(offset.x,0,0))
              //Y轴方向移动
               const translation2=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0,offset.x,0))
               //Z轴方向移动 
               const translation3=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0,0,offset.x))
               //X轴方向移动
              //X轴移动 反方向
               const translation6=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-offset.x,0,0))
               //Y轴移动 反方向
               const translation5=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0,-offset.x,0))
               //Z轴移动 反方向
               const translation4=Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0,0,-offset.x))

            if(pickObject.id =='axisX-line' || pickObject.id =='axisX-arrow'){
                  Cesium.Matrix4.multiply(model.modelMatrix,translation,model.modelMatrix)
                  self.moveCoorX(translation,translation2,translation3,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY)
               }else if(pickObject.id =='axisY-line' || pickObject.id =='axisY-arrow'){
                Cesium.Matrix4.multiply(model.modelMatrix,translation2,model.modelMatrix)
                self.moveCoorY(translation,translation2,translation3,translation4,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY)

               }else if(pickObject.id =='axisZ-line' || pickObject.id =='axisZ-arrow'){
                Cesium.Matrix4.multiply(model.modelMatrix,translation3,model.modelMatrix)
                self.moveCoorZ(translation6,translation2,translation3,translation4,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY)
               }else if(pickObject.id =='axisSphereX'){
                // 控制模型姿态
                const angel=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(5))
                const rotation=Cesium.Matrix4.fromRotationTranslation(angel)
                Cesium.Matrix4.multiply(model.modelMatrix,rotation,model.modelMatrix)
                // self.rotationCoorZ(rotation,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY)
               }else if(pickObject.id =='axisSphereY' ){
                const angel=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(5))
                const rotation=Cesium.Matrix4.fromRotationTranslation(angel)
                Cesium.Matrix4.multiply(model.modelMatrix,rotation,model.modelMatrix)
                // self.rotationCoorZ(rotation,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY)
               }else if(pickObject.id =='axisSphereZ'){
                const angel=Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(5))
                const rotation=Cesium.Matrix4.fromRotationTranslation(angel)
                Cesium.Matrix4.multiply(model.modelMatrix,rotation,model.modelMatrix)
                // self.rotationCoorZ(rotation,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY)
               }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

              console.log(pickObject,'pickObjectpickObject');
           
          }
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
    //取消鼠标移动事件
      handler.setInputAction(function (click) {
       handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
       viewer.scene.screenSpaceCameraController.enableRotate=true //恢复旋转
        
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      
      handler.setInputAction(()=>{
       //销毁各轴

       axisX.destroy()
       axisY.destroy()
       axisZ.destroy()
       axisSphereX.destroy()
       axisSphereY.destroy()
       axisSphereZ.destroy()
      },Cesium.ScreenSpaceEventType.RIGHT_DOWN)
    },
    createAxisSphere(id, position, matrix, color) {
      const geometry = new Cesium.PolylineGeometry({
        positions: position,
        width: 10,
      });
      const instnce = new Cesium.GeometryInstance({
        geometry: geometry,
        id: id,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
        },
      });
      return new Cesium.Primitive({
        geometryInstances: instnce,
        appearance: new Cesium.PolylineColorAppearance({
          translucent: false,
        }),
        modelMatrix: matrix,
      });
    },
  
    //坐标系整体向X轴移动的矩阵
    moveCoorX(translation,translation2,translation3,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY){
      Cesium.Matrix4.multiply(axisY.modelMatrix,translation,axisY.modelMatrix)
      Cesium.Matrix4.multiply(axisX.modelMatrix,translation3,axisX.modelMatrix)
      Cesium.Matrix4.multiply(axisZ.modelMatrix,translation,axisZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereZ.modelMatrix,translation,axisSphereZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereX.modelMatrix,translation3,axisSphereX.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereY.modelMatrix,translation,axisSphereY.modelMatrix)
    },
    //坐标系整体向Y轴移动的矩阵
    moveCoorY(translation,translation2,translation3,translation4,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY){
      Cesium.Matrix4.multiply(axisY.modelMatrix,translation4,axisY.modelMatrix)
      Cesium.Matrix4.multiply(axisX.modelMatrix,translation2,axisX.modelMatrix)
      Cesium.Matrix4.multiply(axisZ.modelMatrix,translation2,axisZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereZ.modelMatrix,translation2,axisSphereZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereX.modelMatrix,translation2,axisSphereX.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereY.modelMatrix,translation4,axisSphereY.modelMatrix)
    },
    //坐标系整体向Z轴移动的矩阵
    moveCoorZ(translation5,translation6,translation3,translation4,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY){
      Cesium.Matrix4.multiply(axisY.modelMatrix,translation6,axisY.modelMatrix)
      Cesium.Matrix4.multiply(axisX.modelMatrix,translation5,axisX.modelMatrix)
      Cesium.Matrix4.multiply(axisZ.modelMatrix,translation3,axisZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereZ.modelMatrix,translation3,axisSphereZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereX.modelMatrix,translation5,axisSphereX.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereY.modelMatrix,translation6,axisSphereY.modelMatrix)
    },
    rotationCoorZ(rotation,axisY,axisX,axisZ,axisSphereZ,axisSphereX,axisSphereY){
       Cesium.Matrix4.multiply(axisY.modelMatrix,rotation,axisY.modelMatrix)
      Cesium.Matrix4.multiply(axisX.modelMatrix,rotation,axisX.modelMatrix)
      // Cesium.Matrix4.multiply(axisZ.modelMatrix,rotation,axisZ.modelMatrix)
      // Cesium.Matrix4.multiply(axisSphereZ.modelMatrix,rotation,axisSphereZ.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereX.modelMatrix,rotation,axisSphereX.modelMatrix)
      Cesium.Matrix4.multiply(axisSphereY.modelMatrix,rotation,axisSphereY.modelMatrix)
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
      viewer.scene.screenSpaceCameraController.enableTilt = true
      //加载模型
      self.loadglft(self);
    },
  },
};
</script>

<style>
</style>