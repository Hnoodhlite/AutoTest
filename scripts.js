// scripts.js
const canvas = document.getElementById("carCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

camera.position.z = 5;

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Load Car Model
const loader = new THREE.GLTFLoader();
loader.load('car_model.glb', (gltf) => {
    const car = gltf.scene;
    car.scale.set(1, 1, 1);
    scene.add(car);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        car.rotation.y += 0.01; // Rotate the car
        renderer.render(scene, camera);
    }
    animate();
});

// Responsive Canvas
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});