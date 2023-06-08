(function () {
  /*
        流动纹理线
         color 颜色
         duration 持续时间 毫秒
      */
  function FlowLineMaterialProperty(options) {
      this._definitionChanged = new Cesium.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color;
      this.duration = options.duration;
      this._time = (new Date()).getTime();
  }
  Object.defineProperties(FlowLineMaterialProperty.prototype, {
      isConstant: {
          get: function () {
              return false;
          }
      },
      definitionChanged: {
          get: function () {
              return this._definitionChanged;
          }
      },
      color: Cesium.createPropertyDescriptor('color')
  });
  FlowLineMaterialProperty.prototype.getType = function (time) {
      return 'FlowLine';
  }
  FlowLineMaterialProperty.prototype.getValue = function (time, result) {
      if (!Cesium.defined(result)) {
          result = {};
      }
      result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
      result.image = Cesium.Material.FlowLineImage;
      result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
      return result;
  }
  FlowLineMaterialProperty.prototype.equals = function (other) {
      return this === other ||
          (other instanceof FlowLineMaterialProperty &&
              Property.equals(this._color, other._color))
  }
  Cesium.FlowLineMaterialProperty = FlowLineMaterialProperty;
  Cesium.Material.FlowLineType = 'FlowLine';
  Cesium.Material.FlowLineImage = require('./arrow2.png')
  Cesium.Material.FlowLineSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                {\n\
                                                     czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                     vec2 st = materialInput.st;\n\
                                                     vec4 colorImage = texture(image, vec2(fract(st.s - time), st.t));\n\
                                                     material.alpha = colorImage.a * color.a;\n\
                                                     material.diffuse = colorImage.rgb;\n\
                                                     return material;\n\
                                                 }";
                                                 //vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
  Cesium.Material._materialCache.addMaterial(Cesium.Material.FlowLineType, {
      fabric: {
          type: Cesium.Material.FlowLineType,
          uniforms: {
              color: new Cesium.Color(1.0, 1.0, 1.0, 1),
              image: Cesium.Material.FlowLineImage,
              time: 0
          },
          source: Cesium.Material.FlowLineSource
      },
      translucent: function (material) {
          return true;
      }
  });

  function drawCanvas() {
      let canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 50;
      let ctx = canvas.getContext('2d');

      let grd = ctx.createLinearGradient(0, 0, 1200, 0);
      grd.addColorStop(0, "rgba(255,255,0,0.2)");
      grd.addColorStop(1, "rgba(0,255,0,1)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 1200, 50);
      return canvas.toDataURL("image/png");
  }
})()
//引入jS后的使用实例
// const entityLine = viewer.entities.add({
//     name: 'PolylineTrail',
//     polyline: {
//       positions: Cesium.Cartesian3.fromDegreesArray([120.9677706, 30.7985748, 110.2, 34.55]),
//       width: 50,
//       material: new Cesium.FlowLineMaterialProperty(
//      {
//       color: new Cesium.Color(1, 1, 0, 0.7),
//         duration:30000,
//         viewer:viewer

//      }
       
//       )
//     }
//   }
//   )

// 特效1
// Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
// {\n\
//      czm_material material = czm_getDefaultMaterial(materialInput);\n\
//      vec2 st = materialInput.st;\n\
//      vec4 colorImage = texture2D(image, vec2(fract(st.s), st.t));\n\
//      material.alpha = colorImage.a * color.a;\n\
//      material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
//      return material;\n\
//  }";
//特效2
// Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
//                                             {\n\
//                                             czm_material material = czm_getDefaultMaterial(materialInput);\n\
//                                             vec2 st = materialInput.st;\n\
//                                             vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n\
//                                             vec4 fragColor;\n\
//                                             fragColor.rgb = color.rgb / 1.0;\n\
//                                             fragColor = czm_gammaCorrect(fragColor);\n\
//                                             material.alpha = colorImage.a * color.a;\n\
//                                             material.diffuse = color.rgb;\n\
//                                             material.emission = fragColor.rgb;\n\
//                                             return material;\n\
//                                             }";