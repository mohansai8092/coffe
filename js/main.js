/**
 * Brew Bliss 3D - Main Application Controller (Fixed Layout & Increment Logic)
 */

window.BrewUI = {
  currentModal: null,

  // Selected Order Product State
  selectedProduct: {
    name: 'Velvet Caramel Macchiato',
    origPrice: 7.85,
    finalPrice: 5.50
  },

  // Exact Social Stats Integers (+1 increment per click!)
  socialStats: {
    ig: 125482,
    fb: 84210,
    yt: 50195
  },

  init: function() {
    this.setupEventListeners();
    this.setupCustomizer();
    this.setupSocialCounters();
  },

  setupEventListeners: function() {
    // Camera View Selector Buttons
    document.querySelectorAll('.cam-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        BrewAudio.playClickSound();
        BrewScene.stopCinematicTour();

        document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const view = btn.dataset.view;
        if (view === 'tour') {
          BrewScene.startCinematicTour();
        } else {
          BrewScene.setCameraPreset(view);
        }
      });
    });

    // Auto-Rotate Toggle Button
    const rotateBtn = document.getElementById('btnRotateToggle');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        BrewAudio.playClickSound();
        const isRotating = BrewScene.toggleAutoRotate();
        rotateBtn.classList.toggle('active', isRotating);
        rotateBtn.querySelector('.lbl').textContent = isRotating ? 'Auto-Rotate: ON' : 'Auto-Rotate: OFF';
      });
    }

    // Audio Ambiance Toggle Button
    const audioBtn = document.getElementById('btnAudioToggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isPlaying = BrewAudio.toggleAmbiance();
        audioBtn.classList.toggle('active', isPlaying);
        audioBtn.querySelector('.lbl').textContent = isPlaying ? 'Café Vibe: ON 🎵' : 'Café Vibe: OFF 🔇';
      });
    }

    // 3D Hotspots
    document.querySelectorAll('.hotspot').forEach(spot => {
      spot.addEventListener('click', () => {
        BrewAudio.playClickSound();
        const action = spot.dataset.action;
        if (action === 'bogo') {
          BrewScene.setCameraPreset('bogo');
          this.openModal('bogoModal');
        } else if (action === 'qr') {
          BrewScene.setCameraPreset('qr');
          this.openModal('menuModal');
        } else if (action === 'customizer') {
          BrewScene.setCameraPreset('hero');
          this.openModal('customizerModal');
        }
      });
    });

    // Modal Close
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
      el.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // Claim BOGO Offer Button
    const claimBtn = document.getElementById('btnClaimBOGO');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        BrewAudio.playClickSound();
        this.triggerConfetti();
        const codeDisplay = document.getElementById('bogoCodeBox');
        if (codeDisplay) {
          codeDisplay.classList.remove('hidden');
          codeDisplay.innerHTML = '🎉 PROMO CODE: <strong>BREWBLISSBOGO</strong> (Copied!)';
          navigator.clipboard.writeText('BREWBLISSBOGO').catch(()=>{});
        }
      });
    }

    // Simulate QR Scan Button
    const scanBtn = document.getElementById('btnSimulateScan');
    if (scanBtn) {
      scanBtn.addEventListener('click', () => {
        BrewAudio.playClickSound();
        this.triggerConfetti();
        const box = document.getElementById('qrScanSuccess');
        if (box) {
          box.classList.remove('hidden');
          setTimeout(() => {
            this.openModal('checkoutModal');
          }, 1500);
        }
      });
    }
  },

  // Social Marketing Counter Buttons (+1 per single click!)
  setupSocialCounters: function() {
    const igBtn = document.getElementById('btnIgFollow');
    if (igBtn) {
      igBtn.addEventListener('click', () => {
        BrewAudio.playClickSound();
        this.socialStats.ig += 1;
        document.getElementById('cntIg').textContent = this.socialStats.ig.toLocaleString();
        igBtn.querySelector('.btn-action').textContent = '✓ Following';
        igBtn.style.borderColor = '#fd1d1d';
        this.triggerConfetti();
      });
    }

    const fbBtn = document.getElementById('btnFbLike');
    if (fbBtn) {
      fbBtn.addEventListener('click', () => {
        BrewAudio.playClickSound();
        this.socialStats.fb += 1;
        document.getElementById('cntFb').textContent = this.socialStats.fb.toLocaleString();
        fbBtn.querySelector('.btn-action').textContent = '✓ Liked';
        fbBtn.style.borderColor = '#1877f2';
      });
    }

    const ytBtn = document.getElementById('btnYtSub');
    if (ytBtn) {
      ytBtn.addEventListener('click', () => {
        BrewAudio.playClickSound();
        this.socialStats.yt += 1;
        document.getElementById('cntYt').textContent = this.socialStats.yt.toLocaleString();
        ytBtn.querySelector('.btn-action').textContent = '✓ Subscribed';
        ytBtn.style.borderColor = '#ff0000';
        this.triggerConfetti();
      });
    }
  },

  selectProduct: function(name, finalPrice) {
    const origPrice = (finalPrice * 1.428).toFixed(2);
    this.selectedProduct = { name, origPrice, finalPrice: finalPrice.toFixed(2) };

    document.getElementById('cartItemName').textContent = `${name} (Large)`;
    document.getElementById('cartItemOrigPrice').textContent = `$${origPrice}`;
    document.getElementById('cartDiscount').textContent = `-$${(origPrice - finalPrice).toFixed(2)}`;
    document.getElementById('cartItemFinalPrice').textContent = `$${finalPrice.toFixed(2)}`;

    this.openModal('checkoutModal');
  },

  processPayment: function(method) {
    BrewAudio.playClickSound();
    this.triggerConfetti();

    alert(`🎉 THANK YOU FOR YOUR ORDER!\n\nPaid via ${method}: $${this.selectedProduct.finalPrice}\n30% Discount Code BLISS30 Applied.\nEstimated Delivery / Prep Time: 20-25 Mins.`);
    this.closeAllModals();
  },

  openModal: function(modalId) {
    this.closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      this.currentModal = modal;
    }
  },

  closeAllModals: function() {
    document.querySelectorAll('.modal-wrapper').forEach(m => m.classList.remove('active'));
    this.currentModal = null;
  },

  setupCustomizer: function() {
    const roastInput = document.getElementById('optRoast');

    if (roastInput) {
      roastInput.addEventListener('change', () => {
        const val = roastInput.value;
        let hexColor = 0x5a341a;
        if (val === 'light') hexColor = 0x8c522b;
        if (val === 'dark') hexColor = 0x241208;

        if (BrewModels.animatedObjects.floatingBeans) {
          BrewModels.animatedObjects.floatingBeans.forEach(bean => {
            bean.material.color.setHex(hexColor);
          });
        }
      });
    }
  },

  triggerConfetti: function() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff7700', '#ffb700', '#ffffff', '#833ab4', '#00b894'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.8) * 18,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        alpha: 1
      });
    }

    const animateConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.alpha <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.alpha -= 0.012;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (alive) {
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animateConfetti();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  BrewScene.init('webgl-container');
  BrewUI.init();
});
