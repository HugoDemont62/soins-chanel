import { useEffect, useRef } from 'react';
import './Hero3D.css';

const Hero3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cubeRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Charger Three.js dynamiquement depuis CDN
    const loadThreeJS = async () => {
      // Vérifier si Three.js est déjà chargé
      if (window.THREE) {
        initScene();
        return;
      }

      // Charger Three.js depuis CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        console.log('Three.js loaded successfully');
        initScene();
      };
      script.onerror = () => {
        console.error('Failed to load Three.js');
        // Fallback: afficher un carré CSS simple
        showFallbackCube();
      };
      document.head.appendChild(script);
    };

    const initScene = () => {
      const THREE = window.THREE;
      if (!THREE) {
        showFallbackCube();
        return;
      }

      // Configuration de la scène
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Configuration de la caméra
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      camera.position.z = 5;

      // Configuration du renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent
      mountRef.current.appendChild(renderer.domElement);

      // Création du cube avec texture dorée
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial({
        color: 0xD4AF37, // Or Chanel
        shininess: 100,
        specular: 0x222222
      });

      const cube = new THREE.Mesh(geometry, material);
      cubeRef.current = cube;
      scene.add(cube);

      // Ajout de lumières
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xD4AF37, 0.5);
      pointLight.position.set(-5, -5, 5);
      scene.add(pointLight);

      // Variables pour l'interaction souris
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      // Gestion de la souris
      const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        targetRotationX = mouseY * 0.3;
        targetRotationY = mouseX * 0.3;
      };

      // Gestion du redimensionnement
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        if (cube) {
          // Rotation automatique
          cube.rotation.x += 0.005;
          cube.rotation.y += 0.005;

          // Interaction souris (interpolation douce)
          cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;
          cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;

          // Effet de respiration (scale)
          const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
          cube.scale.set(scale, scale, scale);
        }

        renderer.render(scene, camera);
      };

      // Event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      // Démarrer l'animation
      animate();

      // Cleanup function
      window.cleanupThreeJS = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }

        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    };

    const showFallbackCube = () => {
      // Créer un cube CSS en fallback
      const fallbackCube = document.createElement('div');
      fallbackCube.className = 'fallback-cube';
      fallbackCube.innerHTML = `
        <div class="cube-face cube-front"></div>
        <div class="cube-face cube-back"></div>
        <div class="cube-face cube-right"></div>
        <div class="cube-face cube-left"></div>
        <div class="cube-face cube-top"></div>
        <div class="cube-face cube-bottom"></div>
      `;

      if (mountRef.current) {
        mountRef.current.appendChild(fallbackCube);
      }
    };

    loadThreeJS();

    // Cleanup
    return () => {
      if (window.cleanupThreeJS) {
        window.cleanupThreeJS();
      }
    };
  }, []);

  return (
    <section className="hero-3d">
      <div ref={mountRef} className="threejs-container" />

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            L'Art du
            <span className="hero-title-accent">Soin</span>
          </h1>
          <p className="hero-subtitle">
            Découvrez l'excellence des soins Chanel
          </p>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero3D;