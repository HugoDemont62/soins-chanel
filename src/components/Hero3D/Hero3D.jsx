import { useEffect, useRef, useState } from 'react';
import SoundControl from '../SoundControl/SoundControl.jsx';
import './Hero3D.css';

const Hero3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cubeRef = useRef(null);
  const cameraRef = useRef(null);
  const cloudsRef = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

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
      camera.position.set(0, 0, 5);

      // Configuration du renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mountRef.current.appendChild(renderer.domElement);

      // Création d'un cube simple au centre
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xD4AF37, // Or Chanel
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });

      const cube = new THREE.Mesh(geometry, material);
      cubeRef.current = cube;
      cube.position.set(0, 0, 0); // Centré
      cube.castShadow = true;
      scene.add(cube);

      // Création des nuages en arrière-plan
      const createCloud = (x, y, z, scale = 1) => {
        const cloudGroup = new THREE.Group();

        // Créer plusieurs sphères pour former un nuage
        for (let i = 0; i < 6; i++) {
          const cloudGeometry = new THREE.SphereGeometry(0.5 + Math.random() * 0.3, 16, 16);
          const cloudMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.7
          });
          const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);

          // Position aléatoire dans le nuage
          cloudPart.position.set(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5),
            (Math.random() - 0.5) * 2
          );
          cloudGroup.add(cloudPart);
        }

        cloudGroup.position.set(x, y, z);
        cloudGroup.scale.setScalar(scale);
        return cloudGroup;
      };

      // Ajouter plusieurs nuages en arrière-plan
      const clouds = [];
      clouds.push(createCloud(-10, 4, -8, 1.5));
      clouds.push(createCloud(-8, -3, -10, 1.2));
      clouds.push(createCloud(10, 3, -8, 1.3));
      clouds.push(createCloud(8, -2, -12, 1.1));
      clouds.push(createCloud(-6, 6, -6, 0.8));
      clouds.push(createCloud(6, -4, -9, 0.9));

      clouds.forEach(cloud => {
        scene.add(cloud);
        cloudsRef.current.push(cloud);
      });

      // Ajout de lumières
      const ambientLight = new THREE.AmbientLight(0x87ceeb, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0x87ceeb, 0.5);
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // Variables pour l'interaction 360°
      let isMouseDown = false;

      // Gestion de la souris pour rotation 360°
      const handleMouseDown = (event) => {
        isMouseDown = true;
        setIsDragging(true);
        setPreviousMousePosition({
          x: event.clientX,
          y: event.clientY
        });
      };

      const handleMouseMove = (event) => {
        if (isMouseDown && cube) {
          const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
          };

          // Rotation complète 360° sur les deux axes
          cube.rotation.y += deltaMove.x * 0.0001;
          cube.rotation.x += deltaMove.y * 0.0001;

          setPreviousMousePosition({
            x: event.clientX,
            y: event.clientY
          });
        }
      };

      const handleMouseUp = () => {
        isMouseDown = false;
        setIsDragging(false);
      };

      // Support tactile pour mobile
      const handleTouchStart = (event) => {
        if (event.touches.length === 1) {
          const touch = event.touches[0];
          handleMouseDown({
            clientX: touch.clientX,
            clientY: touch.clientY
          });
        }
      };

      const handleTouchMove = (event) => {
        if (event.touches.length === 1) {
          event.preventDefault();
          const touch = event.touches[0];
          handleMouseMove({
            clientX: touch.clientX,
            clientY: touch.clientY
          });
        }
      };

      const handleTouchEnd = () => {
        handleMouseUp();
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

        // Animation des nuages (mouvement lent)
        cloudsRef.current.forEach((cloud, index) => {
          cloud.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.0002;
          cloud.position.y += Math.cos(Date.now() * 0.0003 + index) * 0.0001;
          cloud.rotation.y += 0.0001;
        });

        // Rotation automatique subtile du cube quand pas de drag
        if (!isMouseDown && cube) {
          cube.rotation.y += 0.0003;
          cube.rotation.x += 0.0001;
        }

        renderer.render(scene, camera);
      };

      // Event listeners
      const canvas = renderer.domElement;
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });

      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);

      window.addEventListener('resize', handleResize);

      // Démarrer l'animation
      animate();

      // Cleanup function
      window.cleanupThreeJS = () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('touchstart', handleTouchStart);

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);

        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleTouchEnd);

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

      if (mountRef.current) {
        mountRef.current.appendChild(fallbackCube);
      }
    };

    loadThreeJS()
    // Cleanup
    return () => {
      if (window.cleanupThreeJS) {
        window.cleanupThreeJS();
      }
    };
  }, []);

  return (
    <section className="hero-3d">
      {/* Container 3D */}
      <div ref={mountRef} className="threejs-container" />

      {/* Indicateur de scroll avec flèche */}
      <div className="scroll-indicator">
        <div className="scroll-arrow-down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Contrôle du son en bas à droite */}
      <SoundControl />
    </section>
  );
};

export default Hero3D;