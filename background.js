import * as THREE from 'three';

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.5, 200);

const renderer = new THREE.WebGLRenderer({canvas : canvas});
renderer.setSize(window.innerWidth, window.innerHeight);


const geometry_MainObject = new THREE.OctahedronGeometry(0.8,0);
const material_MainObject = new THREE.MeshStandardMaterial( { color: 0xffbb00 } );
const material_MainObject_outline = new THREE.MeshStandardMaterial({color : 0x000000, wireframe:true});
const MainObject = new THREE.Mesh(geometry_MainObject, material_MainObject);
const MainObject_Outline = new THREE.Mesh(geometry_MainObject, material_MainObject_outline);
MainObject.add(MainObject_Outline);
scene.add(MainObject);


const material_torus = new THREE.MeshPhongMaterial({color: 0xff6600})
const geometry_torus1 = new THREE.TorusGeometry(1, 0.125, 12, 50)
const geometry_torus2 = new THREE.TorusGeometry(1.5, 0.125,12,50);
const torus1 = new THREE.Mesh(geometry_torus1, material_torus);
const torus2 = new THREE.Mesh(geometry_torus2, material_torus);
scene.add(torus1);
scene.add(torus2);


const backgroundTexture = new THREE.TextureLoader().load('background.jpg');
scene.background = backgroundTexture;


const clock = new THREE.Clock();

const starList=new Array();


const geometry_star = new THREE.SphereGeometry(0.5, 8, 8);
const material_star = new THREE.MeshPhongMaterial({color: 0xed6a18});
function addStar () {
    const star = new THREE.Mesh(geometry_star, material_star);
    star.name="Star";
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
    return star;
}

function moveCamera() {
    const reducer = 0.01;
    const current_heigth = document.body.getBoundingClientRect().top;
    const x = Math.sin(current_heigth*reducer)*3;
    const z = Math.cos(current_heigth*reducer)*3;

    camera.position.set(x, 2, z);

    camera.lookAt(0, 0, 0);
}

function moveObjects() {
    const time = clock.getElapsedTime() ;
    torus1.rotation.x=time/1.2;
    torus1.rotation.y=time/1.2;

    torus2.rotation.x=time;
    torus2.rotation.z=time;

}

function animate() {
	renderer.render( scene, camera );
    MainObject.rotation.x += 0.01;//to move outside
    MainObject.rotation.y += 0.01;
    moveObjects();
    requestAnimationFrame( animate );
}

function resizeRendererToDisplaySize(renderer) {
    const width  = window.innerWidth;
    const height = window.innerHeight;
    const needResize = renderer.domElement.width !== width || renderer.domElement.height !== height;
    if (needResize) {
      renderer.setSize(width, height, true);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    return needResize;
}

function init() {
    for (let index = 0; index < 200; index++) {
        starList.push(addStar());
    }

    const light = new THREE.AmbientLight(0xffffff);
    light.position.set(0, 3, 0);
    scene.add(light);

    moveCamera(); //also serves to initialize the camera

    window.addEventListener("scroll", moveCamera); //also handles scroll caused by js

}

window.addEventListener("resize", ()=>{
    resizeRendererToDisplaySize(renderer);
});

animate();

init();