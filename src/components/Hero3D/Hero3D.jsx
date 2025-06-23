import { useEffect, useRef, useState } from 'react';
import SoundControl from '../SoundControl/SoundControl.jsx';
import './Hero3D.css';

const Hero3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Variables pour la rotation
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Charger Three.js et GLTFLoader dynamiquement depuis CDN
    const loadThreeJS = async () => {
      // Vérifier si Three.js est déjà chargé
      if (window.THREE) {
        await loadGLTFLoader();
        initScene();
        return;
      }

      // Charger Three.js depuis CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = async () => {
        console.log('Three.js loaded successfully');
        await loadGLTFLoader();
        initScene();
      };
      script.onerror = () => {
        console.error('Failed to load Three.js');
        setLoadError(true);
        showFallbackCube();
      };
      document.head.appendChild(script);
    };

    // Charger GLTFLoader
    const loadGLTFLoader = () => {
      return new Promise((resolve, reject) => {
        if (window.THREE && window.THREE.GLTFLoader) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/GLTFLoader.js';
        script.onload = () => {
          console.log('GLTFLoader loaded successfully');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load GLTFLoader');
          reject();
        };
        document.head.appendChild(script);
      });
    };

    const initScene = () => {
      const THREE = window.THREE;
      if (!THREE) {
        setLoadError(true);
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
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      mountRef.current.appendChild(renderer.domElement);

      // Chargement du modèle 3D
      const loader = new THREE.GLTFLoader();

      // Tu dois remplacer 'model.glb' par le nom exact de ton fichier dans public/
      const modelPath = '/model.glb'; // ou '/model.gltf' selon ton fichier

      loader.load(
        modelPath,
        (gltf) => {
          console.log('Modèle 3D chargé avec succès');
          const model = gltf.scene;
          modelRef.current = model;

          // Centrer le modèle
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);

          // Ajuster la taille du modèle
          const size = box.getSize(new THREE.Vector3());
          const maxSize = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxSize; // Ajuster cette valeur selon la taille souhaitée
          model.scale.setScalar(scale);

          // Configurer les ombres pour le modèle
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // Améliorer les matériaux si nécessaire
              if (child.material) {
                child.material.envMapIntensity = 1;
                child.material.needsUpdate = true;
              }
            }
          });

          scene.add(model);
          setIsLoading(false);
          console.log('Modèle ajouté à la scène');
        },
        (progress) => {
          console.log('Progression du chargement:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
          console.error('Erreur lors du chargement du modèle:', error);
          setLoadError(true);
          setIsLoading(false);
          // Créer un cube de fallback en cas d'erreur
          createFallbackCube(scene, THREE);
        }
      );

      // Ajout de lumières optimisées pour le modèle 3D
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // Lumière de remplissage
      const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
      fillLight.position.set(-5, 0, -5);
      scene.add(fillLight);

      // Lumière d'accent dorée
      const accentLight = new THREE.PointLight(0xD4AF37, 0.5, 10);
      accentLight.position.set(2, 2, 2);
      scene.add(accentLight);

      // Environnement HDR simple
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new THREE.RoomEnvironment(), 0.04).texture;

      // Variables pour l'inertie et la sensibilité
      const ROTATION_SENSITIVITY = 0.008;
      const INERTIA_DAMPING = 0.95;
      const MIN_VELOCITY = 0.001;

      // Gestion de la souris pour rotation 360°
      const handleMouseDown = (event) => {
        isMouseDown.current = true;
        setIsDragging(true);

        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);

        lastMousePosition.current = { x: clientX, y: clientY };

        // Arrêter l'inertie quand l'utilisateur reprend le contrôle
        rotationVelocity.current = { x: 0, y: 0 };
      };

      const handleMouseMove = (event) => {
        if (!isMouseDown.current || !modelRef.current) return;

        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);

        const deltaMove = {
          x: clientX - lastMousePosition.current.x,
          y: clientY - lastMousePosition.current.y
        };

        // Appliquer la rotation directement avec une meilleure sensibilité
        modelRef.current.rotation.y += deltaMove.x * ROTATION_SENSITIVITY;
        modelRef.current.rotation.x += deltaMove.y * ROTATION_SENSITIVITY;

        // Stocker la vélocité pour l'inertie
        rotationVelocity.current.x = deltaMove.y * ROTATION_SENSITIVITY;
        rotationVelocity.current.y = deltaMove.x * ROTATION_SENSITIVITY;

        lastMousePosition.current = { x: clientX, y: clientY };
      };

      const handleMouseUp = () => {
        isMouseDown.current = false;
        setIsDragging(false);
      };

      // Support tactile pour mobile
      const handleTouchStart = (event) => {
        event.preventDefault();
        if (event.touches.length === 1) {
          const touch = event.touches[0];
          handleMouseDown({
            clientX: touch.clientX,
            clientY: touch.clientY
          });
        }
      };

      const handleTouchMove = (event) => {
        event.preventDefault();
        if (event.touches.length === 1) {
          const touch = event.touches[0];
          handleMouseMove({
            clientX: touch.clientX,
            clientY: touch.clientY
          });
        }
      };

      const handleTouchEnd = (event) => {
        event.preventDefault();
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

      // Animation loop avec inertie
      const animate = () => {
        requestAnimationFrame(animate);

        if (modelRef.current) {
          // Si l'utilisateur ne fait pas de drag, appliquer l'inertie
          if (!isMouseDown.current) {
            // Appliquer l'inertie
            modelRef.current.rotation.x += rotationVelocity.current.x;
            modelRef.current.rotation.y += rotationVelocity.current.y;

            // Amortir la vélocité
            rotationVelocity.current.x *= INERTIA_DAMPING;
            rotationVelocity.current.y *= INERTIA_DAMPING;

            // Arrêter l'inertie si la vitesse est trop faible
            if (Math.abs(rotationVelocity.current.x) < MIN_VELOCITY &&
              Math.abs(rotationVelocity.current.y) < MIN_VELOCITY) {
              rotationVelocity.current.x = 0;
              rotationVelocity.current.y = 0;
            }

            // Rotation automatique subtile si aucune inertie
            if (rotationVelocity.current.x === 0 && rotationVelocity.current.y === 0) {
              modelRef.current.rotation.y += 0.002;
            }
          }
        }

        renderer.render(scene, camera);
      };

      // Event listeners
      const canvas = renderer.domElement;

      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

      canvas.addEventListener('contextmenu', (e) => e.preventDefault());
      canvas.addEventListener('selectstart', (e) => e.preventDefault());

      window.addEventListener('resize', handleResize);

      // Démarrer l'animation
      animate();

      // Cleanup function
      window.cleanupThreeJS = () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('touchstart', handleTouchStart);

        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('touchmove', handleTouchMove);

        window.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('touchend', handleTouchEnd);

        canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
        canvas.removeEventListener('selectstart', (e) => e.preventDefault());

        window.removeEventListener('resize', handleResize);

        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }

        renderer.dispose();
        pmremGenerator.dispose();
      };
    };

    // Fonction pour créer un cube de fallback en cas d'erreur
    const createFallbackCube = (scene, THREE) => {
      const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xD4AF37,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      });

      const cube = new THREE.Mesh(geometry, material);
      modelRef.current = cube;
      cube.position.set(0, 0, 0);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
      setIsLoading(false);
    };

    const showFallbackCube = () => {
      const fallbackCube = document.createElement('div');
      fallbackCube.className = 'fallback-cube';
      fallbackCube.innerHTML = `
        <div style="
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #D4AF37, #B8860B);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 600;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: floatFallback 3s ease-in-out infinite;
        ">
          ${loadError ? 'ERREUR DE CHARGEMENT' : 'CHANEL'}
        </div>
        <style>
          @keyframes floatFallback {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
            50% { transform: translate(-50%, -50%) translateY(-20px) rotate(5deg); }
          }
        </style>
      `;

      if (mountRef.current) {
        mountRef.current.appendChild(fallbackCube);
      }
      setIsLoading(false);
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
    <section className={`hero-3d ${isDragging ? 'dragging' : ''}`}>
      {/* Container 3D */}
      <div ref={mountRef} className="threejs-container" />

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Chargement du modèle 3D...</p>
        </div>
      )}

      {/* Message d'erreur */}
      {loadError && (
        <div className="error-message">
          <p>Impossible de charger le modèle 3D</p>
          <small>Vérifiez que le fichier existe dans public/</small>
        </div>
      )}

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