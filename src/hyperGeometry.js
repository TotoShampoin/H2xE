import * as THREE from "three";

export const factor = 1.061;
export const size = .91575;

/**
 * 
 * @param {THREE.Mesh<THREE.BufferGeometry, THREE.Material>} mesh 
 */
export const hyperDistort = mesh => {
    const attr = mesh.geometry.attributes.position.array;
    const norm = mesh.geometry.attributes.normal.array;
    mesh.geometry.userData.euclidean_postion = [];
    mesh.geometry.userData.euclidean_normal = [];
    for(let i=0; i < attr.length; i+=3) {
        const [ex, ey, ez] = [attr[i], attr[i+1], attr[i+2]];
        const [x, y, z] = [ex, 1, ez];
        const n = Math.sqrt(y**2 - x**2 - z**2);
        mesh.geometry.userData.euclidean_postion.push({ x: ex, y: ey, z: ez });
        mesh.geometry.userData.euclidean_normal.push({ x: norm[i], y: norm[i+1], z: norm[i+2]});
        attr[i  ] =  x / n;
        attr[i+1] =  y / n;
        attr[i+2] = z / n;
    }
}

let mx = new THREE.Matrix4(),
    my = new THREE.Matrix4(),
    mr = new THREE.Matrix4();
export const hyperMatrix = (x, y, r) => {
    const cx = Math.cosh(x), sx = Math.sinh(x);
    const cy = Math.cosh(y), sy = Math.sinh(y);
    const cr = Math.cos (r), sr = Math.sin (r);
    mx.set( 
         cx, sx,  0,  0,
         sx, cx,  0,  0,
          0,  0,  1,  0,
          0,  0,  0,  1
    );
    my.set( 
          1,  0,  0,  0,
          0, cy, sy,  0,
          0, sy, cy,  0,
          0,  0,  0,  1
    );
    mr.set(
         cr,  0,-sr,  0,
          0,  1,  0,  0,
         sr,  0, cr,  0,
          0,  0,  0,  1);
    return new THREE.Matrix4().multiplyMatrices(mx, my).multiply(mr);
}

export const hyperTranslate = (path = "") => {
    const m = new THREE.Matrix4().identity();
    for(let l of path) {
        switch(l) {
            case "U": m.multiply(hyperMatrix(      0, factor, 0)); break;
            case "D": m.multiply(hyperMatrix(      0,-factor, 0)); break;
            case "L": m.multiply(hyperMatrix(-factor,      0, 0)); break;
            case "R": m.multiply(hyperMatrix( factor,      0, 0)); break;
        }
    }
    return m;
}

export const project = (tile) => {
    const attr = tile.geometry.attributes.position.array;
    const norm = tile.geometry.attributes.normal.array;
    for(let i=0; i < attr.length; i+=3) {
        const x = attr[i  ];
        const y = attr[i+1];
        const z = attr[i+2];
        const ey = tile.geometry.userData.euclidean_postion[i/3].y;
        // Equidistant
            // const r = Math.hypot(z, x);
            // attr[i  ] = r ? x*Math.asinh(r)/r : x;
            // attr[i+2] = r ? z*Math.asinh(r)/r : z;
            // attr[i+1] = ey;
        // Beltrami-Klein
            attr[i  ] = x/y;
            attr[i+2] = z/y;
            attr[i+1] = ey/y;
        // Poincare
            // attr[i  ] = 2* x/(y+1);
            // attr[i+2] = 2* z/(y+1);
            // attr[i+1] = 2* ey/(y+1);
        norm[i  ] = tile.geometry.userData.euclidean_normal[i/3].x;
        norm[i+1] = tile.geometry.userData.euclidean_normal[i/3].y;
        norm[i+2] = tile.geometry.userData.euclidean_normal[i/3].z;
    }
}