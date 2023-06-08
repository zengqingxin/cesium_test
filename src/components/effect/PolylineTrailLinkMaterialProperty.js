
function PolylineTrailLinkMaterialProperty(options) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color;
    this.duration = options.duration;
    this._time = (new Date()).getTime();
}
Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
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
PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
    return 'PolylineTrailLink';
}
PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
    result.image = Cesium.Material.PolylineTrailLinkImage;
    if(this.duration){
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    }
    return result;
}
PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
    return this === other ||
        (other instanceof PolylineTrailLinkMaterialProperty &&
            Property.equals(this._color, other._color))
}
Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
Cesium.Material.PolylineTrailLinkImage = require('./colors2.png');
Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                            {\n\
                                            czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                            vec2 st = materialInput.st;\n\
                                            vec4 colorImage = texture(image, vec2(fract(st.t - time), st.t));\n\
                                            vec4 fragColor;\n\
                                            fragColor.rgb = color.rgb / 1.0;\n\
                                            fragColor = czm_gammaCorrect(fragColor);\n\
                                            material.alpha = colorImage.a * color.a;\n\
                                            material.diffuse = color.rgb;\n\
                                            material.emission = fragColor.rgb;\n\
                                            return material;\n\
                                            }";

                                               //vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
    fabric: {
        type: Cesium.Material.PolylineTrailLinkType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
            image: Cesium.Material.PolylineTrailLinkImage,
            time: 0
        },
        source: Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function (material) {
        return true;
    }
});

//引入js后 的使用示例
// let positions = [ 113.91422648358798,22.553609820449566 , 113.91422648358798,
//     22.537126278789316,113.92691733616653,
//     22.537126278789316,113.92691733616653,
//     22.553609820449566,113.91422648358798,
//     22.553609820449566]
// let qiang = viewer.entities.add({
// name: "立体墙效果",
// wall: {
// positions: Cesium.Cartesian3.fromDegreesArray(positions),
// // 设置高度
// maximumHeights: new Array(positions.length).fill(100),
// minimunHeights: new Array(positions.length).fill(0),
// // 扩散墙材质
// material: new Cesium.PolylineTrailLinkMaterialProperty({
//   color: new Cesium.Color(0.0, 1.0, 0.0, 1.0),
//   duration:3000
// }),
// },
// });


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