import './style.css'

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 2000, 1000000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new ShaderPass( FXAAShader ));
composer.addPass(new ShaderPass( CopyShader ));
// Resolution, Strength, Radius, Threshold
composer.addPass(new UnrealBloomPass({ x: 2096, y: 128 }, 4.0, 0.0, 0.35));

///////////////////////////////

// STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(30, 12, 12);
  const color = new THREE.Color(0xffffff);
  color.setHex(Math.random() * (0xffffff - 0xeeeeee) + 0xeeeeee);
  const material = new THREE.MeshStandardMaterial({ color: color });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100000));

  star.position.set(x, y, z)
  scene.add(star);
//  star.layers.disable(1);
//  star.layers.enable(0); 
}

Array(1500).fill().forEach(addStar);

///////////////////////////////

//SKYBOX
let skyboxImage = 'space';

function createPathStrings(filename) {
  const basePath = `./${filename}/`;
  const baseFilename = basePath + filename;
  const fileType = filename == 'space' ? '.png' : '.jpg';
  const sides = ['front', 'back', 'top', 'bottom', 'right', 'left'];
  const pathStrings = sides.map(side => {
    return baseFilename + '_' + side + fileType;
  });

  return pathStrings;
}

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

let materialArray = createMaterialArray(skyboxImage);

const skyboxGeo = new THREE.BoxGeometry(1000000, 1000000, 1000000);
const skybox = new THREE.Mesh(skyboxGeo, materialArray);

scene.add(skybox);

//////////////////////////////

// MOVE CAMERA ON SCROLL
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = t * 0.9;
}
document.body.onscroll = moveCamera;

////////////////////////////////

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // Animation logic goes here:



  // controls.update();

  //renderer.render(scene, camera);
 // renderer.render(starScene, starCamera);
   composer.render();
 }

animate();
