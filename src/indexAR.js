
const modelMaxNum = 2;
let modelNum = 0;
const centerX = 0;
const centerY = 0;
var renderer  = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setClearColor(new THREE.Color('lightgrey'), 0)
renderer.setSize( 640, 480 );
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = '0px'
renderer.domElement.style.left = '0px'
document.body.appendChild( renderer.domElement );
// init scene and camera
var scene = new THREE.Scene();
var camera = new THREE.Camera();
scene.add(camera);
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 2);
scene.add(light);    
// array of functions for the rendering loop
var onRenderFcts= [];

// handle arToolkitSource
var arToolkitSource = new THREEx.ArToolkitSource({
  sourceType : 'webcam',  
});
arToolkitSource.init(function onReady(){
  onResize()
});

window.addEventListener('resize', function(){
  onResize()
});
function onResize(){
  arToolkitSource.onResize()  
  arToolkitSource.copySizeTo(renderer.domElement) 
  if( arToolkitContext.arController !== null ){
    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)  
  } 
};

// initialize arToolkitContext
var arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: './arjs/data/camera_para.dat',
  detectionMode: 'mono',
});
arToolkitContext.init(function onCompleted(){
  // copy projection matrix to camera
  camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
});

onRenderFcts.push(function(){

  if( arToolkitSource.ready === false ) return
  
  // load Completed play
  if( modelMaxNum > modelNum ) {
    console.log('loading...');
    return
  } else {
     // console.log('play');
  } 

  arToolkitContext.update( arToolkitSource.domElement )
  // update scene.visible if the marker is seen
  // scene.visible = camera.visible
});
    
//////////////////////////////////////////////////////////////////////////////////
// add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

let marker1 = new THREE.Group();  
// Create a ArMarkerControl
var markerControls = new THREEx.ArMarkerControls(arToolkitContext, marker1, {
  type : 'pattern',
  patternUrl : './arjs/data/patt.hiro',
});
// as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
// scene.visible = false;
scene.add(marker1);

// obj,mtlを読み込んでいる時の処理
var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// obj,mtlが読み込めなかったときのエラー処理
var onError = function ( xhr ) {};

let mesh
var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath( './model/' );
  mtlLoader.load( 'LEGO_Man.mtl', function( materials ) {

  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( './model/' );
  objLoader.load( 'LEGO_Man.obj', function ( object ) {

  object.scale.x = 0.2;
  object.scale.y = 0.2;
  object.scale.z = 0.2;
  mesh = object
  mesh.name = "testName1";
  marker1.add(mesh);
  }, onProgress, onError );
});

// init maker2
let marker2 = new THREE.Group(); 
var markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, marker2, {
  type : 'pattern',
  patternUrl : './arjs/data/patt.kanji',
});
scene.add(marker2);

// obj mtl を読み込んでいる時の処理
var onProgress2 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

let mesh2
var mtlLoader2 = new THREE.MTLLoader();
  mtlLoader2.setPath( './model/' );
  mtlLoader2.load( 'LegoBricks3.mtl', function( materials2 ) {

  materials2.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials2 );
  objLoader.setPath( './model/' );
  objLoader.load( 'LegoBricks3.obj', function ( object ) {

  object.scale.x = 0.1;
  object.scale.y = 0.1;
  object.scale.z = 0.1;
  mesh2 = object
  mesh2.name = "testName2";
  marker2.add(mesh2);

  }, onProgress2, onError );
});

onRenderFcts.push(function(delta){
  if (markerControls.object3d.visible === true) {
    console.log('1:表示されている状態');
    isCenter();
  }
  if (markerControls2.object3d.visible === true) {
    console.log('2:表示されている状態');
    isCenter();
  }
})

function isCenter() {
  var pos = new THREE.Vector3(centerX, centerY, 1);
  pos.unproject(camera);
  var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
  var hitObj = ray.intersectObjects(scene.children, true);
  if(hitObj.length > 0) {
    console.log(hitObj[0].object.parent.name);
    // To Do Event Fire!
    // 一応、配列に名前一覧いれてCheckしてからEvent発火するか?
  }
}

// render the whole thing on the page
onRenderFcts.push(function(){
  renderer.render( scene, camera );
});

var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec  = nowMsec
  // call each update function
  onRenderFcts.forEach(function(onRenderFct){
    onRenderFct(deltaMsec/1000, nowMsec/1000)
  })
});
