/**
 * Brew Bliss 3D - Ultra-Realistic Scene Geometry & Object Builders
 * Ray-traced shadow quality, golden bokeh dust motes, contact shadow planes, and luxury advertising atmosphere.
 */

window.BrewModels = {
  animatedObjects: {
    floatingBeans: [],
    steamParticles: [],
    bokehParticles: [],
    digitalDisplay: null,
    hangingLights: [],
    heroCupGroup: null,
    bogoLight: null
  },

  buildScene: function(scene) {
    const group = new THREE.Group();
    scene.add(group);

    const envMap = BrewMaterials.createEnvMapTexture();
    scene.environment = envMap;

    // 1. Interior Architecture
    this.buildInterior(group, envMap);

    // 2. Bar Counter & Tables
    this.buildFurniture(group, envMap);

    // 3. Hero Coffee Cup & Saucer
    this.buildHeroCoffeeCup(group, envMap);

    // 4. 85+ Floating Coffee Beans
    this.buildFloatingCoffeeBeans(group, envMap);

    // 5. 130+ Steam Particle System
    this.buildSteamParticles(group);

    // 6. 150+ Golden Bokeh Dust Motes (Warm Sunlight Atmosphere)
    this.buildBokehParticles(group);

    // 7. Modern Hanging Lights
    this.buildHangingLights(group);

    // 8. Customers with Laptops
    this.buildCustomersWithLaptops(group);

    // 9. Plants & Decor
    this.buildPlantsAndDecor(group, envMap);

    // 10. Glowing BOGO Billboard Display
    this.buildDigitalPromoDisplay(group);

    // 11. QR Code Stand
    this.buildQRCodeStand(group, envMap);

    // 12. Social & Delivery Badges
    this.buildSocialAndDeliveryBadges(group);

    // 13. Backlit Wall Logo
    this.buildWallBrandLogo(group);

    return group;
  },

  buildInterior: function(parent, envMap) {
    const roomGroup = new THREE.Group();

    // 4K Parquet Floor
    const floorGeo = new THREE.PlaneGeometry(28, 28);
    const floorTex = BrewMaterials.createWoodTexture(2048, 2048, true);
    floorTex.repeat.set(5, 5);
    const floorBump = BrewMaterials.createWoodBumpMap(1024, 1024);
    floorBump.repeat.set(5, 5);

    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      bumpMap: floorBump,
      bumpScale: 0.08,
      roughness: 0.25,
      metalness: 0.15,
      envMap: envMap,
      envMapIntensity: 0.45
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Back Wall - Slat Feature Wall
    const wallGeo = new THREE.PlaneGeometry(28, 14);
    const wallTex = BrewMaterials.createWallSlatTexture();
    wallTex.repeat.set(7, 1);
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.5,
      metalness: 0.1
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 7, -12);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Side Walls
    const sideWallGeo = new THREE.PlaneGeometry(28, 14);
    const sideWallMat = new THREE.MeshStandardMaterial({ color: 0x1a0e08, roughness: 0.7 });
    const leftWall = new THREE.Mesh(sideWallGeo, sideWallMat);
    leftWall.position.set(-14, 7, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeo, sideWallMat);
    rightWall.position.set(14, 7, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    roomGroup.add(rightWall);

    // Ceiling & Timber Beams
    const ceilingGeo = new THREE.PlaneGeometry(28, 28);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x100a06, roughness: 0.9 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = 14;
    ceiling.rotation.x = Math.PI / 2;
    roomGroup.add(ceiling);

    const beamGeo = new THREE.BoxGeometry(28, 0.5, 0.5);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x2d180d, roughness: 0.4 });
    for (let z = -10; z <= 10; z += 5) {
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, 13.75, z);
      roomGroup.add(beam);
    }

    parent.add(roomGroup);
  },

  buildFurniture: function(parent, envMap) {
    const furnitureGroup = new THREE.Group();

    // Espresso Bar Counter
    const counterGeo = new THREE.BoxGeometry(16, 3.4, 2.8);
    const woodTex = BrewMaterials.createWoodTexture(1024, 1024, true);
    const counterMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.3,
      metalness: 0.1,
      envMap: envMap,
      envMapIntensity: 0.35
    });
    const counter = new THREE.Mesh(counterGeo, counterMat);
    counter.position.set(0, 1.7, -9);
    counter.castShadow = true;
    counter.receiveShadow = true;
    furnitureGroup.add(counter);

    // Calacatta Gold Marble Countertop
    const marbleGeo = new THREE.BoxGeometry(16.4, 0.3, 3.1);
    const marbleTex = BrewMaterials.createMarbleTexture();
    const marbleMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.1,
      metalness: 0.25,
      envMap: envMap,
      envMapIntensity: 0.85
    });
    const marbleTop = new THREE.Mesh(marbleGeo, marbleMat);
    marbleTop.position.set(0, 3.55, -9);
    marbleTop.castShadow = true;
    furnitureGroup.add(marbleTop);

    // Hero Pedestal Base
    const tableBaseGeo = new THREE.CylinderGeometry(1.8, 2.4, 0.18, 48);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.94,
      roughness: 0.15,
      envMap: envMap,
      envMapIntensity: 1.1
    });
    const tableBase = new THREE.Mesh(tableBaseGeo, brassMat);
    tableBase.position.set(0, 0.09, 0);
    tableBase.castShadow = true;
    furnitureGroup.add(tableBase);

    const pillarGeo = new THREE.CylinderGeometry(0.25, 0.4, 2.7, 48);
    const pillar = new THREE.Mesh(pillarGeo, brassMat);
    pillar.position.set(0, 1.5, 0);
    pillar.castShadow = true;
    furnitureGroup.add(pillar);

    // Hero Marble Table Surface
    const topGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.22, 64);
    const topMesh = new THREE.Mesh(topGeo, marbleMat);
    topMesh.position.set(0, 2.95, 0);
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    furnitureGroup.add(topMesh);

    // Contact Shadow Plane under Hero Table
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowTex = BrewMaterials.createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.01;
    furnitureGroup.add(contactShadow);

    // Gold Rim Accent
    const rimGeo = new THREE.TorusGeometry(3.52, 0.05, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, brassMat);
    rimMesh.position.set(0, 2.95, 0);
    rimMesh.rotation.x = Math.PI / 2;
    furnitureGroup.add(rimMesh);

    parent.add(furnitureGroup);
  },

  buildHeroCoffeeCup: function(parent, envMap) {
    const cupGroup = new THREE.Group();
    cupGroup.position.set(0, 3.06, 0);

    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.06,
      metalness: 0.12,
      envMap: envMap,
      envMapIntensity: 0.95
    });

    // Saucer
    const saucerShape = new THREE.CylinderGeometry(1.7, 0.95, 0.14, 64);
    const saucer = new THREE.Mesh(saucerShape, ceramicMat);
    saucer.position.y = 0.07;
    saucer.castShadow = true;
    cupGroup.add(saucer);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.12,
      envMap: envMap,
      envMapIntensity: 1.1
    });
    const saucerTrimGeo = new THREE.TorusGeometry(1.7, 0.025, 16, 64);
    const saucerTrim = new THREE.Mesh(saucerTrimGeo, brassMat);
    saucerTrim.position.y = 0.14;
    saucerTrim.rotation.x = Math.PI / 2;
    cupGroup.add(saucerTrim);

    // Cup Body
    const cupOuterGeo = new THREE.CylinderGeometry(1.15, 0.8, 1.5, 64, 1, true);
    const cupOuter = new THREE.Mesh(cupOuterGeo, ceramicMat);
    cupOuter.position.y = 0.88;
    cupOuter.castShadow = true;
    cupGroup.add(cupOuter);

    const cupBottomGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.06, 32);
    const cupBottom = new THREE.Mesh(cupBottomGeo, ceramicMat);
    cupBottom.position.y = 0.16;
    cupGroup.add(cupBottom);

    const cupInnerGeo = new THREE.CylinderGeometry(1.08, 0.75, 1.45, 64);
    const cupInner = new THREE.Mesh(cupInnerGeo, ceramicMat);
    cupInner.position.y = 0.9;
    cupGroup.add(cupInner);

    // Handle
    const handleGeo = new THREE.TorusGeometry(0.45, 0.11, 16, 32, Math.PI * 1.25);
    const handle = new THREE.Mesh(handleGeo, ceramicMat);
    handle.position.set(1.22, 0.88, 0);
    handle.rotation.z = -Math.PI / 4;
    handle.castShadow = true;
    cupGroup.add(handle);

    // Embossed Gold Badge
    const badgeGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.02, 32);
    const badge = new THREE.Mesh(badgeGeo, brassMat);
    badge.position.set(0, 0.9, 1.12);
    badge.rotation.x = Math.PI / 2;
    cupGroup.add(badge);

    // Creamy Latte Art Liquid
    const liquidGeo = new THREE.CircleGeometry(1.06, 64);
    const latteTex = BrewMaterials.createLatteArtTexture();
    const liquidMat = new THREE.MeshStandardMaterial({
      map: latteTex,
      roughness: 0.28,
      metalness: 0.05
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.rotation.x = -Math.PI / 2;
    liquid.position.y = 1.44;
    cupGroup.add(liquid);

    this.animatedObjects.heroCupGroup = cupGroup;
    parent.add(cupGroup);
  },

  buildFloatingCoffeeBeans: function(parent, envMap) {
    const beanGroup = new THREE.Group();
    beanGroup.position.set(0, 4.0, 0);

    const beanGeo = new THREE.SphereGeometry(0.14, 16, 16);
    beanGeo.scale(1.45, 0.92, 0.75);

    const beanMatMedium = new THREE.MeshStandardMaterial({
      color: 0x5a341a,
      roughness: 0.2,
      metalness: 0.25,
      envMap: envMap,
      envMapIntensity: 0.6
    });

    const beanMatDark = new THREE.MeshStandardMaterial({
      color: 0x2e180b,
      roughness: 0.18,
      metalness: 0.3,
      envMap: envMap,
      envMapIntensity: 0.7
    });

    const beanCount = 85;
    for (let i = 0; i < beanCount; i++) {
      const mat = i % 2 === 0 ? beanMatMedium : beanMatDark;
      const beanMesh = new THREE.Mesh(beanGeo, mat);

      const isInner = i % 2 === 0;
      const radius = isInner ? (1.5 + Math.random() * 1.2) : (2.7 + Math.random() * 1.8);
      const angle = (i / beanCount) * Math.PI * 4 + Math.random() * 0.4;
      const yOffset = (Math.random() - 0.5) * 2.8;

      beanMesh.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );

      beanMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      beanMesh.userData = {
        baseRadius: radius,
        angle: angle,
        speed: (isInner ? 0.005 : -0.003) + (Math.random() - 0.5) * 0.002,
        bobSpeed: 0.002 + Math.random() * 0.005,
        bobHeight: 0.25 + Math.random() * 0.35,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        initialY: yOffset
      };

      beanGroup.add(beanMesh);
      this.animatedObjects.floatingBeans.push(beanMesh);
    }

    parent.add(beanGroup);
  },

  buildSteamParticles: function(parent) {
    const steamGroup = new THREE.Group();
    steamGroup.position.set(0, 4.5, 0);

    const steamTex = BrewMaterials.createSteamTexture();

    const steamParticleCount = 130;
    for (let i = 0; i < steamParticleCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: steamTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const sprite = new THREE.Sprite(mat);
      const scale = 0.35 + Math.random() * 0.55;
      sprite.scale.set(scale, scale, 1);

      sprite.position.set(
        (Math.random() - 0.5) * 0.9,
        Math.random() * 2.5,
        (Math.random() - 0.5) * 0.9
      );

      sprite.userData = {
        speedY: 0.009 + Math.random() * 0.015,
        driftX: (Math.random() - 0.5) * 0.006,
        driftZ: (Math.random() - 0.5) * 0.006,
        maxHeight: 2.8 + Math.random() * 1.2,
        initialScale: scale
      };

      steamGroup.add(sprite);
      this.animatedObjects.steamParticles.push(sprite);
    }

    parent.add(steamGroup);
  },

  // 150+ Golden Bokeh Dust Motes Floating in Warm Orange Light Shafts
  buildBokehParticles: function(parent) {
    const bokehGroup = new THREE.Group();
    bokehGroup.position.set(0, 5.0, 0);

    const bokehTex = BrewMaterials.createBokehTexture();
    const bokehCount = 160;

    for (let i = 0; i < bokehCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: bokehTex,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const sprite = new THREE.Sprite(mat);
      const scale = 0.08 + Math.random() * 0.25;
      sprite.scale.set(scale, scale, 1);

      sprite.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 10
      );

      sprite.userData = {
        speedY: 0.002 + Math.random() * 0.005,
        driftX: (Math.random() - 0.5) * 0.003,
        driftZ: (Math.random() - 0.5) * 0.003,
        initialY: sprite.position.y
      };

      bokehGroup.add(sprite);
      this.animatedObjects.bokehParticles.push(sprite);
    }

    parent.add(bokehGroup);
  },

  buildHangingLights: function(parent) {
    const lightsGroup = new THREE.Group();

    const lightPositions = [
      { x: 0, z: 0, color: 0xffa033, intensity: 3.2 },
      { x: -6, z: -4.5, color: 0xff9900, intensity: 2.5 },
      { x: 6, z: -4.5, color: 0xff9900, intensity: 2.5 }
    ];

    lightPositions.forEach((pos) => {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(pos.x, 14, pos.z);

      const cordGeo = new THREE.CylinderGeometry(0.02, 0.02, 4.5);
      const cordMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
      const cord = new THREE.Mesh(cordGeo, cordMat);
      cord.position.y = -2.25;
      lampGroup.add(cord);

      const shadeGeo = new THREE.ConeGeometry(0.9, 0.7, 32, 1, true);
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.94,
        roughness: 0.18,
        side: THREE.DoubleSide
      });
      const shade = new THREE.Mesh(shadeGeo, brassMat);
      shade.position.y = -4.5;
      shade.rotation.x = Math.PI;
      lampGroup.add(shade);

      const bulbGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe0a3 });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.y = -4.65;
      lampGroup.add(bulb);

      const pointLight = new THREE.PointLight(pos.color, pos.intensity, 15);
      pointLight.position.y = -4.7;
      pointLight.castShadow = true;
      if (pointLight.shadow) {
        pointLight.shadow.bias = -0.0015;
      }
      lampGroup.add(pointLight);

      lightsGroup.add(lampGroup);
      this.animatedObjects.hangingLights.push(pointLight);
    });

    parent.add(lightsGroup);
  },

  buildCustomersWithLaptops: function(parent) {
    const customerGroup = new THREE.Group();

    const customerSpots = [
      { x: -6.5, z: -6.5, angle: 0.35 },
      { x: 6.5, z: -6.5, angle: -0.35 }
    ];

    customerSpots.forEach((spot) => {
      const spotGroup = new THREE.Group();
      spotGroup.position.set(spot.x, 0, spot.z);
      spotGroup.rotation.y = spot.angle;

      const tableTopGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
      const woodTex = BrewMaterials.createWoodTexture(512, 512, false);
      const tableMat = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.35 });
      const table = new THREE.Mesh(tableTopGeo, tableMat);
      table.position.set(0, 2.5, 0);
      table.castShadow = true;
      spotGroup.add(table);

      const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(0, 1.25, 0);
      spotGroup.add(leg);

      const figureGroup = new THREE.Group();

      const torsoGeo = new THREE.CylinderGeometry(0.42, 0.48, 1.5, 16);
      const shirtMat = new THREE.MeshStandardMaterial({ color: spot.x < 0 ? 0x2b3a4a : 0x5a3e2b });
      const torso = new THREE.Mesh(torsoGeo, shirtMat);
      torso.position.set(0, 2.35, 1.2);
      figureGroup.add(torso);

      const headGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xdcb896, roughness: 0.6 });
      const head = new THREE.Mesh(headGeo, skinMat);
      head.position.set(0, 3.25, 1.15);
      head.rotation.x = 0.2;
      figureGroup.add(head);

      spotGroup.add(figureGroup);

      const laptopGroup = new THREE.Group();
      laptopGroup.position.set(0, 2.56, 0.2);

      const lapBaseGeo = new THREE.BoxGeometry(0.95, 0.03, 0.65);
      const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.85, roughness: 0.2 });
      const lapBase = new THREE.Mesh(lapBaseGeo, metalMat);
      laptopGroup.add(lapBase);

      const lapScreenGeo = new THREE.BoxGeometry(0.95, 0.62, 0.02);
      const lapScreen = new THREE.Mesh(lapScreenGeo, metalMat);
      lapScreen.position.set(0, 0.32, -0.32);
      lapScreen.rotation.x = -0.3;
      laptopGroup.add(lapScreen);

      const displayMat = new THREE.MeshBasicMaterial({ color: 0x99ddff });
      const screenDisplayGeo = new THREE.PlaneGeometry(0.88, 0.56);
      const screenDisplay = new THREE.Mesh(screenDisplayGeo, displayMat);
      screenDisplay.position.set(0, 0.32, -0.305);
      screenDisplay.rotation.x = -0.3;
      laptopGroup.add(screenDisplay);

      const screenLight = new THREE.PointLight(0x99ddff, 1.2, 3);
      screenLight.position.set(0, 0.4, -0.1);
      laptopGroup.add(screenLight);

      spotGroup.add(laptopGroup);
      customerGroup.add(spotGroup);
    });

    parent.add(customerGroup);
  },

  buildPlantsAndDecor: function(parent, envMap) {
    const decorGroup = new THREE.Group();

    const plantGroup = new THREE.Group();
    plantGroup.position.set(-8.5, 0, 4);

    const potGeo = new THREE.CylinderGeometry(1.0, 0.7, 2.0, 32);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.2, envMap: envMap });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.y = 1.0;
    pot.castShadow = true;
    plantGroup.add(pot);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x235e33, roughness: 0.35, side: THREE.DoubleSide });

    for (let i = 0; i < 12; i++) {
      const stemGeo = new THREE.CylinderGeometry(0.03, 0.05, 2.2);
      const stem = new THREE.Mesh(stemGeo, leafMat);
      const leafAngle = (i / 12) * Math.PI * 2;
      const tilt = 0.45 + Math.random() * 0.3;

      stem.position.set(Math.cos(leafAngle) * 0.25, 1.8, Math.sin(leafAngle) * 0.25);
      stem.rotation.z = Math.cos(leafAngle) * tilt;
      stem.rotation.x = Math.sin(leafAngle) * tilt;

      const leafGeo = new THREE.CircleGeometry(0.6, 16);
      leafGeo.scale(1, 1.45, 1);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.y = 1.1;
      leaf.rotation.x = Math.PI / 3;
      stem.add(leaf);

      plantGroup.add(stem);
    }
    decorGroup.add(plantGroup);

    const shelfGeo = new THREE.BoxGeometry(7, 0.14, 0.9);
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.4 });
    const shelf1 = new THREE.Mesh(shelfGeo, shelfMat);
    shelf1.position.set(-4.5, 8, -11.5);
    decorGroup.add(shelf1);

    for (let b = -2.5; b <= 2.5; b += 2.0) {
      const bagGeo = new THREE.BoxGeometry(0.5, 0.8, 0.35);
      const bagMat = new THREE.MeshStandardMaterial({ color: b === 0 ? 0xd4af37 : 0x1f130a });
      const bag = new THREE.Mesh(bagGeo, bagMat);
      bag.position.set(-4.5 + b, 8.47, -11.5);
      bag.castShadow = true;
      decorGroup.add(bag);
    }

    parent.add(decorGroup);
  },

  buildDigitalPromoDisplay: function(parent) {
    const promoGroup = new THREE.Group();
    promoGroup.position.set(8.5, 7.2, -11.5);

    const frameGeo = new THREE.BoxGeometry(6.2, 3.7, 0.25);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.92, roughness: 0.15 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    promoGroup.add(frame);

    const screenGeo = new THREE.PlaneGeometry(6.0, 3.5);
    const { texture, canvas, ctx } = BrewMaterials.createDigitalDisplayCanvas(0);
    const screenMat = new THREE.MeshBasicMaterial({ map: texture });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.14;
    promoGroup.add(screen);

    const bogoLight = new THREE.PointLight(0xff5500, 4.0, 12);
    bogoLight.position.set(0, 0, 0.8);
    bogoLight.castShadow = true;
    promoGroup.add(bogoLight);

    this.animatedObjects.bogoLight = bogoLight;
    this.animatedObjects.digitalDisplay = { texture: texture, canvas: canvas, ctx: ctx };

    parent.add(promoGroup);
  },

  buildQRCodeStand: function(parent, envMap) {
    const qrGroup = new THREE.Group();
    qrGroup.position.set(-1.9, 3.06, 0.9);
    qrGroup.rotation.y = 0.45;

    const baseGeo = new THREE.BoxGeometry(0.85, 0.09, 0.45);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.3 });
    const base = new THREE.Mesh(baseGeo, woodMat);
    base.position.y = 0.045;
    qrGroup.add(base);

    const panelGeo = new THREE.BoxGeometry(0.75, 0.95, 0.035);
    const qrTex = BrewMaterials.createQRCodeCanvas();
    const qrMat = new THREE.MeshStandardMaterial({
      map: qrTex,
      roughness: 0.08,
      metalness: 0.1,
      envMap: envMap,
      envMapIntensity: 0.7
    });
    const panel = new THREE.Mesh(panelGeo, qrMat);
    panel.position.set(0, 0.52, 0);
    panel.castShadow = true;
    qrGroup.add(panel);

    parent.add(qrGroup);
  },

  buildSocialAndDeliveryBadges: function(parent) {
    const badgeGroup = new THREE.Group();

    const platforms = ['instagram', 'facebook', 'youtube'];
    platforms.forEach((platform, idx) => {
      const socialTex = BrewMaterials.createSocialIconCanvas(platform);
      const iconGeo = new THREE.CircleGeometry(0.45, 32);
      const iconMat = new THREE.MeshBasicMaterial({ map: socialTex, side: THREE.DoubleSide });
      const iconMesh = new THREE.Mesh(iconGeo, iconMat);

      iconMesh.position.set(-11.5, 5.2 - idx * 1.25, -4);
      iconMesh.rotation.y = Math.PI / 2;
      badgeGroup.add(iconMesh);
    });

    const deliveryTex = BrewMaterials.createDeliveryIconCanvas(true);
    const deliveryGeo = new THREE.PlaneGeometry(2.6, 1.3);
    const deliveryMat = new THREE.MeshBasicMaterial({ map: deliveryTex });
    const deliveryBadge = new THREE.Mesh(deliveryGeo, deliveryMat);
    deliveryBadge.position.set(-6, 5.2, -8.9);
    badgeGroup.add(deliveryBadge);

    const takeawayTex = BrewMaterials.createDeliveryIconCanvas(false);
    const takeawayMat = new THREE.MeshBasicMaterial({ map: takeawayTex });
    const takeawayBadge = new THREE.Mesh(deliveryGeo, takeawayMat);
    takeawayBadge.position.set(6, 5.2, -8.9);
    badgeGroup.add(takeawayBadge);

    parent.add(badgeGroup);
  },

  buildWallBrandLogo: function(parent) {
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 10.5, -11.8);

    const logoTex = BrewMaterials.createWallLogoCanvas();
    const logoGeo = new THREE.PlaneGeometry(8, 4);
    const logoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true });

    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoGroup.add(logoMesh);

    const haloLight = new THREE.PointLight(0xff9900, 3.8, 12);
    haloLight.position.set(0, 0, -0.2);
    logoGroup.add(haloLight);

    parent.add(logoGroup);
  },

  updateAnimations: function(time) {
    // 1. Floating Beans Spiral
    this.animatedObjects.floatingBeans.forEach((bean) => {
      const data = bean.userData;
      data.angle += data.speed;
      bean.position.x = Math.cos(data.angle) * data.baseRadius;
      bean.position.z = Math.sin(data.angle) * data.baseRadius;
      bean.position.y = data.initialY + Math.sin(time * data.bobSpeed) * data.bobHeight;

      bean.rotation.x += data.rotSpeedX;
      bean.rotation.y += data.rotSpeedY;
    });

    // 2. Rising Steam
    this.animatedObjects.steamParticles.forEach((particle) => {
      const data = particle.userData;
      particle.position.y += data.speedY;
      particle.position.x += Math.sin(time * 0.003 + particle.position.y) * data.driftX;
      particle.position.z += Math.cos(time * 0.003 + particle.position.y) * data.driftZ;

      const progress = particle.position.y / data.maxHeight;
      if (progress < 0.2) {
        particle.material.opacity = (progress / 0.2) * 0.55;
      } else {
        particle.material.opacity = (1 - progress) * 0.55;
      }

      const currentScale = data.initialScale * (1 + progress * 1.8);
      particle.scale.set(currentScale, currentScale, 1);

      if (particle.position.y >= data.maxHeight) {
        particle.position.y = 0;
        particle.position.x = (Math.random() - 0.5) * 0.9;
        particle.position.z = (Math.random() - 0.5) * 0.9;
      }
    });

    // 3. Golden Bokeh Dust Motes Floating
    this.animatedObjects.bokehParticles.forEach((bokeh) => {
      const data = bokeh.userData;
      bokeh.position.y += data.speedY;
      bokeh.position.x += Math.sin(time * 0.001 + bokeh.position.y) * data.driftX;
      bokeh.position.z += Math.cos(time * 0.001 + bokeh.position.y) * data.driftZ;

      if (bokeh.position.y > 8.0) {
        bokeh.position.y = 1.0;
        bokeh.position.x = (Math.random() - 0.5) * 10;
        bokeh.position.z = (Math.random() - 0.5) * 10;
      }
    });

    // 4. Pulse BOGO Backlight
    if (this.animatedObjects.bogoLight) {
      this.animatedObjects.bogoLight.intensity = 4.0 + Math.sin(time * 0.005) * 1.5;
    }

    // 5. Update Billboard Display Canvas
    if (this.animatedObjects.digitalDisplay) {
      const { texture } = BrewMaterials.createDigitalDisplayCanvas(time);
      this.animatedObjects.digitalDisplay.texture.image = texture.image;
      this.animatedObjects.digitalDisplay.texture.needsUpdate = true;
    }
  }
};
