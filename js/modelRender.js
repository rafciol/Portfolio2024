import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let objToRender = 'astronaut';

const loader = new GLTFLoader();
loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('background').appendChild(renderer.domElement);

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

function animate() {
    requestAnimationFrame(animate);

    if (object && objToRender === "astronaut") {
        object.lookAt(camera.position);
        object.rotation.y = -90;
        object.rotation.x = 0;
        camera.position.z = 500;
    }
    renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//Start the 3D rendering
animate();