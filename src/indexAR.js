import EventType from './ValueObjects/EventType'
import * as PubSub from 'pubsub-js'

let isLoadedPublished = false;
let modelNum = 0;
const centerX = 0;
const centerY = 0;
let meshNames = ['meshName1', 'meshName2', 'meshName3', 'tsukamotoMesh1', 'tsukamotoMesh2', 
                 'tsukamotoMesh3', 'tsukamotoMesh4', 'tsukamotoMesh5', 'tsukamotoMesh6'];
const modelMaxNum = meshNames.length;
const modesPath = './models/';
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
let scene = new THREE.Scene();
let camera = new THREE.Camera();
scene.add(camera);
let light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 2);
scene.add(light);    
// array of functions for the rendering loop
let onRenderFcts= [];

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
    gameStarted();
  } 

  arToolkitContext.update( arToolkitSource.domElement )
  // update scene.visible if the marker is seen
  // scene.visible = camera.visible
});

function gameStarted() {
  if (!isLoadedPublished) {
    PubSub.publish(EventType.isLoaded);
    isLoadedPublished = true;
  }
}
    
//////////////////////////////////////////////////////////////////////////////////
// add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

// init maker0
let marker0 = new THREE.Group();  
// Create a ArMarkerControl
let markerControls0 = new THREEx.ArMarkerControls(arToolkitContext, marker0, {
  type : 'pattern',
  patternUrl : './arjs/data/marker01.pat',
});
// as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
// scene.visible = false;
scene.add(marker0);

// obj,mtlを読み込んでいる時の処理
let onProgress0 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// obj,mtlが読み込めなかったときのエラー処理
let onError = function ( xhr ) {};

// load LEGO_Man.obj of mesh0
let mesh0
let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath(modesPath);
  mtlLoader.load( 'yasu3000.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'yasu3000.obj', function ( object ) {

  mesh0 = object
  mesh0.name = meshNames[0];
  marker0.add(mesh0);
  }, onProgress0, onError );
});

// init maker1
let marker1 = new THREE.Group(); 
var markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, marker1, {
  type : 'pattern',
  patternUrl : './arjs/data/marker02.pat',
});
scene.add(marker1);

// obj mtl を読み込んでいる時の処理
let onProgress1 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load LegoBricks3.obj mesh1
let mesh1
let mtlLoader1 = new THREE.MTLLoader();
  mtlLoader1.setPath(modesPath);
  mtlLoader1.load( 'yasu6000texture.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'yasu6000texture.obj', function ( object ) {

  object.scale.x = 0.5;
  object.scale.y = 0.5;
  object.scale.z = 0.5;
  mesh1 = object
  mesh1.name = meshNames[1];
  marker1.add(mesh1);

  }, onProgress1, onError );
});

// init maker2
let marker2 = new THREE.Group(); 
let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, marker2, {
  type : 'pattern',
  patternUrl : './arjs/data/marker03.pat',
});
scene.add(marker2);

let onProgress2 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load LEGO_Man2.obj of mesh2
let mesh2
let mtlLoader2 = new THREE.MTLLoader();
  mtlLoader2.setPath(modesPath);
  mtlLoader2.load( 'LEGO_Man2.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'LEGO_Man2.obj', function ( object ) {

  object.scale.x = 0.3;
  object.scale.y = 0.3;
  object.scale.z = 0.3;
  mesh2 = object
  mesh2.name = meshNames[2];
  marker2.add(mesh2);

  }, onProgress2, onError );
});

// init maker3
let marker3 = new THREE.Group(); 
let markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, marker3, {
  type : 'pattern',
  patternUrl : './arjs/data/marker04.pat',
});
scene.add(marker3);

let onProgress3 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load mesh3 of marker3
let mesh3
let mtlLoader3 = new THREE.MTLLoader();
  mtlLoader3.setPath(modesPath);
  mtlLoader3.load( 'tsukamotoModel.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'tsukamotoModel.obj', function ( object ) {

  object.scale.x = 0.7;
  object.scale.y = 0.7;
  object.scale.z = 0.7;
  mesh3 = object
  mesh3.name = meshNames[3];
  marker3.add(mesh3);

  }, onProgress3, onError );
});

// init marker4
let marker4 = new THREE.Group(); 
let markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, marker4, {
  type : 'pattern',
  patternUrl : './arjs/data/marker05.pat',
});
scene.add(marker4);

let onProgress4 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load tsukamotoModel2.obj of mesh4
let mesh4
let mtlLoader4 = new THREE.MTLLoader();
  mtlLoader4.setPath(modesPath);
  mtlLoader4.load( 'tsukamotoModel2.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'tsukamotoModel2.obj', function ( object ) {

  object.scale.x = 0.8;
  object.scale.y = 0.8;
  object.scale.z = 0.8;
  mesh4 = object
  mesh4.name = meshNames[4];
  marker4.add(mesh4);

  }, onProgress4, onError );
});

// init marker5
let marker5 = new THREE.Group(); 
let markerControls5 = new THREEx.ArMarkerControls(arToolkitContext, marker5, {
  type : 'pattern',
  patternUrl : './arjs/data/marker06.pat',
});
scene.add(marker5);

let onProgress5 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load tsukamotoModel3.obj of mesh5 
let mesh5
let mtlLoader5 = new THREE.MTLLoader();
  mtlLoader5.setPath(modesPath);
  mtlLoader5.load( 'tsukamotoModel3.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'tsukamotoModel3.obj', function ( object ) {

  object.scale.x = 0.9;
  object.scale.y = 0.9;
  object.scale.z = 0.9;
  mesh5 = object
  mesh5.name = meshNames[5];
  marker5.add(mesh5);

  }, onProgress5, onError );
});

// init marker6
let marker6 = new THREE.Group(); 
let markerControls6 = new THREEx.ArMarkerControls(arToolkitContext, marker6, {
  type : 'pattern',
  patternUrl : './arjs/data/marker07.pat',
});
scene.add(marker6);

let onProgress6 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load tsukamotoModel4.obj of mesh6
let mesh6
let mtlLoader6 = new THREE.MTLLoader();
  mtlLoader6.setPath(modesPath);
  mtlLoader6.load( 'tsukamotoModel4.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'tsukamotoModel4.obj', function ( object ) {

  mesh6 = object
  mesh6.name = meshNames[6];
  marker6.add(mesh6);

  }, onProgress5, onError );
});

// init marker7
let marker7 = new THREE.Group(); 
let markerControls7 = new THREEx.ArMarkerControls(arToolkitContext, marker7, {
  type : 'pattern',
  patternUrl : './arjs/data/marker08.pat',
});
scene.add(marker7);

let onProgress7 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load tsukamotoModel5.obj of mesh7
let mesh7
let mtlLoader7 = new THREE.MTLLoader();
  mtlLoader7.setPath(modesPath);
  mtlLoader7.load( 'tsukamotoModel5.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'tsukamotoModel5.obj', function ( object ) {

  mesh7 = object
  mesh7.name = meshNames[7];
  marker7.add(mesh7);

  }, onProgress5, onError );
});

// init marker8
let marker8 = new THREE.Group(); 
let markerControls8 = new THREEx.ArMarkerControls(arToolkitContext, marker8, {
  type : 'pattern',
  patternUrl : './arjs/data/marker09.pat',
});
scene.add(marker8);

let onProgress8 = function ( xhr ) {
  if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      if (percentComplete >= 100) {
        modelNum += 1;
      }
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

// load model.obj of marker8
let mesh8
let mtlLoader8 = new THREE.MTLLoader();
  mtlLoader8.setPath(modesPath);
  mtlLoader8.load( 'model.mtl', function( materials ) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath(modesPath);
  objLoader.load( 'model.obj', function ( object ) {

  mesh8 = object
  mesh8.name = meshNames[8];
  marker8.add(mesh8);

  }, onProgress8, onError );
});



onRenderFcts.push(function(delta){
  if (markerControls0.object3d.visible === true) {
    isCenter();
  }
  if (markerControls1.object3d.visible === true) {
    isCenter();
  }
  if (markerControls2.object3d.visible === true) {
    isCenter();
  }
  if (markerControls3.object3d.visible === true) {
    isCenter();
  }
  if (markerControls4.object3d.visible === true) {
    isCenter();
  }
  if (markerControls5.object3d.visible === true) {
    isCenter();
  }
  if (markerControls6.object3d.visible === true) {
    isCenter();
  }
  if (markerControls7.object3d.visible === true) {
    isCenter();
  }
  if (markerControls8.object3d.visible === true) {
    isCenter();
  }
});

let isDisplay = false;
let objectName;

function isCenter() {
  var pos = new THREE.Vector3(centerX, centerY, 1);
  pos.unproject(camera);
  var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
  var hitObj = ray.intersectObjects(scene.children, true);
  if (hitObj.length > 0) {
    isDisplay = true;
    objectName = hitObj[0].object.parent.name;
  } else {
    isDisplay = false;
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

// Event
PubSub.subscribe(EventType.shot, e => {
  if (isDisplay) {
    PubSub.publish(EventType.isHit, {name: objectName});
  }
});
