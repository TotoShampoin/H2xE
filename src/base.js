import * as THREE from "three";

export let width, height, pixel_ratio, aspect;

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(90, aspect, .01, 100);
export const renderer = new THREE.WebGLRenderer();
document.querySelector("main").appendChild(renderer.domElement);
console.log(renderer.domElement);

export function render() {
    renderer.render(scene, camera);
}

function updateDimensions() {
    width  = renderer.domElement.parentElement.offsetWidth;
    height = renderer.domElement.parentElement.offsetHeight;
    pixel_ratio = window.devicePixelRatio;
    aspect = width/height;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixel_ratio);
}
updateDimensions();
window.addEventListener('resize', updateDimensions);

window.THREE = THREE;
