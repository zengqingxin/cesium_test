export default class ArrowPolyline {

    /**
     * 箭头线
     */
    constructor(option = {}) {
        this.color = option.color || Cesium.Color.RED;
        this.width = option.width || 3;
        this.headWidth = option.headWidth || 2 * this.width;
        this.length = option.length || 300
        this.headLength = option.headLength || 10
        this.inverse = option.inverse || false
        this.position = option.position
        const id = option.id 
        var Cesium = option.Cesium
        //这里用的是圆锥几何对象，当topRadius和bottomRadius相同时，它就是一个圆柱
        const line = Cesium.CylinderGeometry.createGeometry(new Cesium.CylinderGeometry({
            length: this.length,
            topRadius: this.width,
            bottomRadius: this.width
        }));
        const arrow = Cesium.CylinderGeometry.createGeometry(new Cesium.CylinderGeometry({
            length: this.headLength,
            topRadius: 0,
            bottomRadius: this.headWidth
        }));
        let offset = (this.length + this.headLength) / 2
        if (this.inverse) {
            offset = -offset
        }

        ArrowPolyline.translate(Cesium,arrow, [0, 0, offset]);

        return new Cesium.Primitive({
            modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(this.position),
            geometryInstances: [new Cesium.GeometryInstance(
                {
                    id: id + '-line',
                    geometry: line,
                }
            ),
            new Cesium.GeometryInstance({
                id: id + '-arrow',
                geometry: arrow,
            })],
            appearance: new Cesium.MaterialAppearance({
                material: Cesium.Material.fromType('Color', { color: this.color })
            })
        });
    }
    /**
    * 按上面的方法画出的箭头在线的中间，我们需要把它平移到线的一端
    */
    static translate =  (Cesium,geometry, offset)=> {
        const scratchOffset = new Cesium.Cartesian3();

        if (offset instanceof Array) {
            scratchOffset.x = offset[0];
            scratchOffset.y = offset[1];
            scratchOffset.z = offset[2];
        } else {
            Cesium.Cartesian3.clone(offset, scratchOffset);
        }

        for (let i = 0; i < geometry.attributes.position.values.length; i += 3) {
            geometry.attributes.position.values[i] += scratchOffset.x;
            geometry.attributes.position.values[i + 1] += scratchOffset.y;
            geometry.attributes.position.values[i + 2] += scratchOffset.z;
        }
    }
}
