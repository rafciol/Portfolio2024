import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let objToRender = 'river';

const loader = new GLTFLoader();

loader.load(
    `model/${objToRender}/scene.gltf`,
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

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

let controls;
controls= new OrbitControls(camera, renderer.domElement);

document.querySelector('body').appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(0, 5, 10);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, object ? 5 : 1);
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);

    if (object) {
        object.rotation.y += 0.00075;
    }

    camera.position.set(0, 5, 7.5);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

animate();

// saves
function createBackgroundAnimation() {
    let squaresArray = [];
    const countOfSquares = 200; //264
    const size = '100px';

    for (let i = 1; i <= countOfSquares; i++) {
        let square = document.createElement('div');
        square.style.width = size;
        square.style.height = size;

        background.appendChild(square);
        squaresArray.push(square);
    }

    function cursorEvent(e) {
        if(checkOnScroll === false) {
            const { clientX, clientY } = e;
            const rgbStartValue = 225;

            squaresArray.forEach(function (elem) {
                const rect = elem.getBoundingClientRect();
                const elemX = rect.left + rect.width / 2;
                const elemY = rect.top + rect.height / 2;

                //const distance = Math.sqrt(Math.pow(clientX - elemX, 2) + Math.pow(clientY - elemY, 2));
                const maxDistance = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));

                let distanceX = e.clientX - elemX;
                let distanceY = e.clientY - elemY;

                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                let fillPercentage = 75 - (distance / maxDistance) * 100;
                fillPercentage = Math.max(fillPercentage, 0);
                fillPercentage = Math.min(fillPercentage, 100);

                const angle = Math.atan2(distanceY, distanceX);//Math.atan2(clientY - elemY, clientX - elemX);
                const angleDegrees = angle * (180 / Math.PI);

                elem.style.backgroundImage = `linear-gradient(${angleDegrees}deg, rgba(${rgbStartValue - fillPercentage}, ${rgbStartValue - fillPercentage}, ${rgbStartValue - fillPercentage}, 0.75) ${fillPercentage}%, transparent 0%)`;
            });
        }
    }

    document.addEventListener('mousemove', cursorEvent);
}