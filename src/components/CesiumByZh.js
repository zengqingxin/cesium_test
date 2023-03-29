export default class CesiumByZh {
    static Cesium;
    static viewer;
    static cesiumDefaultStartTime = new Date(2022, 2, 28, 12, 0, 0).getTime();
    static cesiumDefaultEndTime = new Date(2022, 2, 28, 12, 0, 0).getTime() + 86400000;
    constructor() {
    }
    
    static init(id, funhander) {
        try {
            // @ts-ignore
            if (window.Cesium){
                // @ts-ignore
                CesiumByZh.Cesium=window.Cesium;
                // @ts-ignore
                CesiumByZh.viewer = new CesiumByZh.Cesium.Viewer(id, {
                    //天地图(这里是我自己申请的天地图Key,想用天地图的可以自己申请,很简单免费的)
                    imageryProvider: new CesiumByZh.Cesium.WebMapTileServiceImageryProvider({
                        url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=30cc127d81b6563a4f9eb761a01aa5a6',
                        layer: 'img',
                        style: 'default',
                        tileMatrixSetID: 'w',
                        format: 'tiles',
                        maximumLevel: 19
                    }),
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
                });
                //开启深度地形测试
                CesiumByZh.viewer.scene.globe.depthTestAgainstTerrain = true;
               
                CesiumByZh.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MzY5NWI4YS02Y2IwLTRhMGYtOGE3MS03NGY5N2Q3NDJjODUiLCJpZCI6MzY0MjYsImlhdCI6MTYwMzQ0MDM1Nn0.oIxHAr3gEFCqTPO7BepTyoPQN77pXH3zRUqY4X7IpQM';
                //是否显示大气层
                CesiumByZh.viewer.scene.globe.showGroundAtmosphere = false;
                //是否开启实时光照
                CesiumByZh.viewer.scene.globe.enableLighting = false;
                //是否显示帧数
                CesiumByZh.viewer.scene.debugShowFramesPerSecond = true;
                //修改home位置
                CesiumByZh.Cesium.Camera.DEFAULT_VIEW_RECTANGLE = CesiumByZh.Cesium.Rectangle.fromDegrees(103, 30, 104, 29);
                //屏蔽双击实体摄像头拉近
                CesiumByZh.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(CesiumByZh.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
                //屏蔽ctrl加鼠标左键旋转视图的操作器
                CesiumByZh.viewer.scene.screenSpaceCameraController.tiltEventTypes = [CesiumByZh.Cesium.CameraEventType.MIDDLE_DRAG, CesiumByZh.Cesium.CameraEventType.PINCH];
                if (funhander != null) {
                    // @ts-ignore
                    funhander();
                }
                //去除因为光照导致模型颜色变暗
                CesiumByZh.viewer.scene.light = new CesiumByZh.Cesium.DirectionalLight({
                    direction: new CesiumByZh.Cesium.Cartesian3(0.354925, -0.890918, -0.283358)
                });

            }
        }catch (e) {
            console.log(e);
        }
    }

}
