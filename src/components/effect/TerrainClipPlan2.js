(function () {
    "use strict";

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(Cesium, "__esModule", {
        value: !0
    }),
        Cesium.TerrainClipPlan = void 0;
    var n = function () {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var a = t[i];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
            }
        }
        return function (t, i, a) {
            return i && e(t.prototype, i), a && e(t, a), t
        }
    }();
    Cesium.TerrainClipPlan = function () {
        function e(t, i) {
            a(this, e),
                this.viewer = t,
                this.options = i || {},
                this._positions = i.positions,
                this._height = this.options.height || 0,
                this.bottomImg = i.bottomImg,
                this.wallImg = i.wallImg,
                this.splitNum = Cesium.defaultValue(i.splitNum, 50),
                this._positions && this._positions.length > 0 && this.updateData(this._positions)
        }
        return n(e, [{
            key: "updateData",
            value: function (e) {
                this.clear();
                var t = [],
                    i = e.length,
                    a = new Cesium.Cartesian3,
                    n = Cesium.Cartesian3.subtract(e[0], e[1], a);
                n = n.x > 0, this.excavateMinHeight = 9999;
                for (var r = 0; r < i; ++r) {
                    var s = (r + 1) % i,
                        l = Cesium.Cartesian3.midpoint(e[r], e[s], new Cesium.Cartesian3),
                        u = Cesium.Cartographic.fromCartesian(e[r]),
                        c = this.viewer.scene.globe.getHeight(u) || u.height;
                    c < this.excavateMinHeight && (this.excavateMinHeight = c);
                    var d, h = Cesium.Cartesian3.normalize(l, new Cesium.Cartesian3);
                    d = n ? Cesium.Cartesian3.subtract(e[r], l, new Cesium.Cartesian3) : Cesium.Cartesian3.subtract(e[s], l, new Cesium.Cartesian3), d = Cesium.Cartesian3.normalize(d, d);
                    var f = Cesium.Cartesian3.cross(d, h, new Cesium.Cartesian3);
                    f = Cesium.Cartesian3.normalize(f, f);
                    var p = new Cesium.Plane(f, 0),
                        m = Cesium.Plane.getPointDistance(p, l);
                    t.push(new Cesium.ClippingPlane(f, m))
                }
                this.viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
                    planes: t,
                    edgeWidth: 1,
                    edgeColor: Cesium.Color.RED,
                    enabled: !0
                }), this._prepareWell(e), this._createWell(this.wellData)
            }
        }, {
            key: "clear",
            value: function () {
                this.viewer.scene.globe.clippingPlanes && (this.viewer.scene.globe.clippingPlanes.enabled = !1, this.viewer.scene.globe.clippingPlanes.removeAll(), this.viewer.scene.globe.clippingPlanes.isDestroyed() || this.viewer.scene.globe.clippingPlanes.destroy()), this.viewer.scene.globe.clippingPlanes = void 0, this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface), this.wellWall && this.viewer.scene.primitives.remove(this.wellWall), delete this.bottomSurface, delete this.wellWall, this.viewer.scene.render()
            }
        }, {
            key: "_prepareWell",
            value: function (e) {
                var t = this.splitNum,
                    i = e.length;
                if (0 != i) {
                    for (var a = this.excavateMinHeight - this.height, n = [], r = [], s = [], l = 0; l < i; l++) {
                        var u = l == i - 1 ? 0 : l + 1,
                            c = Cesium.Cartographic.fromCartesian(e[l]),
                            d = Cesium.Cartographic.fromCartesian(e[u]),
                            h = [c.longitude, c.latitude],
                            f = [d.longitude, d.latitude];

                        0 == l && (
                            s.push(new Cesium.Cartographic(h[0], h[1])),
                            r.push(Cesium.Cartesian3.fromRadians(h[0], h[1], a)),
                            n.push(Cesium.Cartesian3.fromRadians(h[0], h[1], 0)));

                        for (var p = 1; p <= t; p++) {
                            var m = Cesium.Math.lerp(h[0], f[0], p / t),
                                g = Cesium.Math.lerp(h[1], f[1], p / t);
                            l == i - 1 && p == t || (
                                s.push(new Cesium.Cartographic(m, g)),
                                r.push(Cesium.Cartesian3.fromRadians(m, g, a)),
                                n.push(Cesium.Cartesian3.fromRadians(m, g, 0)))
                        }
                    }
                    this.wellData = {
                        lerp_pos: s,
                        bottom_pos: r,
                        no_height_top: n
                    }
                }
            }
        }, {
            key: "_createWell",
            value: function (e) {
                if (Boolean(this.viewer.terrainProvider._layers)) {
                    var t = this;
                    this._createBottomSurface(e.bottom_pos);
                    // var i = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, e.lerp_pos);
                    // Cesium.when(i, function (i) {
                    //     for (var a = i.length, n = [], r = 0; r < a; r++) {
                    //         var s = Cesium.Cartesian3.fromRadians(i[r].longitude, i[r].latitude, i[r].height);
                    //         n.push(s)
                    //     }
                    //     t._createWellWall(e.bottom_pos, n)
                    // })
                    var i = Cesium.sampleTerrainMostDetailed(this.viewer.terrainProvider, e.lerp_pos).then(function (i) {
                        for (var a = i.length, n = [], r = 0; r < a; r++) {
                            var s = Cesium.Cartesian3.fromRadians(i[r].longitude, i[r].latitude, i[r].height);
                            n.push(s)
                        }
                        t._createWellWall(e.bottom_pos, n)
                    })
                } else {
                    this._createBottomSurface(e.bottom_pos);
                    this._createWellWall(e.bottom_pos, e.no_height_top)
                }
            }
        }, {
            key: "_getMinHeight",
            value: function (e) {
                let minHeight = 5000000;
                let minPoint = null;
                for (let i = 0; i < e.length; i++) {
                    let height = e[i]['z'];
                    if (height < minHeight) {
                        minHeight = height;
                        minPoint = this._ellipsoidToLonLat(e[i]);
                    }
                }
                return minPoint.altitude;
            }
        }, {
            key: "_ellipsoidToLonLat",
            value: function (c) {
                let ellipsoid = this.viewer.scene.globe.ellipsoid;
                let cartesian3 = new Cesium.Cartesian3(c.x, c.y, c.z);
                let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
                let lat = Cesium.Math.toDegrees(cartographic.latitude);
                let lng = Cesium.Math.toDegrees(cartographic.longitude);
                let alt = cartographic.height;
                return {
                    longitude: lng,
                    latitude: lat,
                    altitude: alt
                }
            }
        }, {
            key: "_createWellWall",
            value: function (e, t) {
                let minHeight = this._getMinHeight(e);
                let maxHeights = [];
                let minHeights = [];
                for (let i = 0; i < t.length; i++) {
                    maxHeights.push(this._ellipsoidToLonLat(t[i]).altitude);
                    minHeights.push(minHeight);
                }
                let wall = new Cesium.WallGeometry({
                    positions: t,
                    maximumHeights: maxHeights,
                    minimumHeights: minHeights,
                });
                let geometry = Cesium.WallGeometry.createGeometry(wall);
                var a = new Cesium.Material({
                    fabric: {
                        type: "Image",
                        uniforms: {
                            image: this.wallImg
                        }
                    }
                }),
                    n = new Cesium.MaterialAppearance({
                        translucent: !1,
                        flat: !0,
                        material: a
                    });
                this.wellWall = new Cesium.Primitive({
                    geometryInstances: new Cesium.GeometryInstance({
                        geometry: geometry,
                        attributes: {
                            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.GREY)
                        },
                        id: "PitWall"
                    }),
                    appearance: n,
                    asynchronous: !1
                }), this.viewer.scene.primitives.add(this.wellWall)
            }
        }, {
            key: "_createBottomSurface",
            value: function (e) {
                if (e.length) {
                    let minHeight = this._getMinHeight(e);
                    let positions = [];
                    for (let i = 0; i < e.length; i++) {
                        let p = this._ellipsoidToLonLat(e[i]);
                        positions.push(p.longitude);
                        positions.push(p.latitude);
                        positions.push(minHeight);
                    }

                    let polygon = new Cesium.PolygonGeometry({
                        polygonHierarchy: new Cesium.PolygonHierarchy(
                            Cesium.Cartesian3.fromDegreesArrayHeights(positions)
                        ),
                        perPositionHeight : true
                    });
                    let geometry = Cesium.PolygonGeometry.createGeometry(polygon);


                    var i = new Cesium.Material({
                        fabric: {
                            type: "Image",
                            uniforms: {
                                image: this.bottomImg
                            }
                        }
                    }),
                        a = new Cesium.MaterialAppearance({
                            translucent: !1,
                            flat: !0,
                            material: i
                        });
                    this.bottomSurface = new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: geometry
                        }),
                        appearance: a,
                        asynchronous: !1
                    }), this.viewer.scene.primitives.add(this.bottomSurface)
                }
            }
        }, {
            key: "_switchExcavate",
            value: function (e) {
                e ? (this.viewer.scene.globe.material = Cesium.Material.fromType("WaJue"), this.wellWall.show = !0, this.bottomSurface.show = !0) : (this.viewer.scene.globe.material = null, this.wellWall.show = !1, this.bottomSurface.show = !1)
            }
        }, {
            key: "_updateExcavateDepth",
            value: function (e) {
                this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface), this.wellWall && this.viewer.scene.primitives.remove(this.wellWall);
                for (var t = this.wellData.lerp_pos, i = [], a = t.length, n = 0; n < a; n++) i.push(Cesium.Cartesian3.fromRadians(t[n].longitude, t[n].latitude, this.excavateMinHeight - e));
                this.wellData.bottom_pos = i, this._createWell(this.wellData), this.viewer.scene.primitives.add(this.bottomSurface), this.viewer.scene.primitives.add(this.wellWall)
            }
        }, {
            key: "show",
            get: function () {
                return this._show
            },
            set: function (e) {
                this._show = e, this.viewer.scene.globe.clippingPlanes && (this.viewer.scene.globe.clippingPlanes.enabled = e), this._switchExcavate(e)
            }
        }, {
            key: "height",
            get: function () {
                return this._height
            },
            set: function (e) {
                this._height = e, this._updateExcavateDepth(e)
            }
        }]), e
    }()
})()

//引入后的使用示例
// let earthPositionList = [
//     { x: -2480825.779644006, y: 4823039.348573122, z: 3344998.9734951435 },
//     { x: -2481857.6623671586, y: 4822939.719360245, z: 3344970.8291531955 },
//     { x: -2481826.5803391673, y: 4823096.907581604, z: 3344768.5949868727 },
//     { x: -2480854.0689538443, y: 4823168.905374106, z: 3344792.5711652176 }
//     ]
//     // let points = [ {x:-2495739.242281818762422, y:4924560.891864060831722, z:3344998.9734951435 }, 
//     //                 { x:-2495495.966318366117775,y:4936370.751335374021437 ,z:3344970.8291531955 }, 
//     //                 {x:-2495432.2276522340253,y:4940450.701099574100226,  z:3344768.5949868727  }, 
//     //                 {x:-2495432.2276522340253, y:4940450.701099574100226,  z:3344792.5711652176 }, 
//     //                 { x:-2493565.508940983098 , y:4938510.702522579929791,z:3344768.5949868727}, 
//     //                 {x:-2493543.364830962382257, y:4917680.611525853164494,  z:3344970.8291531955  }, 
//     //                 { y:-2495739.242281818762422 ,y:4924560.891864060831722,  z:3344998.9734951435} ] 
// let terrainClipPlan = new Cesium.TerrainClipPlan(viewer, {
//         height: 30,
//         splitNum: 50,
//         bottomImg: '/assets/image/excavate_bottom_min.jpg',
//         wallImg: '/assets/image/excavate_side_min.jpg'
//     })
// terrainClipPlan.updateData(earthPositionList)
