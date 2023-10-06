import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z);
    scene.add(star)
}

// Scene, Camera, Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Torus 

const geometry = new THREE.TorusGeometry( 14, 2, 22, 127 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xbb99ff} ); 
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

scene.add(torus);

// Planet

const planetTexture = new THREE.TextureLoader().load('gas-planet.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32), 
  new THREE.MeshStandardMaterial( {
    map: planetTexture
  })
);

scene.add(planet);

// Avatar

const avatarTexture = new THREE.TextureLoader().load('mountain-pic.jpg');

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry( 5, 5, 5 ), 
  new THREE.MeshBasicMaterial( {map: avatarTexture} ) 
);

scene.add(avatar);


// Lights

// 0x means your working with a hexadecimal value!
const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xe6e6fa);
// 8A2BE2 is a dark purple color

scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


// this is a recursive function 
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.001;
    torus.rotation.z += 0.01;

    avatar.rotation.x += -0.002;
    avatar.rotation.y += -0.002;

    planet.rotation.y += 0.001;

    

    controls.update();

    renderer.render(scene, camera);
}

const spaceTexture = new THREE.TextureLoader().load('pulsar.jpg');
scene.background = spaceTexture;
avatar.position.z = 20;
avatar.position.setX(-10);


Array(200).fill().forEach(addStar)
animate();

