/**
 * Brew Bliss 3D - Ultra-Realistic PBR Material & 4K Texture Generator
 * Ray-traced lighting quality, high-res PBR textures, and warm orange advertising glow.
 */

window.BrewMaterials = {
  drawRoundRect: function(ctx, x, y, w, h, r) {
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
  },

  // Studio Ray-Tracing HDRI Environment Map
  createEnvMapTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rich warm orange studio gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#4a2810');
    grad.addColorStop(0.35, '#8c4818');
    grad.addColorStop(0.7, '#241005');
    grad.addColorStop(1, '#090401');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Warm tungsten studio light reflection panels
    ctx.fillStyle = 'rgba(255, 180, 100, 0.95)';
    ctx.fillRect(200, 40, 240, 100);
    ctx.fillRect(600, 40, 240, 100);

    // High intensity amber point light reflections
    ctx.fillStyle = '#ff9900';
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(150, 240, 70, 0, Math.PI * 2);
    ctx.arc(870, 240, 70, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    if (THREE.EquirectangularReflectionMapping) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
    }
    return texture;
  },

  // 4K Ultra-High Detail Dark Walnut Herringbone Parquet
  createWoodTexture: function(width = 2048, height = 2048, isDark = false) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const baseColor = isDark ? '#1e0d05' : '#3d1f0d';
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, width, height);

    // Fine organic wood grain lines
    for (let i = 0; i < 800; i++) {
      ctx.beginPath();
      const y = Math.random() * height;
      ctx.lineWidth = 0.5 + Math.random() * 3.5;
      ctx.strokeStyle = isDark ? `rgba(10, 4, 1, ${0.2 + Math.random() * 0.4})` : `rgba(25, 10, 3, ${0.2 + Math.random() * 0.4})`;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(
        width * 0.25, y + (Math.random() - 0.5) * 60,
        width * 0.75, y + (Math.random() - 0.5) * 60,
        width, y + (Math.random() - 0.5) * 20
      );
      ctx.stroke();
    }

    // Herringbone Planks with fine bevel edges
    const plankWidth = 160;
    const plankHeight = 480;
    ctx.strokeStyle = 'rgba(5, 2, 1, 0.9)';
    ctx.lineWidth = 3.5;

    for (let x = 0; x < width + plankHeight; x += plankWidth) {
      for (let y = 0; y < height + plankHeight; y += plankHeight) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + plankWidth, y + plankHeight / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + plankWidth, y + plankHeight / 2);
        ctx.lineTo(x, y + plankHeight);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  },

  // Normal / Bump Map for Surface Depth
  createWoodBumpMap: function(width = 1024, height = 1024) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#ffffff';
    for (let i = 0; i < 400; i++) {
      ctx.lineWidth = 1 + Math.random() * 2.5;
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + (Math.random() - 0.5) * 12);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  },

  // Luxury Calacatta Gold Marble Texture
  createMarbleTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fbf9f4';
    ctx.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 18; i++) {
      ctx.strokeStyle = 'rgba(90, 85, 80, 0.2)';
      ctx.lineWidth = 2 + Math.random() * 12;
      ctx.beginPath();
      let x = Math.random() * 1024;
      let y = Math.random() * 1024;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (Math.random() - 0.5) * 350;
        y += (Math.random() - 0.5) * 350;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    for (let i = 0; i < 10; i++) {
      ctx.strokeStyle = 'rgba(230, 160, 20, 0.6)';
      ctx.lineWidth = 2 + Math.random() * 6;
      ctx.beginPath();
      let x = Math.random() * 1024;
      let y = Math.random() * 1024;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 300;
        y += (Math.random() - 0.5) * 300;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  },

  // Soft Radial Contact Shadow Map (Under Hero Table & Cup)
  createContactShadowTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 240);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  // Golden Light Bokeh Particles Texture
  createBokehTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 200, 100, 0.9)');
    grad.addColorStop(0.3, 'rgba(255, 140, 0, 0.4)');
    grad.addColorStop(0.7, 'rgba(255, 100, 0, 0.15)');
    grad.addColorStop(1, 'rgba(255, 80, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  createWallSlatTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#140804';
    ctx.fillRect(0, 0, 512, 512);

    const slatCount = 16;
    const slatWidth = 512 / slatCount;
    for (let i = 0; i < slatCount; i++) {
      const x = i * slatWidth;
      const grad = ctx.createLinearGradient(x, 0, x + slatWidth * 0.8, 0);
      grad.addColorStop(0, '#4a2812');
      grad.addColorStop(0.5, '#7a4622');
      grad.addColorStop(1, '#2d160a');

      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, slatWidth * 0.75, 512);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  },

  createLatteArtTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
    grad.addColorStop(0, '#3e2010');
    grad.addColorStop(0.7, '#2a1307');
    grad.addColorStop(1, '#1b0902');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#c48946';
    ctx.lineWidth = 12;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.95;
    ctx.fillStyle = '#fff4e0';

    ctx.save();
    ctx.translate(256, 240);
    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.bezierCurveTo(-80, -40, -100, -120, 0, -160);
    ctx.bezierCurveTo(100, -120, 80, -40, 0, 40);
    ctx.fill();

    ctx.fillStyle = '#fce4c8';
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.bezierCurveTo(-50, -30, -70, -90, 0, -120);
    ctx.bezierCurveTo(70, -90, 50, -30, 0, 20);
    ctx.fill();
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  createDigitalDisplayCanvas: function(time = 0) {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 1280, 720);
    bgGrad.addColorStop(0, '#0f0401');
    bgGrad.addColorStop(0.5, '#3a1304');
    bgGrad.addColorStop(1, '#080201');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1280, 720);

    ctx.shadowColor = '#ff6b00';
    ctx.shadowBlur = 45;
    ctx.strokeStyle = '#ff9d00';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1220, 660);

    ctx.shadowColor = '#f5c542';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#f5c542';
    ctx.font = '900 42px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ EXCLUSIVE LIMITED PROMOTION ⚡', 640, 110);

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 90, 0, 0.25)';
    ctx.fillRect(120, 155, 1040, 320);

    ctx.shadowColor = '#ff3300';
    ctx.shadowBlur = 40;
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 108px "Montserrat", sans-serif';
    ctx.fillText('BUY 1 GET 1 FREE', 640, 275);

    ctx.shadowColor = '#ffb700';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#ffc800';
    ctx.font = '700 46px "Poppins", sans-serif';
    ctx.fillText('On All Handcrafted Artisanal Brews', 640, 385);

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#f8e6d4';
    ctx.font = '600 32px sans-serif';
    ctx.fillText('Scan Table QR Code or Order Online Today', 640, 520);

    const seconds = Math.floor((360000 - (time % 360000)) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    ctx.fillStyle = '#ff4500';
    ctx.shadowColor = '#ff4500';
    ctx.shadowBlur = 20;
    ctx.fillRect(440, 575, 400, 60);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 0;
    ctx.font = '800 30px monospace';
    ctx.fillText(`OFFER EXPIRES: ${timeStr}`, 640, 616);

    const texture = new THREE.CanvasTexture(canvas);
    return { texture, canvas, ctx };
  },

  createQRCodeCanvas: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 492, 492);

    ctx.fillStyle = '#1f130a';
    ctx.font = '900 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BREW BLISS', 256, 65);

    ctx.fillStyle = '#7a4b27';
    ctx.font = '600 20px sans-serif';
    ctx.fillText('SCAN TO ORDER ONLINE', 256, 95);

    const qrX = 106, qrY = 120, qrSize = 300;
    ctx.fillStyle = '#111111';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qrX + 12, qrY + 12, qrSize - 24, qrSize - 24);

    const drawFinder = (x, y) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, 70, 70);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, y + 10, 50, 50);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 20, y + 20, 30, 30);
    };

    drawFinder(qrX + 20, qrY + 20);
    drawFinder(qrX + qrSize - 90, qrY + 20);
    drawFinder(qrX + 20, qrY + qrSize - 90);

    ctx.fillStyle = '#000000';
    for (let r = 0; r < 24; r++) {
      for (let c = 0; c < 24; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c > 15) || (r > 15 && c < 8)) continue;
        if ((r * 3 + c * 7) % 2 === 0) {
          ctx.fillRect(qrX + 20 + c * 10, qrY + 20 + r * 10, 9, 9);
        }
      }
    }

    ctx.fillStyle = '#d4af37';
    ctx.fillRect(216, 230, 80, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('☕', 256, 285);

    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('⚡ GET 30% OFF FIRST ORDER', 256, 460);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  createSocialIconCanvas: function(platform = 'instagram') {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);

    if (platform === 'instagram') {
      const grad = ctx.createLinearGradient(0, 0, 256, 256);
      grad.addColorStop(0, '#833ab4');
      grad.addColorStop(0.5, '#fd1d1d');
      grad.addColorStop(1, '#fcb045');
      ctx.fillStyle = grad;
    } else if (platform === 'facebook') {
      ctx.fillStyle = '#1877f2';
    } else if (platform === 'youtube') {
      ctx.fillStyle = '#ff0000';
    }
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (platform === 'instagram') {
      ctx.font = '900 110px sans-serif';
      ctx.fillText('📷', 128, 130);
    } else if (platform === 'facebook') {
      ctx.font = '900 130px sans-serif';
      ctx.fillText('f', 128, 135);
    } else if (platform === 'youtube') {
      ctx.font = '900 110px sans-serif';
      ctx.fillText('▶', 128, 130);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  createDeliveryIconCanvas: function(isExpress = true) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = isExpress ? '#00b894' : '#e17055';
    this.drawRoundRect(ctx, 10, 10, 492, 236, 30);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '900 36px "Montserrat", sans-serif';
    ctx.fillText(isExpress ? '🛵 EXPRESS DELIVERY' : '🛍️ TAKEAWAY PICKUP', 256, 110);

    ctx.font = '600 24px sans-serif';
    ctx.fillText(isExpress ? 'DoorDash • UberEats • Grab' : 'Order Ahead & Skip The Line', 256, 170);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  createWallLogoCanvas: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 1024, 512);

    ctx.textAlign = 'center';
    ctx.shadowColor = '#ffaa33';
    ctx.shadowBlur = 35;

    ctx.fillStyle = '#f5e4c3';
    ctx.font = '900 110px "Playfair Display", serif';
    ctx.fillText('BREW BLISS', 512, 240);

    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffaa33';
    ctx.font = '600 36px "Poppins", sans-serif';
    ctx.fillText('— ARTISANAL ROASTERY & ESPRESSO BAR —', 512, 330);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  },

  createSteamTexture: function() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 245, 235, 0.65)');
    grad.addColorStop(0.4, 'rgba(245, 230, 215, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }
};
