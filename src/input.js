export const speed = {
    x: 0, y: 0, z: 0
};

const SPEED = 1/256;

window.addEventListener('keydown', ev => {
    if(ev.code == 'ArrowLeft') speed.x = SPEED;
    if(ev.code == 'ArrowRight') speed.x = -SPEED;
    if(ev.code == 'ArrowUp') speed.y = SPEED;
    if(ev.code == 'ArrowDown') speed.y = -SPEED;
    if(ev.code == 'ControlRight') speed.z = SPEED*2;
    if(ev.code == 'Numpad0') speed.z = -SPEED*2;
});
window.addEventListener('keyup', ev => {
    if(ev.code == 'ArrowLeft' || ev.code == 'ArrowRight') speed.x = 0;
    if(ev.code == 'ArrowUp' || ev.code == 'ArrowDown') speed.y = 0;
    if(ev.code == 'ControlRight' || ev.code == 'Numpad0') speed.z = 0;
});

let gpid = 0;

export const get_gp = () => {
    if(!navigator.getGamepads()[gpid]) return;
    if(Math.abs(navigator.getGamepads()[gpid].axes[0]) > .25)
        speed.x = navigator.getGamepads()[gpid].axes[0] * -SPEED;
    else speed.x = 0;
    if(Math.abs(navigator.getGamepads()[gpid].axes[1]) > .25)
        speed.y = navigator.getGamepads()[gpid].axes[1] * SPEED;
    else speed.y = 0;
    if(Math.abs(navigator.getGamepads()[gpid].axes[2]) > .25)
        speed.z = navigator.getGamepads()[gpid].axes[2] * SPEED *2;
    else speed.z = 0;
}
