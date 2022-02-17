import * as THREE from "three";

export const load_tile = url => {
    const three = new THREE.Group();
    const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 4, 4),
        new THREE.MeshStandardMaterial({color: 0xAAAA55})
    ); ground.geometry.rotateX(-Math.PI/2);
    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(.2, .2, .2, 2, 2, 2),
        new THREE.MeshStandardMaterial({color: 0x55AAAA})
    ); cube.position.set(.2, .1, .2);
    const ball = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(.25, 3),
        new THREE.MeshStandardMaterial({color: 0xAA55AA})
    ); ball.position.set(-.3, .6, -.15);
    three.add(ground);
    three.add(cube);
    three.add(ball);
    three.children.forEach(m => {
        m.frustumCulled = false
    });
    three.frustumCulled = false;
    return three;
}