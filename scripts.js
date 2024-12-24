// scripts.js
const canvas = document.getElementById("carCanvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0d1117, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff4500, 1);
pointLight.position.set(2, 3, 3);
scene.add(pointLight);

// Load car model
const loader = new THREE.GLTFLoader();
loader.load('car_model.glb', (gltf) => {
    const car = gltf.scene;
    car.scale.set(1.5, 1.5, 1.5);
    scene.add(car);

    gsap.to(car.rotation, {
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: "power1.inOut",
    });
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
