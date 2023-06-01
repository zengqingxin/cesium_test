<template>
  <div id="cesiumContainer"></div>

</template>

<script>
import CesiumByZh from "./CesiumByZh";
import * as turf from "@turf/turf";
import { LineFlowMaterialProperty } from "./effect/LineFlowMaterialProperty";
import { CircleRippleMaterialProperty } from "./effect/CircleRippleMaterialProperty";
import { WallDiffuseMaterialProperty } from "./effect/WallDiffuseMaterialProperty";
import { DynamicWallMaterialProperty } from "./effect/DynamicWallMaterialProperty";
import { TrailLineMaterialProperty } from "./effect/TrailLineMaterialProperty";

export default {
  name: "demo",
  props: {
    msg: String,
  },
  data() {
    return {
     
    };
  },
  mounted() {
    //三维场景初始化
    CesiumByZh.init("cesiumContainer", function () {
      //这里可以写初始化完成后想要执行的操作
    });
    // this.loadgltfmodel(CesiumByZh.viewer, CesiumByZh.Cesium);
    // this.loadPointEntity(CesiumByZh.viewer, CesiumByZh.Cesium)
    this.loadPointData(CesiumByZh.viewer, CesiumByZh.Cesium, {
      lng: 113.8236839,
      lat: 22.528061,
      height: 10,
    });

    this.loadODlineData2(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      [113.9236839, 22.528061],
      [
        [113.8236839, 22.528061],
        [114.0236839, 22.528061],
        [113.9236839, 22.428061],
      ],
      5
    );
    // this.loadlineData(
    //   CesiumByZh.viewer,
    //   CesiumByZh.Cesium,
    //   [120.9677706, 30.7985748, 110.2, 34.55]
    // );
    this.loadPolygonData(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      [
        113.93281067983196, 22.549551756342012, 113.93281067983196,
        22.52192457116844, 113.97074439989046, 22.52192457116844,
      ],
      1,
      50
    );
    this.loadBillboardPointData(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      "./assets/geojson/BSZJson1.geojson"
    );
    this.loadheatpoint(CesiumByZh.viewer, CesiumByZh.Cesium);
    this.loadRadiationPoint(CesiumByZh.viewer, CesiumByZh.Cesium);
    this.loadWallDiffuse(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      [
        113.94759683074989, 22.53468017437737,

        113.95090131225771, 22.525999034927693,

        113.95875482025184, 22.53333245334838,

        113.94759683074989, 22.53468017437737,
      ]
    );
    // this.loadjiantou(  CesiumByZh.viewer,
    //   CesiumByZh.Cesium,
    //   [120.9677706, 30.7985748, 110.2, 34.55])
    this.loadpoiIconLabelAdd(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      113.95875482025184,
      22.53333245334838,
      "公园",
      Cesium.Color.fromCssColorString("#ee0000"),
      "/assets/image/locations3.png"
    );
  
  },
  methods: {
    //添加点
    loadPointData(viewer, Cesium, pointdata) {
      const { lng, lat, height } = pointdata;
      let pointData = viewer.entities.add({
        // fromDegrees（经度，纬度，高度，椭球，结果）从以度为单位的经度和纬度值返回Cartesian3位置
        position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
        point: {
          // 点的大小（像素）
          pixelSize: 5,
          // 点位颜色，fromCssColorString 可以直接使用CSS颜色
          color: Cesium.Color.fromCssColorString("#ee0000"),
          // 边框颜色
          outlineColor: Cesium.Color.fromCssColorString("#fff"),
          // 边框宽度(像素)
          outlineWidth: 2,
          // 显示在距相机的距离处的属性，多少区间内是可以显示的
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            1500
          ),
          // 是否显示
          show: true,
        },
        label: {
          // 文本。支持显式换行符“ \ n”
          text: "测试名称", // 字体样式，以CSS语法指定字体
          font: "14pt Source Han Sans CN", // 字体颜色
          fillColor: Cesium.Color.BLACK, // 背景颜色
          //backgroundColor: Cesium.Color.AQUA, // 是否显示背景颜色
          // showBackground: true, // 字体边框
          outline: true, // 字体边框颜色
          outlineColor: Cesium.Color.WHITE, // 字体边框尺寸
          outlineWidth: 10, // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
          scale: 1, // 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
          style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 相对于坐标的水平位置
          verticalOrigin: Cesium.VerticalOrigin.CENTER, // 相对于坐标的水平位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
          pixelOffset: new Cesium.Cartesian2(10, 0), // 是否显示
          show: true,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            10,
            2000.0
          ),
        },
      });
      viewer.flyTo(pointData);
    },
    //添加线
    loadlineData(viewer, Cesium, linedata) {
      let line = viewer.entities.add({
        polyline: {
          // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。
          positions: Cesium.Cartesian3.fromDegreesArray(linedata), // 宽度
          width: 2, // 线的颜色
          material: Cesium.Color.fromCssColorString("#ee0000"), // 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          clampToGround: true,
          zIndex: 10, // 是否显示
          show: true,
        },
      });
      viewer.flyTo(line);
    },
    //#region
    // loadODlineData(viewer, Cesium, ODlinedata) {
    //   const startPoint = [ODlinedata[0], ODlinedata[1], 0]; // 起点的经度、纬度
    //   const step = 80; // 自定义线段的数量，越多则越平滑
    //   const heightProportion = 0.125; // 自定义最高点和总距离的比值(即图中H比上AB的值)，值越大则抛物线越弯曲
    //   const dLon = (ODlinedata[2] - startPoint[0]) / step; // 经度差值
    //   const dLat = (ODlinedata[3] - startPoint[1]) / step; // 纬度差值
    //   const deltaLon = dLon * Math.abs(111000 * Math.cos(ODlinedata[1])); // 经度差(米级)
    //   const deltaLat = dLat * 111000; // 纬度差(米),1纬度相差约111000米
    //   const endPoint = [0, 0, 0]; // 定义一个端点(后面将进行startPoint和endPoint两点画线)
    //   const heigh = Math.floor(
    //     step *
    //       Math.sqrt(deltaLon * deltaLon + deltaLat * deltaLat) *
    //       heightProportion
    //   );
    //   const x2 = 10000 * Math.sqrt(dLon * dLon + dLat * dLat); // 小数点扩大10000倍，提高精确度
    //   const a = heigh / (x2 * x2); // 抛物线函数中的a
    //   function y(x, height) {
    //     // 模拟抛物线函数，求高度H
    //     // 此处模拟的函数为y = H - a*x^2 (H为高度常数)，取整后返回
    //     return Math.floor(height - a * x * x);
    //   }
    //   for (let i = 1; i <= step; i++) {
    //     // 逐“帧”画线
    //     endPoint[0] = startPoint[0] + dLon; // 更新end点纬度
    //     endPoint[1] = startPoint[1] + dLat; // 更新end点纬度
    //     const x = x2 * ((2 * i) / step - 1); // 求抛物线函数x
    //     endPoint[2] = y(x, heigh); // 求end点高度
    //     viewer.clock.currentTime = Cesium.JulianDate.now(); // 将时钟指针移到当前时间
    //     // 这里的viewer是容器初始化时new Cesium.Viewer构造的: var viewer = new Cesium.Viewer('mapContainer', {...});
    //     const IsoTime = Cesium.JulianDate.now(); // 获取当前时间
    //     viewer.entities.add({
    //       // 添加动态线
    //       polyline: {
    //         positions: Cesium.Cartesian3.fromDegreesArrayHeights(
    //           startPoint.concat(endPoint)
    //         ),
    //         width: 4,
    //         material: new Cesium.PolylineOutlineMaterialProperty({
    //           color: Cesium.Color.GOLD,
    //           outlineWidth: 0.3,
    //         }),
    //       },
    //       availability: new Cesium.TimeIntervalCollection([
    //         new Cesium.TimeInterval({
    //           // 设置显示的时间区间
    //           start: {
    //             dayNumber: IsoTime.dayNumber,
    //             secondsOfDay: IsoTime.secondsOfDay + (i - 1) * 300,
    //           },
    //           stop: {
    //             dayNumber: IsoTime.dayNumber,
    //             secondsOfDay: IsoTime.secondsOfDay + i * 300,
    //           },
    //         }),
    //       ]),
    //     });
    //     let ODline = viewer.entities.add({
    //       // 添加静态线
    //       polyline: {
    //         positions: Cesium.Cartesian3.fromDegreesArrayHeights(
    //           startPoint.concat(endPoint)
    //         ),
    //         width: 4,
    //         material: new Cesium.PolylineGlowMaterialProperty({
    //           color: Cesium.Color.AQUA.withAlpha(0.9),
    //           outlineWidth: 0.3,
    //           glowPower: 0.3,
    //         }),
    //       },
    //     });
    //     // end点变为start点
    //     startPoint[0] = endPoint[0];
    //     startPoint[1] = endPoint[1];
    //     startPoint[2] = endPoint[2];
    //     viewer.flyTo(ODline);
    //   }
    //   viewer.clock.shouldAnimate = true; // 启动时钟开始转动
    //   viewer.clock.multiplier = 1800; // 设置时钟转动速度
    // },
    //#endregion

    //动态OD线
    loadODlineData2(viewer, Cesium, center, position, _num) {
      let _center = center;
      let _positions = position;
      _positions.forEach((item) => {
        let _siglePositions = parabola(_center, item, 5000);
        // 创建飞线
        for (let i = 0; i < _num; i++) {
          viewer.entities.add({
            polyline: {
              positions: _siglePositions,
              material: new Cesium.LineFlowMaterialProperty({
                color: new Cesium.Color(1.0, 1.0, 0.0, 0.8),
                speed: 5 * Math.random(),
                percent: 0.1,
                gradient: 0.01,
              }),
            },
          });
        }
        // 创建轨迹线
        let ODline = viewer.entities.add({
          polyline: {
            positions: _siglePositions,
            material: new Cesium.Color(1.0, 1.0, 0.0, 0.2),
          },
        });
        viewer.flyTo(ODline);
      });
      /**
       * @description: 抛物线构造函数（参考开源代码）
       * @param {*}
       * @return {*}
       */
      function parabola(startPosition, endPosition, height = 0, count = 50) {
        //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
        let result = [];
        height = Math.max(+height, 100);
        count = Math.max(+count, 50);
        let diffLon = Math.abs(startPosition[0] - endPosition[0]);
        let diffLat = Math.abs(startPosition[1] - endPosition[1]);
        let L = Math.max(diffLon, diffLat);
        let dlt = L / count;
        if (diffLon > diffLat) {
          //base on lon
          let delLat = (endPosition[1] - startPosition[1]) / count;
          if (startPosition[0] - endPosition[0] > 0) {
            dlt = -dlt;
          }
          for (let i = 0; i < count; i++) {
            let h =
              height -
              (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
                Math.pow(L, 2);
            let lon = startPosition[0] + dlt * i;
            let lat = startPosition[1] + delLat * i;
            let point = new Cesium.Cartesian3.fromDegrees(lon, lat, h);
            result.push(point);
          }
        } else {
          //base on lat
          let delLon = (endPosition[0] - startPosition[0]) / count;
          if (startPosition[1] - endPosition[1] > 0) {
            dlt = -dlt;
          }
          for (let i = 0; i < count; i++) {
            let h =
              height -
              (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
                Math.pow(L, 2);
            let lon = startPosition[0] + delLon * i;
            let lat = startPosition[1] + dlt * i;
            let point = new Cesium.Cartesian3.fromDegrees(lon, lat, h);
            result.push(point);
          }
        }
        return result;
      }
    },
    //添加面
    loadPolygonData(viewer, Cesium, positions, height, extrudedHeight) {
      let polygon = viewer.entities.add({
        polygon: {
          // 获取指定属性（positions，holes（图形内需要挖空的区域））
          hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray(positions),
            /**
             * holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  119, 32, 115, 34, 119, 40,
                ]),
              },
            ],
             */
          },

          outline: true, // 边框
          outlineColor: Cesium.Color.RED, // 边框颜色
          outlineWidth: 2, // 边框尺寸
          material: Cesium.Color.GREEN.withAlpha(0.5), // 填充的颜色，withAlpha透明度
          fill: true, // 是否被提供的材质填充
          height: height, // 恒定高度
          extrudedHeight: extrudedHeight,
          // 显示在距相机的距离处的属性，多少区间内是可以显示的
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            1000,
            10000000
          ),
          show: true, // 是否显示
          clampToGround: true,
          // zIndex: 10, // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
        },
      });
      viewer.flyTo(polygon);
    },
    //添加标记Billboard
    loadBillboardPointData(viewer, Cesium, url) {
      let promise1 = Cesium.GeoJsonDataSource.load(url);
      promise1.then((dataSource) => {
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities.values;
        // console.log(entities,"11111")
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          entity.billboard.image = "/assets/image/locations3.png";
          entity.billboard.scale = 0.13;
          entity.billboard.distanceDisplayCondition =
            new Cesium.DistanceDisplayCondition(0, 2000.0);
          entity.billboard.label = {
            scale: 1,
            text: "entity" + [i],
            font: `12px bold 楷体`,
            fillColor: Cesium.Color.RED,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            show: true,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            heightReference: Cesium.HeightReference.NONE,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              2000.0
            ),
            scaleByDistance: new Cesium.NearFarScalar(50, 1, 3000, 0.2),
          };
        }
      });
      viewer.flyTo(promise1);
      //
    },
    //添加热力图
    async loadheatpoint(viewer, Cesium) {
      let heatpoint =
        await require("../../public/assets/geojson/heatPoints.json");
      let turfpointsArr = []; //计算四至
      let features = heatpoint.data.features;
      //用于计算四至
      features.forEach((item) => {
        let pointarr = [
          item.geometry.coordinates[0],
          item.geometry.coordinates[1],
        ];
        turfpointsArr.push(pointarr);
      });
      //计算四至
      var line = turf.lineString(turfpointsArr);
      //获取点集的四至
      var boxborder = turf.bbox(line);
      console.log(boxborder, 1111);
      //将四至设好
      // let latMin = boxborder[1];
      // let latMax = boxborder[3];
      // let lonMin =boxborder[0];
      // let lonMax = boxborder[2];
      let bounds = {
        west: boxborder[0],
        east: boxborder[2],
        south: boxborder[1],
        north: boxborder[3],
      };

      // init heatmap
      let heatMap = CesiumHeatmap.create(
        viewer, // your cesium viewer
        bounds, // bounds for heatmap layer
        {
          maxOpacity: 1,
          minOpacity: 0.16,
          gradient: {
            0.05: "rgba(0,0,125,1)",
            0.25: "rgba(0 ,255 ,127,0.2)",
            0.45: "rgb(0,255,0)",
            0.65: "rgb(255 255 0)",
            0.85: "rgb(255 165 0)",
            1.0: "rgb(255,0,0)",
          },
          radius: 80,
        }
      );
      let data = [];
      features.forEach((item) => {
        let point = {
          x: item.geometry.coordinates[0],
          y: item.geometry.coordinates[1],

          value: Math.floor(item.properties.noise),
        };
        data.push(point);
      });
      let valueMin = 0;
      let valueMax = 60;

      // add data to heatmap
      heatMap.setWGS84Data(valueMin, valueMax, data);

      viewer.camera.setView({
        destination: Cesium.Rectangle.fromDegrees(
          bounds.west,
          bounds.south,
          bounds.east,
          bounds.north
        ),
      });
    },
    //添加辐射圈
    loadRadiationPoint(viewer, Cesium) {
      let lng = 113.9236839;
      let lat = 22.528061;
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lng, lat),
        name: "辐射圈",
        ellipse: {
          semiMinorAxis: 200.0,
          semiMajorAxis: 200.0,
          material: new Cesium.CircleRippleMaterialProperty({
            color: new Cesium.Color(1, 1, 0, 0.7),
            speed: 5,
            count: 4,
            gradient: 0.6,
          }),
        },
      });
    },
    //添加立体墙
    loadWallDiffuse(viewer, Cesium, positions) {
      viewer.entities.add({
        name: "立体墙效果",
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray(positions),
          // 设置高度
          maximumHeights: new Array(positions.length).fill(100),
          minimunHeights: new Array(positions.length).fill(0),
          // 扩散墙材质
          material: new Cesium.WallDiffuseMaterialProperty({
            color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
          }),
        },
      });
    },
    //箭头线(失败找不到viewer)
    loadjiantou(viewer, Cesium, linedata) {
      let line = viewer.entities.add({
        polyline: {
          // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。
          positions: Cesium.Cartesian3.fromDegreesArray(linedata), // 宽度
          width: 10, // 线的颜色
          material: new Cesium.TrailLineMaterialProperty({
            color: Cesium.Color.RED,
            duration: 18000,
          }),
          clampToGround: true,
          zIndex: 10, // 是否显示
          show: true,
        },
      });
    },
    //自定义立体标签
    loadpoiIconLabelAdd(viewer, Cesium, lon, lat, name, color, url) {
      viewer.entities.add({
        name: name,
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 300),
        // 图标
        billboard: {
          image: url,
          width: 20,
          height: 20,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            2500
          ),
        },
        label: {
          //文字标签
          text: name,
          font: "20px sans-serif",
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            2500
          ),
          style: Cesium.LabelStyle.FILL,
          // 对齐方式(水平和竖直)
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(20, -2),
          showBackground: true,
          backgroundColor: new Cesium.Color.fromBytes(0, 70, 24),
        },
      });

      // 先画线后画点，防止线压盖点
      let linePositions = [];
      linePositions.push(new Cesium.Cartesian3.fromDegrees(lon, lat, 5));
      linePositions.push(new Cesium.Cartesian3.fromDegrees(lon, lat, 300));
      viewer.entities.add({
        polyline: {
          positions: linePositions,
          width: 1.5,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            2500
          ),

          material: color,
        },
      });

      // 画点
      viewer.entities.add({
        // 给初始点位设置一定的离地高度，否者会被压盖
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 5),
        point: {
          color: color,
          pixelSize: 15,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            2500
          ),
        },
      });
    },
   


   
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

