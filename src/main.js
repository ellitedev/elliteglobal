
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import album from 'url:./album.obj';
import floppy from 'url:./file.obj';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.01, 900);

var myObj;
const objloader = new OBJLoader();
objloader.load(album, function (object) { //load the obj file
  myObj = object;
  object.traverse(function (child) {
    if (child.isMesh) {
      var wireframeGeomtry = new THREE.WireframeGeometry(child.geometry);
      var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x424242 });
      var wireframe = new THREE.LineSegments(wireframeGeomtry, wireframeMaterial);
      child.add(wireframe);
    }
  });
  scene.add(object);
  object.position.set(0, 0, -60);
  object.scale.set(0, 0, 0);
});
var floppyObj;
objloader.load(floppy, function (object) { //load the obj file
  floppyObj = object;
  object.traverse(function (child) {
    if (child.isMesh) {
      var wireframeGeomtry = new THREE.WireframeGeometry(child.geometry);
      var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x424242 });
      var wireframe = new THREE.LineSegments(wireframeGeomtry, wireframeMaterial);
      child.add(wireframe);
    }
  });
  scene.add(object);
  object.position.set(0, 0, -110);
  object.scale.set(0, 0, 0);
});

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x424242, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, -30);
scene.add(sphere);

function moveCamera(e) {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 0.025;
  floppyObj.scale.x = t * 0.00002;
  floppyObj.scale.y = t * 0.00002;
  floppyObj.scale.z = t * 0.00002;
  myObj.scale.x = t * 0.0025;
  myObj.scale.y = t * 0.0025;
  myObj.scale.z = t * 0.0025;
}

document.body.onscroll = moveCamera;

// auto resize renderer to window
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

//animate and render the scene
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;
  floppyObj.rotation.x -= 0.0052;
  floppyObj.rotation.y -= 0.0052;
  myObj.rotation.x += 0.0055;
  myObj.rotation.y += 0.0055;
  renderer.render(scene, camera);
}
animate();

