import * as THREE from "three";
import { scene, camera, renderer, render } from "./base.js";
import { hyperMatrix } from "./hyperGeometry.js";
import { speed } from "./input.js";
import { Tile } from "./tile.js";

const al = new THREE.AmbientLight(0xFFFFFF);
scene.add(al);
// const dl = new THREE.DirectionalLight(0xFFFFFF, 1);
// dl.position.set(2, 1, 3);
// dl.lookAt(0, 0, 0);

const tiles = [
    new Tile(""),
    new Tile("U"), new Tile("D"), new Tile("L"), new Tile("R"), 
    new Tile("UL"), new Tile("UU"), new Tile("UR"), 
    new Tile("LU"), new Tile("LL"), new Tile("LD"), 
    new Tile("DL"), new Tile("DD"), new Tile("DR"), 
    new Tile("RU"), new Tile("RR"), new Tile("RD"), 
    new Tile("ULU"), new Tile("ULL"), 
    new Tile("UUU"), new Tile("UUL"), new Tile("UUR"), 
    new Tile("URU"), new Tile("URR"), 
    new Tile("LUL"), new Tile("LUU"), 
    new Tile("LLL"), new Tile("LLU"), new Tile("LLD"), 
    new Tile("LDL"), new Tile("LDD"), 
    new Tile("DLD"), new Tile("DLL"), 
    new Tile("DDD"), new Tile("DDL"), new Tile("DDR"), 
    new Tile("DRD"), new Tile("DRR"), 
    new Tile("RUR"), new Tile("RUU"), 
    new Tile("RRR"), new Tile("RRU"), new Tile("RRD"), 
    new Tile("RDR"), new Tile("RDD"), 
];
tiles.forEach(tile => scene.add(tile.three));

window.scene = scene

const hyperCam = new THREE.Matrix4().identity();
renderer.setAnimationLoop((timer, xr) => {
    const HM = hyperMatrix(speed.x, speed.y, speed.z);
    hyperCam.multiplyMatrices(HM, hyperCam);
    camera.position.set(0, .25, 0);
    camera.lookAt(0, 0, -1);
    tiles.forEach(tile => {
        tile.reset();
        tile.applyMatrix4(hyperCam);
        tile.project();
    });
    render();
});
