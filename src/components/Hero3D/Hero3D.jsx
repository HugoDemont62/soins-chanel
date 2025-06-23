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
  const [debugInfo, setDebugInfo] = useState('Initialisation...');

  // Variables pour la rotation
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    let isComponentMounted = true;

    const updateDebugInfo = (info) => {
      if (isComponentMounted) {
        setDebugInfo(info);
      }
    };

    const updateLoadingState = (loading) => {
      if (isComponentMounted) {
        setIsLoading(loading);
      }
    };

    const updateErrorState = (error) => {
      if (isComponentMounted) {
        setLoadError(error);
      }
    };

    // Quel est le nom exact de ton fichier ? Change ça :
    const MODEL_PATH = '/model.glb'; // ← CHANGE ÇA PAR TON NOM DE FICHIER EXACT

    const loadThreeJS = async () => {
      updateDebugInfo('Chargement de Three.js...');

      if (window.THREE) {
        updateDebugInfo('Three.js déjà chargé');
        await loadGLTFLoader();
        await initScene();
        return;
      }

      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
          script.onload = () => {
            console.log('Three.js loaded successfully');
            updateDebugInfo('Three.js chargé');
            resolve();
          };
          script.onerror = () => {
            console.error('Failed to load Three.js');
            reject(new Error('Failed to load Three.js'));
          };
          document.head.appendChild(script);
        });

        await loadGLTFLoader();
        await initScene();
      } catch (error) {
        console.error('Error loading Three.js:', error);
        updateDebugInfo('Erreur: Impossible de charger Three.js');
        updateErrorState(true);
        updateLoadingState(false);
      }
    };

    const loadGLTFLoader = () => {
      return new Promise((resolve, reject) => {
        updateDebugInfo('Chargement GLTFLoader...');

        // Vérifier si GLTFLoader est déjà disponible
        if (window.THREE && window.THREE.GLTFLoader) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
        script.onload = () => {
          console.log('GLTFLoader loaded successfully');
          updateDebugInfo('GLTFLoader chargé');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load GLTFLoader');
          updateDebugInfo('Erreur GLTFLoader, essai d\'une autre source...');

          // Essayer une autre source
          const script2 = document.createElement('script');
          script2.src = 'https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js';
          script2.onload = () => {
            console.log('GLTFLoader loaded from unpkg');
            updateDebugInfo('GLTFLoader chargé (unpkg)');
            resolve();
          };
          script2.onerror = () => {
            console.error('Failed to load GLTFLoader from both sources');
            reject(new Error('Failed to load GLTFLoader'));
          };
          document.head.appendChild(script2);
        };
        document.head.appendChild(script);
      });
    };

    const initScene = async () => {
      const THREE = window.THREE;
      if (!THREE) {
        updateDebugInfo('Erreur: Three.js non disponible');
        updateErrorState(true);
        updateLoadingState(false);
        return;
      }

      updateDebugInfo('Initialisation de la scène 3D...');

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
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Améliorer le rendu pour les modèles GLTF
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      if (mountRef.current && isComponentMounted) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Configuration des lumières optimisées pour GLTF
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.4);
      fillLight.position.set(-5, 0, -5);
      scene.add(fillLight);

      const accentLight = new THREE.PointLight(0xD4AF37, 0.6, 10);
      accentLight.position.set(2, 2, 2);
      scene.add(accentLight);

      // Environnement simple pour de meilleures réflections
      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      // Créer un environnement basique au lieu de RoomEnvironment
      const envScene = new THREE.Scene();
      const envGeometry = new THREE.SphereGeometry(100, 32, 16);
      const envMaterial = new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
        side: THREE.BackSide
      });
      const envMesh = new THREE.Mesh(envGeometry, envMaterial);
      envScene.add(envMesh);

      scene.environment = pmremGenerator.fromScene(envScene, 0.04).texture;
      pmremGenerator.dispose();

      // Charger le modèle GLTF
      await loadGLTFModel(scene, THREE);

      setupControls(renderer);
      animate(renderer, scene, camera);
    };

    const loadGLTFModel = (scene, THREE) => {
      return new Promise((resolve, reject) => {
        updateDebugInfo(`Chargement du modèle: ${MODEL_PATH}`);

        if (!THREE.GLTFLoader) {
          updateDebugInfo('GLTFLoader non disponible');
          updateErrorState(true);
          updateLoadingState(false);
          reject(new Error('GLTFLoader not available'));
          return;
        }

        const loader = new THREE.GLTFLoader();

        loader.load(
          MODEL_PATH,
          (gltf) => {
            console.log('Modèle GLTF chargé avec succès:', gltf);
            updateDebugInfo('Modèle chargé avec succès !');

            const model = gltf.scene;
            modelRef.current = model;

            // Centrer et redimensionner le modèle
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.sub(center);

            // Redimensionner pour que le modèle soit visible
            const maxSize = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxSize; // Ajuste cette valeur si le modèle est trop grand/petit
            model.scale.setScalar(scale);

            console.log('Modèle info:', {
              originalSize: maxSize,
              scale: scale,
              children: model.children.length
            });

            // Configurer les matériaux et ombres
            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {
                  child.material.envMapIntensity = 1;
                  child.material.needsUpdate = true;
                }
              }
            });

            scene.add(model);
            updateLoadingState(false);
            updateDebugInfo('Modèle ajouté à la scène');
            resolve();
          },
          (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateDebugInfo(`Chargement: ${percent}%`);
            console.log('Loading progress:', percent + '%');
          },
          (error) => {
            console.error('Erreur lors du chargement du modèle:', error);
            updateDebugInfo(`Erreur: ${error.message}`);
            updateErrorState(true);
            updateLoadingState(false);
            reject(error);
          }
        );
      });
    };

    const setupControls = (renderer) => {
      const ROTATION_SENSITIVITY = 0.008;

      const handleMouseDown = (event) => {
        isMouseDown.current = true;
        if (isComponentMounted) {
          setIsDragging(true);
        }

        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);

        lastMousePosition.current = { x: clientX, y: clientY };
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

        modelRef.current.rotation.y += deltaMove.x * ROTATION_SENSITIVITY;
        modelRef.current.rotation.x += deltaMove.y * ROTATION_SENSITIVITY;

        rotationVelocity.current.x = deltaMove.y * ROTATION_SENSITIVITY;
        rotationVelocity.current.y = deltaMove.x * ROTATION_SENSITIVITY;

        lastMousePosition.current = { x: clientX, y: clientY };
      };

      const handleMouseUp = () => {
        isMouseDown.current = false;
        if (isComponentMounted) {
          setIsDragging(false);
        }
      };

      const handleTouchStart = (event) => {
        event.preventDefault();
        if (event.touches.length === 1) {
          const touch = event.touches[0];
          handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
        }
      };

      const handleTouchMove = (event) => {
        event.preventDefault();
        if (event.touches.length === 1) {
          const touch = event.touches[0];
          handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        }
      };

      const handleTouchEnd = (event) => {
        event.preventDefault();
        handleMouseUp();
      };

      const handleResize = () => {
        if (!cameraRef.current || !renderer) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      const canvas = renderer.domElement;
      if (canvas) {
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        window.addEventListener('resize', handleResize);

        window.cleanupThreeJS = () => {
          if (!isComponentMounted) return;

          canvas.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
          window.removeEventListener('resize', handleResize);

          if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
          }

          renderer.dispose();
        };
      }
    };

    const animate = (renderer, scene, camera) => {
      const INERTIA_DAMPING = 0.95;
      const MIN_VELOCITY = 0.001;

      const animateLoop = () => {
        if (!isComponentMounted) return;

        requestAnimationFrame(animateLoop);

        if (modelRef.current) {
          if (!isMouseDown.current) {
            modelRef.current.rotation.x += rotationVelocity.current.x;
            modelRef.current.rotation.y += rotationVelocity.current.y;

            rotationVelocity.current.x *= INERTIA_DAMPING;
            rotationVelocity.current.y *= INERTIA_DAMPING;

            if (Math.abs(rotationVelocity.current.x) < MIN_VELOCITY &&
              Math.abs(rotationVelocity.current.y) < MIN_VELOCITY) {
              rotationVelocity.current.x = 0;
              rotationVelocity.current.y = 0;
              modelRef.current.rotation.y += 0.002;
            }
          }
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };
      animateLoop();
    };

    loadThreeJS();

    return () => {
      isComponentMounted = false;
      if (window.cleanupThreeJS) {
        window.cleanupThreeJS();
      }
    };
  }, []);

  return (
    <section className={`hero-3d ${isDragging ? 'dragging' : ''}`}>
      <div ref={mountRef} className="threejs-container" />

      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>{debugInfo}</p>
        </div>
      )}

      {loadError && (
        <div className="error-message">
          <p>Impossible de charger le modèle 3D</p>
          <small>{debugInfo}</small>
          <br />
          <small style={{display: 'block', marginTop: '8px'}}>
            Vérifiez que votre fichier est dans public/ et change MODEL_PATH ligne 29
          </small>
        </div>
      )}

      <div className="scroll-indicator">
        <div className="scroll-arrow-down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <SoundControl />
    </section>
  );
};

export default Hero3D;