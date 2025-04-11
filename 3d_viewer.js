        
function construct_3D(path) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, .25, 100);
    const renderer = new THREE.WebGLRenderer({alpha : true});
    renderer.setSize(window.innerWidth - 30, window.innerHeight - 30);
    document.body.appendChild(renderer.domElement);
    // Add OrbitControls for navigation
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother control
    // Load GLTF model
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);
    
    const loader = new THREE.GLTFLoader();
    loader.load(
        path,
        (gltf) => {
            const object = gltf.scene;
            scene.add(object);
    
            // Rotate the object around its X-axis
            function animate() {
                requestAnimationFrame(animate);
                object.rotation.y += 0.05; // Speed of rotation
                renderer.render(scene, camera);
            }
            
            animate();
        },
        undefined,
        (error) => {
            console.error('An error happened while loading the 3D object.', error);
        }
    );
    camera.position.z = 5;
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        // object.rotation.x += 0.01; // Speed of rotation
        renderer.render(scene, camera);
    }

    animate();
    }