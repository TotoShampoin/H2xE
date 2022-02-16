import * as THREE from "three";
import { factor, hyperDistort, hyperMatrix, hyperTranslate, project, size } from "./hyperGeometry.js";
import { load_tile } from "./tile_loader.js";

export class Tile {
    /** @type {THREE.Group} */ three;
    /** @type {string} */ path;
    /** @param {string} path */
    constructor(path) {
        this.three = load_tile();
        this.three.rotateY(Math.PI).rotateZ(Math.PI);
        this.path = path;
        this.centerize();
        this.hyperize();
    }
    centerize() {
        /** @type {THREE.Mesh<THREE.BufferGeometry, THREE.Material} */
        let m;
        for(m of this.three.children) {
            const vert = m.geometry.attributes.position.array;
            const pos  = m.position.toArray();
            for(let i in vert) {
                vert[i] += pos[i%3];
            }
            m.position.set(0, 0, 0);
            m.geometry.scale(size*factor, size*factor, size*factor);
        }
    }
    hyperize() {
        /** @type {THREE.Mesh<THREE.BufferGeometry, THREE.Material} */
        let m;
        for(m of this.three.children) {
            hyperDistort(m);
            m.geometry.applyMatrix4(hyperTranslate(this.path));
            m.geometry.userData.initial = m.geometry.attributes.position.clone();
        }
    }
    reset() {
        /** @type {THREE.Mesh<THREE.BufferGeometry, THREE.Material} */
        let m;
        for(m of this.three.children) {
            const attr = m.geometry.attributes.position.array;
            for(let i=0; i < attr.length; i++) {
                m.geometry.attributes.position.array[i] = m.geometry.userData.initial.array[i];
            }
        }
    }
    project() {
        /** @type {THREE.Mesh<THREE.BufferGeometry, THREE.Material} */
        let m;
        for(m of this.three.children) {
            project(m);
            const attr = m.geometry.attributes.position.array;
            for(let i=1; i < attr.length; i+=3) {
                // attr[i] = -m.geometry.userData.euclidean[(i-1)/3].y;
            }
        }
    }
    /**
     * 
     * @param {THREE.Matrix4} matrix 
     */
    applyMatrix4(matrix) {
        /** @type {THREE.Mesh<THREE.BufferGeometry, THREE.Material} */
        let m;
        for(m of this.three.children) {
            m.geometry.applyMatrix4(matrix);
        }
    }
}
