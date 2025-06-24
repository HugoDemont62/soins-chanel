// Fichier: src/components/Hero3D/Hero3D.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SoundControl from '../SoundControl/SoundControl.jsx';
import './Hero3D.css';

const Hero3D = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Refs pour tous les nuages
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud3Ref = useRef(null);
  const cloud4Ref = useRef(null);
  const cloud5Ref = useRef(null);
  const cloud6Ref = useRef(null);
  const cloud7Ref = useRef(null);
  const cloud8Ref = useRef(null);

  // Refs pour les éléments principaux
  const threejsContainerRef = useRef(null);
  const heroMainTextRef = useRef(null);

  // Variables pour la rotation
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // Cache global pour éviter de recharger les scripts
  const scriptCache = useRef({
    threeJS: false,
    gltfLoader: false
  });

  // Cache pour le modèle préchargé
  const preloadedModel = useRef(null);

  // Enregistrer ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Animation de scroll avec GSAP
  useEffect(() => {
    if (!isModelReady) return;

    // Attendre que les refs soient disponibles
    const timer = setTimeout(() => {
      // Timeline pour l'animation de scroll
      gsap.set([threejsContainerRef.current, heroMainTextRef.current], { opacity: 1, scale: 1, y: 0 });

      ScrollTrigger.create({
        trigger: ".hero-3d",
        start: "top top",
        end: "200% top", // Durée plus longue
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Faire disparaître l'objet 3D progressivement
          if (threejsContainerRef.current) {
            gsap.set(threejsContainerRef.current, {
              opacity: 1 - progress,
              scale: 1 - (progress * 0.3)
            });
          }

          // Faire disparaître le texte principal
          if (heroMainTextRef.current) {
            gsap.set(heroMainTextRef.current, {
              opacity: 1 - progress,
              y: progress * -100
            });
          }

          // Bloquer les nuages progressivement
          const clouds = [
            cloud1Ref.current,
            cloud2Ref.current,
            cloud3Ref.current,
            cloud4Ref.current,
            cloud5Ref.current,
            cloud6Ref.current,
            cloud7Ref.current,
            cloud8Ref.current
          ];

          clouds.forEach((cloud, index) => {
            if (cloud) {
              // Les nuages se figent progressivement
              const cloudProgress = Math.min(progress * 1.5, 1);
              gsap.set(cloud, {
                opacity: 0.3 + (cloudProgress * 0.7), // Deviennent plus opaques
                scale: 1 + (cloudProgress * 0.2) // Grandissent légèrement
              });
            }
          });
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isModelReady]);

  useEffect(() => {
    let isComponentMounted = true;

    // CHANGE TON NOM DE FICHIER ICI :
    const MODEL_PATH = '/model.glb'; // ← TON FICHIER ICI

    // Fonction de préchargement immédiat
    const preloadEverything = async () => {
      console.log('🚀 Début du préchargement...');

      try {
        // Étape 1: Charger Three.js silencieusement
        if (!scriptCache.current.threeJS) {
          await loadThreeJS();
          scriptCache.current.threeJS = true;
        }

        // Étape 2: Charger GLTFLoader silencieusement
        if (!scriptCache.current.gltfLoader) {
          await loadGLTFLoader();
          scriptCache.current.gltfLoader = true;
        }

        // Étape 3: Précharger le modèle en arrière-plan
        if (!preloadedModel.current) {
          preloadedModel.current = await preloadModel(MODEL_PATH);
          console.log('✅ Modèle préchargé et prêt !');
        }

        if (isComponentMounted) {
          setIsModelReady(true);
        }

      } catch (error) {
        console.error('❌ Erreur de préchargement:', error);
      }
    };

    // Lancer le préchargement immédiatement
    preloadEverything();

    // Cleanup
    return () => {
      isComponentMounted = false;
      if (window.cleanupThreeJS) {
        window.cleanupThreeJS();
      }
    };
  }, []);

  // Effet pour le mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMouseDown.current) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        mousePosition.current = { x, y };

        // Mouvement des nuages avec différentes vitesses (seulement si pas en scroll)
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / (maxScroll * 0.5), 1);

        if (scrollProgress < 0.8) { // Arrêter le mouvement souris quand on commence à scroller
          if (cloud1Ref.current) {
            cloud1Ref.current.style.transform = `translate(${x * 25}px, ${y * 18}px)`;
          }
          if (cloud2Ref.current) {
            cloud2Ref.current.style.transform = `translate(${x * -20}px, ${y * 12}px)`;
          }
          if (cloud3Ref.current) {
            cloud3Ref.current.style.transform = `translate(${x * 15}px, ${y * -25}px)`;
          }
        }

        // Mouvement de l'objet 3D seulement si on ne drag pas
        if (modelRef.current) {
          modelRef.current.rotation.y = x * 0.2;
          modelRef.current.rotation.x = y * 0.1;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Effet séparé pour initialiser la scène quand le composant devient visible
  useEffect(() => {
    if (!mountRef.current || !isModelReady || !preloadedModel.current) return;

    let isComponentMounted = true;

    const initVisibleScene = () => {
      console.log('🎬 Initialisation de la scène visible...');

      const THREE = window.THREE;
      if (!THREE) return;

      // Configuration rapide de la scène (tout est déjà préchargé)
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
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      mountRef.current.appendChild(renderer.domElement);

      // Lumières
      setupLights(scene, THREE);

      // Ajouter le modèle préchargé (instantané !)
      const model = preloadedModel.current.clone();
      modelRef.current = model;
      scene.add(model);

      console.log('⚡ Modèle ajouté instantanément !');

      // Contrôles et animation
      setupControls(renderer);
      animate(renderer, scene, camera);
    };

    initVisibleScene();

    return () => {
      isComponentMounted = false;
      if (window.cleanupThreeJS) {
        window.cleanupThreeJS();
      }
    };
  }, [isModelReady]);

  // Fonctions de chargement (utilisées pour le préchargement)
  const loadThreeJS = () => {
    return new Promise((resolve, reject) => {
      if (window.THREE) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        console.log('📦 Three.js préchargé');
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Three.js'));
      document.head.appendChild(script);
    });
  };

  const loadGLTFLoader = () => {
    return new Promise((resolve, reject) => {
      if (window.THREE && window.THREE.GLTFLoader) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
      script.onload = () => {
        console.log('📦 GLTFLoader préchargé');
        resolve();
      };
      script.onerror = () => {
        // Fallback
        const script2 = document.createElement('script');
        script2.src = 'https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js';
        script2.onload = () => {
          console.log('📦 GLTFLoader préchargé (fallback)');
          resolve();
        };
        script2.onerror = () => reject(new Error('Failed to load GLTFLoader'));
        document.head.appendChild(script2);
      };
      document.head.appendChild(script);
    });
  };

  const preloadModel = (modelPath) => {
    return new Promise((resolve, reject) => {
      const THREE = window.THREE;
      if (!THREE || !THREE.GLTFLoader) {
        reject(new Error('Three.js or GLTFLoader not available'));
        return;
      }

      console.log(`📥 Préchargement du modèle: ${modelPath}`);

      const loader = new THREE.GLTFLoader();

      loader.load(
        modelPath,
        (gltf) => {
          console.log('✅ Modèle préchargé avec succès');

          const model = gltf.scene;

          // Optimiser le modèle
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.sub(center);

          const maxSize = Math.max(size.x, size.y, size.z);
          const scale = 3 / maxSize;
          model.scale.setScalar(scale);

          // Optimiser les matériaux
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

          resolve(model);
        },
        (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          console.log(`📊 Préchargement: ${percent}%`);
        },
        (error) => {
          console.error('❌ Erreur préchargement:', error);
          reject(error);
        }
      );
    });
  };

  const setupLights = (scene, THREE) => {
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

    // Environnement simple
    const pmremGenerator = new THREE.PMREMGenerator(rendererRef.current);
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
  };

  const setupControls = (renderer) => {
    const ROTATION_SENSITIVITY = 0.008;

    const handleMouseDown = (event) => {
      isMouseDown.current = true;
      setIsDragging(true);

      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);

      lastMousePosition.current = { x: clientX, y: clientY };
      rotationVelocity.current = { x: 0, y: 0 };

      // Signaler au curseur qu'on est en train de drag
      document.body.setAttribute('data-cursor-state', 'dragging');
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
      setIsDragging(false);

      // Signaler au curseur qu'on a fini de drag
      document.body.removeAttribute('data-cursor-state');
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

    // Marquer le canvas avec un attribut pour le curseur
    canvas.setAttribute('data-cursor', 'drag');

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('resize', handleResize);

    window.cleanupThreeJS = () => {
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
  };

  const animate = (renderer, scene, camera) => {
    const INERTIA_DAMPING = 0.95;
    const MIN_VELOCITY = 0.001;

    const animateLoop = () => {
      requestAnimationFrame(animateLoop);

      if (modelRef.current) {
        if (!isMouseDown.current) {
          // Appliquer l'inertie seulement si on drag
          if (Math.abs(rotationVelocity.current.x) > MIN_VELOCITY ||
            Math.abs(rotationVelocity.current.y) > MIN_VELOCITY) {
            modelRef.current.rotation.x += rotationVelocity.current.x;
            modelRef.current.rotation.y += rotationVelocity.current.y;

            rotationVelocity.current.x *= INERTIA_DAMPING;
            rotationVelocity.current.y *= INERTIA_DAMPING;
          } else {
            rotationVelocity.current.x = 0;
            rotationVelocity.current.y = 0;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animateLoop();
  };

  return (
    <section className={`hero-3d ${isDragging ? 'dragging' : ''}`}>
      {/* Logo Chanel en haut au centre */}
      <div className="chanel-logo-header">
        <img src="/Chanel-Logo.png" alt="CHANEL" className="chanel-logo-img" data-cursor="hover" />
      </div>

      {/* Nuages flottants - agrandis pour couvrir tout l'écran */}
      <div
        ref={cloud1Ref}
        className="floating-cloud cloud-1"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-15%',
          zIndex: 0,
          opacity: 0.8,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '800px', height: 'auto' }} />
      </div>

      <div
        ref={cloud2Ref}
        className="floating-cloud cloud-2"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-20%',
          zIndex: 0,
          opacity: 0.7,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '900px', height: 'auto' }} />
      </div>

      <div
        ref={cloud3Ref}
        className="floating-cloud cloud-3"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-20%',
          zIndex: 0,
          opacity: 0.6,
          transition: 'transform 0.12s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '850px', height: 'auto' }} />
      </div>

      <div
        ref={cloud4Ref}
        className="floating-cloud cloud-4"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          zIndex: 0,
          opacity: 0.5,
          transition: 'transform 0.14s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '750px', height: 'auto' }} />
      </div>

      <div
        ref={cloud5Ref}
        className="floating-cloud cloud-5"
        style={{
          position: 'absolute',
          top: '30%',
          left: '-25%',
          zIndex: 0,
          opacity: 0.4,
          transition: 'transform 0.13s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '700px', height: 'auto' }} />
      </div>

      <div
        ref={cloud6Ref}
        className="floating-cloud cloud-6"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-25%',
          zIndex: 0,
          opacity: 0.5,
          transition: 'transform 0.11s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '800px', height: 'auto' }} />
      </div>

      <div
        ref={cloud7Ref}
        className="floating-cloud cloud-7"
        style={{
          position: 'absolute',
          top: '70%',
          left: '20%',
          zIndex: 0,
          opacity: 0.3,
          transition: 'transform 0.16s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '600px', height: 'auto' }} />
      </div>

      <div
        ref={cloud8Ref}
        className="floating-cloud cloud-8"
        style={{
          position: 'absolute',
          top: '10%',
          left: '60%',
          zIndex: 0,
          opacity: 0.4,
          transition: 'transform 0.18s ease-out'
        }}
      >
        <img src="/cloud.png" alt="" style={{ width: '650px', height: 'auto' }} />
      </div>

      {/* Texte principal derrière l'objet */}
      <div ref={heroMainTextRef} className="hero-main-text">
        <h1 className="hero-title-main">L'art du soin, selon</h1>
        <h1 className="hero-title-brand">CHANEL</h1>
      </div>

      {/* Container 3D */}
      <div ref={threejsContainerRef} className="threejs-container">
        <div ref={mountRef} />
      </div>

      {/* Fallback si Three.js ne charge pas */}
      {!isModelReady && (
        <div className="fallback-cube">
          <div className="bottle-body">
            <div className="bottle-cap"></div>
            <div className="bottle-label">CHANEL</div>
          </div>
        </div>
      )}

      {/* Texte en bas à droite */}
      <div className="hero-bottom-text">
        <p>Des formules d'exception. Une expertise sur mesure. Explorez une nouvelle vision du soin du visage, où la science rencontre la sensorialité, et chaque geste sublime l'essentiel.</p>
      </div>

      <div className="scroll-indicator">
        <p className="scroll-text">SCROLL TO DISCOVER</p>
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