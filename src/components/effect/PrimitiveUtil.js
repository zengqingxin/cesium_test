class PrimitiveUtil {

    //画点(componentsPerPositionAttribute必须为3)
    static addPrimitivePoints(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        for (let i = 0; i < pointNum; i++) {
            indicesTesm.push(i);
        }

        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);

        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.POINTS, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);

        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        });
        return viewer.scene.primitives.add(primitive);
    }
    
    //画线(每2个顶点相连组成一条线)
    static addPrimitiveLines(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        for (let i = 0; i < pointNum; i++) {
            indicesTesm.push(i);
        }
    
        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);
    
        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.LINES, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);
    
        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        })
        return viewer.scene.primitives.add(primitive);
    }
    
    //画线(所有的顶点前后相连组成一条线)
    static addPrimitiveLinesStrip(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        for (let i = 0; i < pointNum; i++) {
            indicesTesm.push(i);
        }
    
        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);
    
        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.LINE_STRIP, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);
    
        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        })
        return viewer.scene.primitives.add(primitive);
    }
    
    //画线(所有的顶点前后相连组成一条闭合的线)
    static addPrimitiveLinesLoop(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        for (let i = 0; i < pointNum; i++) {
            indicesTesm.push(i);
        }
    
        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);
    
        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.LINE_LOOP, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);
    
        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        })
        return viewer.scene.primitives.add(primitive);
    }
    
    //画三角形(每3个顶点相连组成一个三角形)
    static addPrimitiveTriangles(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        for (let i = 0; i < pointNum; i++) {
            indicesTesm.push(i);
        }
    
        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);
    
        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.TRIANGLES, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);
    
        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        })
        return viewer.scene.primitives.add(primitive);
    }
    
    //画三角形(每个顶点和前面的一个顶点,第一个顶点相连组成一个三角形)
    static addPrimitiveTrianglesFan(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        // let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        // for (let i = 2; i < pointNum; i++) {
        //  indicesTesm.push(0);
        //  indicesTesm.push(i-1);
        //  indicesTesm.push(i);
        // }
    
        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);
    
        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.TRIANGLE_FAN, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);
    
        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        })
        return viewer.scene.primitives.add(primitive);
    }
    
    //画三角形(每个顶点和前面的两个顶点相连组成一个三角形)
    static addPrimitiveTrianglesStrip(viewer, pointPositionArr, componentsPerPositionAttribute, pointColorArr, componentsPerColorAttribute) {
        let vertexShader = this.prototype.getVS();
        let fragmentShader = this.prototype.getFS();
        //顶点索引（坐标点下标的连接顺序）
        let indicesTesm = [];
        // let pointNum = (pointPositionArr.length)/componentsPerPositionAttribute;
        // for (let i = 2; i < pointNum; i++) {
        //  indicesTesm.push(i-2);
        //  indicesTesm.push(i-1);
        //  indicesTesm.push(i);
        // }
    
        let positionArr = new Float64Array(pointPositionArr);
        let colorArr = new Float32Array(pointColorArr);
        let indiceArr = new Uint32Array(indicesTesm);
    
        let geometry = this.prototype.createGeometry(Cesium.PrimitiveType.TRIANGLE_STRIP, positionArr, componentsPerPositionAttribute, colorArr, componentsPerColorAttribute, indiceArr);
        let appearance = this.prototype.createAppearence(fragmentShader, vertexShader);
    
        let primitive =  new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry
            }),
            appearance: appearance,
            asynchronous: false
        })
        return viewer.scene.primitives.add(primitive);
    }

    //创建Geometry
    createGeometry(primitiveType, positions, componentsPerPositionAttribute, colors, componentsPerColorAttribute, indices) {
        return new Cesium.Geometry({
            attributes: {
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: componentsPerPositionAttribute,
                    values: positions
                }),
                color: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: componentsPerColorAttribute,
                    values: colors
                })
            },
            indices: indices,
            primitiveType: primitiveType,
            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
        });
    }

    //创建Appearence
    createAppearence(fs, vs) {
        return new Cesium.Appearance({
            renderState: {
                blending: Cesium.BlendingState.PRE_MULTIPLIED_ALPHA_BLEND,
                depthTest: {
                    enabled: true
                },
                depthMask: true
            },
            fragmentShaderSource: fs,
            vertexShaderSource: vs
        });
    }
    
    //顶点着色器源码
    getVS() {
        return "in vec3 position3DHigh;\
            in vec3 position3DLow;\
            in vec4 color;\
            out vec4 v_color;\
            in float batchId;\
            void main()\
            {\
                vec4 p = czm_computePosition();\
                v_color =color;\
                p = czm_modelViewProjectionRelativeToEye * p;\
                gl_Position = p;\
            }\
            ";
    }

    //片源着色器源码
    getFS() {
        return`in vec4 v_color;
        void main()
        {
             float d = distance(gl_PointCoord, vec2(0.5,0.5));
            if(d < 0.5){
                out_FragColor = v_color;
             }else{
                discard;
             }

            
        }
        `;
    }
}

export default PrimitiveUtil