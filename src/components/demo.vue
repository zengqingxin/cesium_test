<template>
  <div id="cesiumContainer"></div>

</template>

<script>
import CesiumByZh from "./CesiumByZh";
import * as turf from "@turf/turf";
import { LineFlowMaterialProperty } from "./effect/LineFlowMaterialProperty";
import { CircleRippleMaterialProperty } from "./effect/CircleRippleMaterialProperty";
import { WallDiffuseMaterialProperty } from "./effect/WallDiffuseMaterialProperty";
// import { DynamicWallMaterialProperty } from "./effect/DynamicWallMaterialProperty";
import { RadarLineMaterialProperty } from "./effect/RadarLineMaterialProperty";
import { EllipsoidTrailMaterialProperty } from "./effect/EllipsoidTrailMaterialProperty";
//流动纹理2
import { PolylineTrailLinkMaterialProperty } from "./effect/PolylineTrailLinkMaterialProperty";
// 流动纹理1
import  {FlowLineMaterialProperty}  from "./effect/FlowLineMaterialProperty";

import TerrainClipPlan  from "./effect/TerrainClipPlan2";
import PrimitiveUtil from "./effect/PrimitiveUtil";


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
    this.loadlineData(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      [120.9677706, 30.7985748, 110.2, 34.55]
    );
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
    this.loadBillboardBylnglat(CesiumByZh.viewer,CesiumByZh.Cesium,{
      lng: 113.8236839,
      lat: 22.528061,
      height: 10,
    },'./assets/image/locations3.png');
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
    this.loadjiantou(  
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      )
    this.loadpoiIconLabelAdd(
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      113.95875482025184,
      22.53333245334838,
      "公园",
      Cesium.Color.fromCssColorString("#ee0000"),
      "/assets/image/locations3.png"
    );
    this.induationAnalysis(
      
      CesiumByZh.viewer,
      CesiumByZh.Cesium,
      10,
      [
        113.94759683074989, 22.53468017437737,

        113.95090131225771, 22.525999034927693,

        113.95875482025184, 22.53333245334838,

        113.94759683074989, 22.53468017437737,
      ],
      10
      )
   this.dixing(CesiumByZh.viewer,CesiumByZh.Cesium,[
      {lng: 117.21992141546342,lat:   31.834501978738928,alt:-500},
      {lng:  117.23009575590903,lat:   31.834147775441505,alt:-500},
      {lng:  117.22904408751322,lat:   31.831771328246994,alt:-500},
      {lng:   117.21956115142603,lat:   31.826180788141706,alt:-500},
      ])
  // this.primitivedraw(CesiumByZh.viewer,CesiumByZh.Cesium,)
  this.flowWater(CesiumByZh.viewer,CesiumByZh.Cesium)
  this.flowWaterReflection(CesiumByZh.viewer,CesiumByZh.Cesium)
  this.LoadGeometryInstance(CesiumByZh.viewer,CesiumByZh.Cesium)
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
          width: 5, // 线的颜色
            material: new Cesium.LineFlowMaterialProperty({
                color: new Cesium.Color(0.0, 1.0, 0.5, 0.8),
                speed: 5 * Math.random(),
                percent: 0.1,
                gradient: 0.01,
              }), // 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
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
                color: new Cesium.Color(0.0, 1.0, 0.5, 0.8),
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
            material: new Cesium.Color(0.0, 1.0, 0.0, 0.2),
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
         material: new Cesium.EllipsoidTrailMaterialProperty({
            color: new Cesium.Color(1.0, 1.0, 0.0, 0.7),
            speed: 10.0
        }), // 填充的颜色，withAlpha透明度
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
    loadBillboardBylnglat(viewer, Cesium,pointdata,url){
       const { lng, lat, height } = pointdata;
	let entityBillBoard = new Cesium.Entity({
		id: 'Billboard0',
		name: 'Billboard0',
		show: true,
    position: Cesium.Cartesian3.fromDegrees(lng, lat, height),

		billboard: {
			image: url,
			show: true,
			sacle: 0.3,
			// color: Cesium.Color.YELLOWGREEN,
			width: 10,
			height: 10,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            10,
            3000.0
          ),
	}
  })
	let billboadrGeom = viewer.entities.add(entityBillBoard)
	viewer.zoomTo(billboadrGeom)
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

      // viewer.camera.setView({
      //   destination: Cesium.Rectangle.fromDegrees(
      //     bounds.west,
      //     bounds.south,
      //     bounds.east,
      //     bounds.north
      //   ),
      // });
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
    loadjiantou(viewer, Cesium) {

     

// 创建一条线
      const entityLine = viewer.entities.add({
        name: 'PolylineTrail',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([120.9677706, 30.7985748, 110.2, 34.55]),
          width: 10,
          clampToGround:true,
          material: new Cesium.FlowLineMaterialProperty(
         {
            color: new Cesium.Color(1, 1, 0, 0.7),
            duration:30000,
         }
           
          )
        }
      }
      )
viewer.flyTo(entityLine)
let positions = [ 113.91422648358798,22.553609820449566 , 113.91422648358798,
              22.537126278789316,113.92691733616653,
              22.537126278789316,113.92691733616653,
              22.553609820449566,113.91422648358798,
              22.553609820449566]
let qiang = viewer.entities.add({
        name: "立体墙效果",
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray(positions),
          // 设置高度
          maximumHeights: new Array(positions.length).fill(300),
          minimunHeights: new Array(positions.length).fill(0),
          // 扩散墙材质
          material: new Cesium.PolylineTrailLinkMaterialProperty({
            color: new Cesium.Color(0.0, 1.0, 0.0, 1.0),
            duration:3000
          }),
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

      // // 画点
      // viewer.entities.add({
      //   // 给初始点位设置一定的离地高度，否者会被压盖
      //   position: Cesium.Cartesian3.fromDegrees(lon, lat, 5),
      //   point: {
      //     color: color,
      //     pixelSize: 15,
      //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //       0,
      //       2500
      //     ),
      //   },
      // });
    },
    /**
 * 淹没分析函数，通过拉伸面的高度来进行分析
 * @param {*} viewer
 * @param {*} targertWaterHeight ：目标水位高度
 * @param {*} positions ：研究区域底部坐标数组
 * @param {*} waterHeight ：当前水位高度
 */
 induationAnalysis(viewer, Cesium, targertWaterHeight, positions, waterHeight) {
    viewer.entities.add({
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(positions)),
            perPositionHeight: true,
            // 使用回调函数Callback，直接设置extrudedHeight会导致闪烁
            extrudedHeight: new Cesium.CallbackProperty(function() {
                waterHeight += 0.2;
                if (waterHeight > targertWaterHeight) {
                    waterHeight = targertWaterHeight;
                }
                return waterHeight;
            }, false),
            material: new Cesium.Color.fromBytes(64, 157, 253, 150),
        }
    });
},

/**
 *  @param {*}    水面效果
 */
  flowWater(viewer, Cesium){
   
    var box = new Cesium.BoxGeometry({
    vertexFormat : Cesium.VertexFormat.POSITION_NORMAL_AND_ST,
    maximum : new Cesium.Cartesian3(20000.0, 20000.0, 200.0),
    minimum : new Cesium.Cartesian3(-22000.0, -20000.0, -200.0)
  });
  var geometry = Cesium.BoxGeometry.createGeometry(box);
 
  let inst = new Cesium.GeometryInstance({
    geometry: geometry
  });
 
  // 自定义材质
  let aper = new Cesium.MaterialAppearance({
    material: new Cesium.Material({
      fabric: {
        uniforms: {
          iTime: 0,
        },
        source:`
        const int NUM_STEPS = 8;
      const float PI     = 3.141592;
      const float EPSILON  = 1e-3;
      //#define EPSILON_NRM (0.1 / iResolution.x)
      #define EPSILON_NRM (0.1 / 200.0)
      // sea
      const int ITER_GEOMETRY = 3;
      const int ITER_FRAGMENT = 5;
      const float SEA_HEIGHT = 0.6;
      const float SEA_CHOPPY = 4.0;
      const float SEA_SPEED = 1.8;
      const float SEA_FREQ = 0.16;
      const vec3 SEA_BASE = vec3(0.1,0.19,0.22);
      const vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6);
      //#define SEA_TIME (1.0 + iTime * SEA_SPEED)
      const mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);
      // math
      mat3 fromEuler(vec3 ang) {
        vec2 a1 = vec2(sin(ang.x),cos(ang.x));
        vec2 a2 = vec2(sin(ang.y),cos(ang.y));
        vec2 a3 = vec2(sin(ang.z),cos(ang.z));
        mat3 m;
        m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
        m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
        m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
        return m;
      }
      float hash( vec2 p ) {
        float h = dot(p,vec2(127.1,311.7));
        return fract(sin(h)*43758.5453123);
      }
      float noise( in vec2 p ) {
        vec2 i = floor( p );
        vec2 f = fract( p );
        vec2 u = f*f*(3.0-2.0*f);
        return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ),
                 hash( i + vec2(1.0,0.0) ), u.x),
              mix( hash( i + vec2(0.0,1.0) ),
                 hash( i + vec2(1.0,1.0) ), u.x), u.y);
      }
      // lighting
      float diffuse(vec3 n,vec3 l,float p) {
        return pow(dot(n,l) * 0.4 + 0.6,p);
      }
      float specular(vec3 n,vec3 l,vec3 e,float s) {
        float nrm = (s + 8.0) / (PI * 8.0);
        return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
      }
      // sky
      vec3 getSkyColor(vec3 e) {
        e.y = max(e.y,0.0);
        return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4);
      }
      // sea
      float sea_octave(vec2 uv, float choppy) {
        uv += noise(uv);
        vec2 wv = 1.0-abs(sin(uv));
        vec2 swv = abs(cos(uv));
        wv = mix(wv,swv,wv);
        return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
      }
      float map(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float d, h = 0.0;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        for(int i = 0; i < ITER_GEOMETRY; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      float map_detailed(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        float d, h = 0.0;
        for(int i = 0; i < ITER_FRAGMENT; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
        float fresnel = clamp(1.0 - dot(n,-eye), 0.0, 1.0);
        fresnel = pow(fresnel,3.0) * 0.65;
        vec3 reflected = getSkyColor(reflect(eye,n));
        vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12;
        vec3 color = mix(refracted,reflected,fresnel);
        float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
        color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
        color += vec3(specular(n,l,eye,60.0));
        return color;
      }
      // tracing
      vec3 getNormal(vec3 p, float eps) {
        vec3 n;
        n.y = map_detailed(p);
        n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
        n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
        n.y = eps;
        return normalize(n);
      }
      float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
        float tm = 0.0;
        float tx = 1000.0;
        float hx = map(ori + dir * tx);
        if(hx > 0.0) return tx;
        float hm = map(ori + dir * tm);
        float tmid = 0.0;
        for(int i = 0; i < NUM_STEPS; i++) {
          tmid = mix(tm,tx, hm/(hm-hx));
          p = ori + dir * tmid;
          float hmid = map(p);
          if(hmid < 0.0) {
            tx = tmid;
            hx = hmid;
          } else {
            tm = tmid;
            hm = hmid;
          }
        }
        return tmid;
      }
           vec4 czm_getMaterial(vec2 vUv)
           {
            vec2 uv = vUv;
            uv = vUv * 2.0 - 1.0;
            float time = iTime * 0.3 + 0.0*0.01;
            // ray
            vec3 ang = vec3(0, 1.2, 0.0);
              vec3 ori = vec3(0.0,3.5,0);
            vec3 dir = normalize(vec3(uv.xy,-2.0)); dir.z += length(uv) * 0.15;
            dir = normalize(dir) * fromEuler(ang);
            // tracing
            vec3 p;
            heightMapTracing(ori,dir,p);
            vec3 dist = p - ori;
            vec3 n = getNormal(p, dot(dist,dist) * EPSILON_NRM);
            vec3 light = normalize(vec3(0.0,1.0,0.8));
            // color
            vec3 color = mix(
              getSkyColor(dir),
              getSeaColor(p,n,light,dir,dist),
              pow(smoothstep(0.0,-0.05,dir.y),0.3));
               return vec4( pow(color,vec3(0.75)), 1.0 );
           }
        `,
      }
    }),
    translucent: true,
    vertexShaderSource: `
        in vec3 position3DHigh;
        in vec3 position3DLow;
        in float batchId;
        in vec2 st;
        in vec3 normal;
        out vec2 v_st;
        out vec3 v_positionEC;
        out vec3 v_normalEC;
        void main() {
            v_st = st;
            vec4 p = czm_computePosition();
            v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
            v_normalEC = czm_normal * normal;                         // normal in eye coordinates
            gl_Position = czm_modelViewProjectionRelativeToEye * p;
        }
                    `,


    fragmentShaderSource: `
       in vec2 v_st;
      in vec3 v_positionEC;
      in vec3 v_normalEC;
      void main()  {
        vec3 positionToEyeEC = -v_positionEC;
        vec3 normalEC = normalize(v_normalEC);
        czm_materialInput materialInput;
        materialInput.normalEC = normalEC;
        materialInput.positionToEyeEC = positionToEyeEC;
        materialInput.st = v_st;
        vec4 color = czm_getMaterial(v_st);
        out_FragColor = color;
      }

                `,
                

  });
 
  let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(110, 40, 10)
  );
 
  let prmitive1 = viewer.scene.primitives.add(
   new Cesium.Primitive({
    geometryInstances: inst,
    appearance: aper,
    asynchronous: false,
    modelMatrix: modelMatrix,
  }));
 function renderLoop(timestamp){
    aper.material.uniforms.iTime = timestamp/1000;
    requestAnimationFrame(renderLoop);
  }
 
  renderLoop();



  },
flowWaterReflection(viewer, Cesium){
   var box = new Cesium.BoxGeometry({
    vertexFormat : Cesium.VertexFormat.POSITION_NORMAL_AND_ST,
    maximum : new Cesium.Cartesian3(25000.0, 25000.0, .0),
    minimum : new Cesium.Cartesian3(-25000.0, -25000.0, 0)
  });
  var geometry = Cesium.BoxGeometry.createGeometry(box);
 
  let inst = new Cesium.GeometryInstance({
    geometry: geometry
  });
 
  let planePos = Cesium.Cartesian3.fromDegrees(113.94759683074989, 22.53468017437737, 0);
  let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
          planePos
  );
  let planeNor = Cesium.Cartesian3.normalize(planePos, new Cesium.Cartesian3());
 
  // 自定义材质
  let aper = new Cesium.MaterialAppearance({
    material: new Cesium.Material({
      fabric: {
        uniforms: {
          iTime: 0,
          planeNor: planeNor,
          skyBoxU: '/assets/image/py.png',
          skyBoxD: '/assets/image/ny.png',
          skyBoxR: '/assets/image/px.png',
          skyBoxL: '/assets/image/nx.png',
          skyBoxF: '/assets/image/nz.png',
          skyBoxB: '/assets/image/pz.png',
        },
        source:`
        const int NUM_STEPS = 8;
      const float PI     = 3.141592;
      const float EPSILON  = 1e-3;
      //#define EPSILON_NRM (0.1 / iResolution.x)
      #define EPSILON_NRM (0.1 / 200.0)
      // sea
      const int ITER_GEOMETRY = 3;
      const int ITER_FRAGMENT = 5;
      const float SEA_HEIGHT = 0.6;
      const float SEA_CHOPPY = 4.0;
      const float SEA_SPEED = 1.8;
      const float SEA_FREQ = 0.16;
      const vec3 SEA_BASE = vec3(0.1,0.19,0.22);
      const vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6);
      //#define SEA_TIME (1.0 + iTime * SEA_SPEED)
      const mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);
      // math
      mat3 fromEuler(vec3 ang) {
        vec2 a1 = vec2(sin(ang.x),cos(ang.x));
        vec2 a2 = vec2(sin(ang.y),cos(ang.y));
        vec2 a3 = vec2(sin(ang.z),cos(ang.z));
        mat3 m;
        m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
        m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
        m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
        return m;
      }
      float hash( vec2 p ) {
        //flowWater
        float h = dot(p,vec2(127.1,311.7));
        return fract(sin(h)*43758.5453123);
      }
      float noise( in vec2 p ) {
        vec2 i = floor( p );
        vec2 f = fract( p );
        vec2 u = f*f*(3.0-2.0*f);
        return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ),
                 hash( i + vec2(1.0,0.0) ), u.x),
              mix( hash( i + vec2(0.0,1.0) ),
                 hash( i + vec2(1.0,1.0) ), u.x), u.y);
      }
      // lighting
      float diffuse(vec3 n,vec3 l,float p) {
        return pow(dot(n,l) * 0.4 + 0.6,p);
      }
      float specular(vec3 n,vec3 l,vec3 e,float s) {
        float nrm = (s + 8.0) / (PI * 8.0);
        return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
      }
      // sky
      vec3 getSkyColor(vec3 e) {
        e.y = max(e.y,0.0);
        return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4);
      }
      // sea
      float sea_octave(vec2 uv, float choppy) {
        uv += noise(uv);
        vec2 wv = 1.0-abs(sin(uv));
        vec2 swv = abs(cos(uv));
        wv = mix(wv,swv,wv);
        return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
      }
      float map(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float d, h = 0.0;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        for(int i = 0; i < ITER_GEOMETRY; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      float map_detailed(vec3 p) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz; uv.x *= 0.75;
        float SEA_TIME = 1.0 + iTime * SEA_SPEED;
        float d, h = 0.0;
        for(int i = 0; i < ITER_FRAGMENT; i++) {
          d = sea_octave((uv+SEA_TIME)*freq,choppy);
          d += sea_octave((uv-SEA_TIME)*freq,choppy);
          h += d * amp;
          uv *= octave_m; freq *= 1.9; amp *= 0.22;
          choppy = mix(choppy,1.0,0.2);
        }
        return p.y - h;
      }
      vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
        float fresnel = clamp(1.0 - dot(n,-eye), 0.0, 1.0);
        fresnel = pow(fresnel,3.0) * 0.65;
        vec3 reflected = getSkyColor(reflect(eye,n));
        vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12;
        vec3 color = mix(refracted,reflected,fresnel);
        float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
        color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
        color += vec3(specular(n,l,eye,60.0));
        return color;
      }
      // tracing
      vec3 getNormal(vec3 p, float eps) {
        vec3 n;
        n.y = map_detailed(p);
        n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
        n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
        n.y = eps;
        return normalize(n);
      }
      float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
        float tm = 0.0;
        float tx = 1000.0;
        float hx = map(ori + dir * tx);
        if(hx > 0.0) return tx;
        float hm = map(ori + dir * tm);
        float tmid = 0.0;
        for(int i = 0; i < NUM_STEPS; i++) {
          tmid = mix(tm,tx, hm/(hm-hx));
          p = ori + dir * tmid;
          float hmid = map(p);
          if(hmid < 0.0) {
            tx = tmid;
            hx = hmid;
          } else {
            tm = tmid;
            hm = hmid;
          }
        }
        return tmid;
      }
           vec4 czm_getMaterial(vec2 vUv, vec3 positionWC)
           {
            vec2 uv = vUv;
            uv = vUv * 2.0 - 1.0;
            // return texture2D(skyBox,uv);
            float time = iTime * 0.3 + 0.0*0.01;
            // ray
            vec3 ang = vec3(0, 1.2, 0.0);
              vec3 ori = vec3(0.0,3.5,0);
            vec3 dir = normalize(vec3(uv.xy,-2.0)); dir.z += length(uv) * 0.15;
            dir = normalize(dir) * fromEuler(ang);
            // tracing
            vec3 p;
            heightMapTracing(ori,dir,p);
            vec3 dist = p - ori;
            vec3 n = getNormal(p, dot(dist,dist) * EPSILON_NRM);
            vec3 light = normalize(vec3(0.0,1.0,0.8));
            // color
            vec3 color = mix(
              getSkyColor(dir),
              getSeaColor(p,n,light,dir,dist),
              pow(smoothstep(0.0,-0.05,dir.y),0.3)
            );
            vec3 cameraPos = czm_encodedCameraPositionMCHigh + czm_encodedCameraPositionMCLow;
            vec3 inDir = normalize(positionWC - cameraPos);
            vec3 refDir = normalize( reflect(inDir, planeNor) );
            vec2 dirOnUp = normalize( vec2(refDir.x,refDir.y) );
            float theta = acos(dot(refDir, vec3(0,0,1.0)));
            float len = tan(theta);
            vec2 dirOnPlane = normalize( vec2(refDir.x,refDir.y) );
            vec2 interPos = len * dirOnPlane;
            vec2 uvSky = (interPos+1.0)/2.0;
            vec3 skyColor = texture(skyBoxU,uvSky).rgb;
            // skyColor = vec3(1.0,1.0,0.0);
            if(refDir.z<0.0){
              theta = acos(dot(refDir, vec3(0,0,-1.0)));
              len = tan(theta);
              dirOnPlane = normalize( vec2(refDir.x,-refDir.y) );
              interPos = len * dirOnPlane;
              uvSky = (interPos+1.0)/2.0;
              skyColor = texture(skyBoxD,uvSky).rgb;
              // skyColor = vec3(1.0,1.0,1.0);
            }
            if(abs(interPos.x)>1.0 || abs(interPos.y)>1.0){
              float thetaX = acos(dot(dirOnUp, vec2(1.0,0.0)));
              float thetaXM = acos(dot(dirOnUp, vec2(-1.0,0.0)));
              float thetaY = acos(dot(dirOnUp, vec2(0.0,1.0)));
              float thetaYM = acos(dot(dirOnUp, vec2(0.0,-1.0)));
              if(thetaX<PI/4.0){
                theta = acos(dot(refDir, vec3(1.0,0,0)));
                len = tan(theta);
                dirOnPlane = normalize( vec2(refDir.y,refDir.z) );
                interPos = len * dirOnPlane;
                uvSky = (interPos+1.0)/2.0;
                skyColor = texture(skyBoxR,uvSky).rgb;
                // skyColor = vec3(0.0,1.0,0);
              }else if(thetaXM<PI/4.0){
                theta = acos(dot(refDir, vec3(-1.0,0,0)));
                len = tan(theta);
                dirOnPlane = normalize( vec2(-refDir.y,refDir.z) );
                interPos = len * dirOnPlane;
                uvSky = (interPos+1.0)/2.0;
                skyColor = texture(skyBoxL,uvSky).rgb;
                // skyColor = vec3(0.0,0.0,1.0);
              }else if(thetaYM<PI/4.0){
                theta = acos(dot(refDir, vec3(0,1.0,0)));
                len = tan(theta);
                dirOnPlane = normalize( vec2(refDir.x,-refDir.z) );
                interPos = len * dirOnPlane;
                uvSky = (interPos+1.0)/2.0;
                skyColor = texture(skyBoxB,uvSky).rgb;
                // skyColor = vec3(1.0,0.5,0.0);
              }else if(thetaY<PI/4.0){
                theta = acos(dot(refDir, vec3(0,-1.0,0)));
                len = tan(theta);
                dirOnPlane = normalize( vec2(refDir.x,-refDir.z) );
                interPos = len * dirOnPlane;
                uvSky = (interPos+1.0)/2.0;
                skyColor = texture(skyBoxF,uvSky).rgb;
                // skyColor = vec3(1.0,0.0,0.0);
              }
            }
            vec3 seaColorV3 = pow(color,vec3(0.75));
            vec3 finallColor = seaColorV3*0.4+skyColor*0.6;
            return vec4( finallColor, 1.0 );
           }
        `,
      }
    }),
    translucent: true,
    vertexShaderSource: `
        in vec3 position3DHigh;
        in vec3 position3DLow;
        in float batchId;
        in vec2 st;
        in vec3 normal;
        out vec2 v_st;
        out vec3 v_positionEC;
        out vec3 v_normalEC;
        out vec3 positionWC;
        void main() {
            v_st = st;
            vec4 p = czm_computePosition();
            v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
            v_normalEC = czm_normal * normal;                         // normal in eye coordinates
            positionWC = position3DHigh + position3DLow;
            gl_Position = czm_modelViewProjectionRelativeToEye * p;
        }
                    `,
    fragmentShaderSource: `
      in vec2 v_st;
      in vec3 v_positionEC;
      in vec3 v_normalEC;
      in vec3 positionWC;
      void main()  {
        vec3 positionToEyeEC = -v_positionEC;
        vec3 normalEC = normalize(v_normalEC);
        czm_materialInput materialInput;
        materialInput.normalEC = normalEC;
        materialInput.positionToEyeEC = positionToEyeEC;
        materialInput.st = v_st;
        vec4 color = czm_getMaterial(v_st,positionWC);
        out_FragColor = color;
      }
                `,
  });
 
  viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: inst,
    appearance: aper,
    asynchronous: false,
    modelMatrix: modelMatrix,
  }));
function renderLoop(timestamp){
    aper.material.uniforms.iTime = timestamp/1000;
    requestAnimationFrame(renderLoop);
  }
renderLoop()

},
  dixing(viewer, Cesium,points){
    //这里需要传入世界坐标系（笛卡尔坐标系）
    //let earthPositionList = 
    // [
    //     { x: -2480825.779644006, y: 4823039.348573122, z: 3344798.9734951435 },
    //     { x: -2481857.6623671586, y: 4822939.719360245, z: 3344990.8291531955 },
    //     { x: -2481826.5803391673, y: 4823096.907581604, z: 3344758.5949868727 },
    //     { x: -2480854.0689538443, y: 4823168.905374106, z: 3343792.5711652176 }
    //     ]



      //   let  earthPositionListarry = []
      // for (let i = 0; i < earthPositionList.length; i++) {
      //   const radians = viewer.scene.globe.ellipsoid.cartesianToCartographic(earthPositionList[i])
      //   console.log(radians);
      //   let obj= {
      //     lng:Cesium.Math.toDegrees(radians.longitude),
      //     lat:Cesium.Math.toDegrees(radians.latitude),
      //     alt:Cesium.Math.toDegrees(radians.height)
      //   }
      //   earthPositionListarry.push(obj)
      // }
      // console.log(earthPositionListarry,'3333333333');

    let point = points
      let pointarr =[]
    for (let i = 0; i < point.length; i++) {
        pointarr.push(Cesium.Cartesian3.fromDegrees(point[i].lng, point[i].lat,  point[i].alt))
        console.log(pointarr,2222222);
    }
    let terrainClipPlan = new Cesium.TerrainClipPlan(viewer, {
            height: 30,
            splitNum: 50,
            bottomImg: '/assets/image/excavate_bottom_min.jpg',
            wallImg: '/assets/image/excavate_side_min.jpg'
        })
   terrainClipPlan.updateData(pointarr)
  viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(117.220108, 31.834937, 3000)
        })
  }, 
  
  //primitive 绘制点 、 线 、面  ,但没效果
  primitivedraw(viewer, Cesium){
     let p1 = Cesium.Cartesian3.fromDegrees(115.0, 37.0, 10);
            let p2 = Cesium.Cartesian3.fromDegrees(120.0, 37.0, 10);
            let p3 = Cesium.Cartesian3.fromDegrees(120.0, 40.0, 10);
            let p4 = Cesium.Cartesian3.fromDegrees(119.0, 42.0, 10);
            let pointArr2 = [p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z, p4.x, p4.y, p4.z];
            // let color = new Cesium.Color(0.0, 1.0, 0.0, 1.0)
            let colorArr = [1.0, 0.0, 0.0, 0.5, 
                            0.0, 1.0, 0.0, 0.5, 
                            0.0, 0.0, 1.0, 0.5,
                            1.0, 1.0, 0.0, 0.5
            ];
            console.log('开始绘制');

             let pPrimitives = PrimitiveUtil.addPrimitivePoints(viewer, pointArr2, 3, colorArr, 4);
            //  let lPrimitives2 = PrimitiveUtil.addPrimitiveLinesStrip(viewer, pointArr2, 3, color, 4);

            //  viewer.flyTo(pPrimitives)
             viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(120, 31.834937, 10)
        })
            console.log('创建成功');
            // let lPrimitives1 = CesiumUtil.primitive.addPrimitiveLines(window.viewer, pointArr2, 3, colorArr, 4);
            // let lPrimitives2 = CesiumUtil.primitive.addPrimitiveLinesStrip(window.viewer, pointArr2, 3, colorArr, 4);
            // let lPrimitives3 = CesiumUtil.primitive.addPrimitiveLinesLoop(window.viewer, pointArr2, 3, colorArr, 4);

            // let tPrimitives1 = CesiumUtil.primitive.addPrimitiveTriangles(window.viewer, pointArr2, 3, colorArr, 4);
             //let tPrimitives2 = PrimitiveUtil.addPrimitiveTrianglesFan(viewer, pointArr2, 3, colorArr, 4);
            // let tPrimitives3 = CesiumUtil.primitive.addPrimitiveTrianglesStrip(window.viewer, pointArr2, 3, colorArr, 4);
  }
,
LoadGeometryInstance(){
  

}
   
  }
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

