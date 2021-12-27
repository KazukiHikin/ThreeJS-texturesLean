import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//UIデバッグ
const gui = new dat.GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/**
 * テクスチャを追加してみよう
 */

/**
 * テクスチャのマテリアルを用意しよう
 * */

//マテリアル
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
});

/**
 * ジオメトリを用意しよう
 */

const basePlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  planeMaterial
);
basePlane.rotation.x = -Math.PI * 0.5;
basePlane.position.y = -0.65;

scene.add(basePlane);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//コントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.52);
scene.add(ambientLight);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001).name("ambient");

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.52);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("directional");

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  // cube.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // sphere.rotation.x = 0.15 * elapsedTime;
  // cube.rotation.x = 0.15 * elapsedTime;
  // torus.rotation.x = 0.15 * elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
