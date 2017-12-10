import EventType from './ValueObjects/EventType'
import * as PubSub from 'pubsub-js'

let isLoadedPublished = false;
let modelNum = 0;
const centerX = 0;
const centerY = 0;
let meshNames = ['teradaj', 'fujimakis', 'okashitay', 'suzukik', 'nakanoa', 
                 'watanaber', 'haram', 'matsudas', 'watanabes'];
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

// load mesh0
let dracoLoader0 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh0
dracoLoader0.load( './models/teradaj.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh0 = new THREE.Mesh( geometry, material );
  mesh0.castShadow = true;
  mesh0.receiveShadow = true;
  mesh0.name = meshNames[0];
  marker0.add(mesh0);
}, onProgress0, onError );

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

// load mesh1
let dracoLoader1 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh1
dracoLoader1.load( './models/fujimaki.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh1 = new THREE.Mesh( geometry, material );
  mesh1.castShadow = true;
  mesh1.receiveShadow = true;
  mesh1.name = meshNames[1];
  marker1.add(mesh1);
}, onProgress1, onError );

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

// load mesh2
let dracoLoader2 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh2
dracoLoader2.load( './models/yasudrc20002.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh2 = new THREE.Mesh( geometry, material );
  mesh2.castShadow = true;
  mesh2.receiveShadow = true;
  mesh2.name = meshNames[2];
  marker2.add(mesh2);
}, onProgress2, onError );

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
let dracoLoader3 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh3
dracoLoader3.load( './models/suzukik.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh3 = new THREE.Mesh( geometry, material );
  mesh3.castShadow = true;
  mesh3.receiveShadow = true;
  mesh3.name = meshNames[3];
  marker3.add(mesh3);
}, onProgress3, onError );

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

// load mesh4
let dracoLoader4 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh4
dracoLoader4.load( './models/nakanoa_rote2.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh4 = new THREE.Mesh( geometry, material );
  mesh4.castShadow = true;
  mesh4.receiveShadow = true;
  mesh4.name = meshNames[4];
  marker4.add(mesh4);
}, onProgress4, onError );

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

// load mesh5 
let dracoLoader5 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh5
dracoLoader5.load( './models/yasudrc20005.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh5 = new THREE.Mesh( geometry, material );
  mesh5.castShadow = true;
  mesh5.receiveShadow = true;
  mesh5.name = meshNames[5];
  marker5.add(mesh5);
}, onProgress5, onError );


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

// load mesh6
let dracoLoader6 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh6
dracoLoader6.load( './models/haram.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh6 = new THREE.Mesh( geometry, material );
  mesh6.castShadow = true;
  mesh6.receiveShadow = true;
  mesh6.name = meshNames[6];
  marker6.add(mesh6);
}, onProgress6, onError );

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

// load mesh7
let dracoLoader7 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh7
dracoLoader7.load( './models/matsudas.drc', function ( geometry ) {
  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh7 = new THREE.Mesh( geometry, material );
  mesh7.castShadow = true;
  mesh7.receiveShadow = true;
  mesh7.name = meshNames[7];
  marker7.add(mesh7);
}, onProgress7, onError );

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
let dracoLoader8 = new THREE.DRACOLoader('darcojs/loaders/darco/');
let mesh8
dracoLoader8.load( './models/watanabes.drc', function ( geometry ) {

  geometry.computeVertexNormals();
  var material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
  mesh8 = new THREE.Mesh( geometry, material );
  mesh8.castShadow = true;
  mesh8.receiveShadow = true;
  mesh8.scale.x = 3.0;
  mesh8.scale.y = 3.0;
  mesh8.scale.z = 3.0;
  mesh8.name = meshNames[8];
  marker8.add(mesh8);
}, onProgress8, onError );



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
    console.log(hitObj[0].object.name);
    objectName = hitObj[0].object.name;
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
