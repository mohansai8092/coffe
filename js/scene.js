/**
 * Brew Bliss 3D - Ultra-Realistic Scene Manager & Ray-Traced Shadow Controller
 * High-res 4K shadow maps, warm 2700K tungsten lighting, and silky smooth camera dolly transitions.
 */

window.BrewScene = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  autoRotate: true,
  autoRotateSpeed: 0.7,
  isCinematicTour: false,
  tourIndex: 0,
  tourTimer: null,
  raycaster: null,
  mouse: null,

  cameraPresets: {
    hero: { pos: new THREE.Vector3(0, 4.2, 4.5), target: new THREE.Vector3(0, 3.25, 0) },
    wide: { pos: new THREE.Vector3(0, 8.5, 14.0), target: new THREE.Vector3(0, 4.5, 0) },
    bogo: { pos: new THREE.Vector3(5.5, 7.2, -5.0), target: new THREE.Vector3(8.5, 7.2, -11.5) },
    qr: { pos: new THREE.Vector3(-1.1, 3.5, 1.9), target: new THREE.Vector3(-1.9, 3.2, 0.9) },
    top: { pos: new THREE.Vector3(0, 7.6, 0.1), target: new THREE.Vector3(0, 3.3, 0) }
  },

  init: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    if (typeof THREE === 'undefined') {
      console.error('Three.js failed to load.');
      return;
    }

    // 1. Create Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0502);
    this.scene.fog = new THREE.FogExp2(0x0a0502, 0.028);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    // 3. WebGL Renderer with High-Res Ray-Traced Shadow Quality
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls with Ultra-Smooth Damping
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.025; // Silky smooth camera momentum
      this.controls.maxPolarAngle = Math.PI / 2 + 0.04;
      this.controls.minDistance = 1.8;
      this.controls.maxDistance = 22.0;
      this.controls.autoRotate = this.autoRotate;
      this.controls.autoRotateSpeed = this.autoRotateSpeed;

      this.controls.addEventListener('start', () => {
        this.controls.autoRotate = false;
        this.stopCinematicTour();
      });
    }

    // 5. Initial Camera Position
    this.setCameraPreset('hero', false);

    // 6. Warm Orange Studio Three-Point Lighting
    this.setupLighting();

    // 7. Build 3D Models
    if (window.BrewModels) {
      BrewModels.buildScene(this.scene);
    }

    // 8. Raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener('click', (e) => this.onSceneClick(e));

    // 9. Resize Listener
    window.addEventListener('resize', () => this.onWindowResize(containerId));

    // 10. Start Render Loop
    this.animate(0);
  },

  setupLighting: function() {
    // Warm Ambient Light
    const ambient = new THREE.AmbientLight(0xffdfb3, 1.05);
    this.scene.add(ambient);

    // 1. Ray-Traced Key Sunlight (2400K Warm Orange Sun)
    const keyLight = new THREE.DirectionalLight(0xff9e3b, 2.8);
    keyLight.position.set(10, 15, 8);
    keyLight.castShadow = true;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 4096; // 4K Shadow Maps for crisp ray-traced shadows
      keyLight.shadow.mapSize.height = 4096;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 35;
      keyLight.shadow.bias = -0.0001;
    }
    this.scene.add(keyLight);

    // 2. Warm Orange Ambient Fill Light
    const fillLight = new THREE.DirectionalLight(0xff6600, 0.75);
    fillLight.position.set(-8, 10, -4);
    this.scene.add(fillLight);

    // 3. Hero Cup Rim Accent Light
    const rimSpot = new THREE.SpotLight(0xffcc66, 4.2);
    rimSpot.position.set(0, 8.5, 2.5);
    rimSpot.target.position.set(0, 3.2, 0);
    rimSpot.angle = Math.PI / 5;
    rimSpot.penumbra = 0.85;
    rimSpot.castShadow = true;
    if (rimSpot.shadow) {
      rimSpot.shadow.mapSize.width = 2048;
      rimSpot.shadow.mapSize.height = 2048;
    }
    this.scene.add(rimSpot);
    this.scene.add(rimSpot.target);
  },

  setCameraPreset: function(presetName, animate = true) {
    const preset = this.cameraPresets[presetName];
    if (!preset) return;

    if (animate && window.gsap) {
      gsap.to(this.camera.position, {
        x: preset.pos.x,
        y: preset.pos.y,
        z: preset.pos.z,
        duration: 2.4,
        ease: 'power3.inOut'
      });
      if (this.controls) {
        gsap.to(this.controls.target, {
          x: preset.target.x,
          y: preset.target.y,
          z: preset.target.z,
          duration: 2.4,
          ease: 'power3.inOut'
        });
      }
    } else {
      this.camera.position.copy(preset.pos);
      if (this.controls) {
        this.controls.target.copy(preset.target);
        this.controls.update();
      }
    }
  },

  startCinematicTour: function() {
    this.isCinematicTour = true;
    const views = ['hero', 'bogo', 'qr', 'top', 'wide'];
    this.tourIndex = 0;

    const nextStep = () => {
      if (!this.isCinematicTour) return;
      const view = views[this.tourIndex];
      this.setCameraPreset(view, true);

      document.querySelectorAll('.cam-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
      });

      this.tourIndex = (this.tourIndex + 1) % views.length;
      this.tourTimer = setTimeout(nextStep, 6000);
    };

    nextStep();
  },

  stopCinematicTour: function() {
    this.isCinematicTour = false;
    if (this.tourTimer) clearTimeout(this.tourTimer);
  },

  toggleAutoRotate: function(enabled) {
    this.autoRotate = enabled !== undefined ? enabled : !this.autoRotate;
    if (this.controls) this.controls.autoRotate = this.autoRotate;
    return this.autoRotate;
  },

  onSceneClick: function(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (!this.raycaster || !this.scene) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      let curr = intersects[0].object;
      while (curr) {
        if (curr.position && curr.position.x > 5 && curr.position.y > 5 && curr.position.z < -8) {
          if (window.BrewUI) BrewUI.openModal('bogoModal');
          break;
        }
        if (curr.position && curr.position.x < -1 && curr.position.z > 0 && curr.position.z < 2) {
          if (window.BrewUI) BrewUI.openModal('qrModal');
          break;
        }
        curr = curr.parent;
      }
    }
  },

  onWindowResize: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !this.camera || !this.renderer) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },

  animate: function(time) {
    requestAnimationFrame((t) => this.animate(t));

    if (window.BrewModels) {
      BrewModels.updateAnimations(time);
    }

    if (this.controls) {
      this.controls.update();
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
};
