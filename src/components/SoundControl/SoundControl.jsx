// Fichier: src/components/SoundControl/SoundControl.jsx - SON ACTIVÉ DÈS LE DÉPART
import { useState, useEffect, useRef } from 'react';
import './SoundControl.css';

const SoundControl = () => {
  const [isMuted, setIsMuted] = useState(false); // Démarre avec le son activé
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Créer l'élément audio avec ton fichier MP3
    const audio = new Audio();

    // CHANGE LE NOM DE TON FICHIER MP3 ICI ↓
    audio.src = '/Sound-Music.mp3'; // ← Mets ton fichier dans /public/

    // Configuration de l'audio
    audio.loop = true; // En boucle pour la musique d'ambiance
    audio.volume = 0.1; // Volume modéré (0 à 1)
    audio.preload = 'auto';

    // Event listeners pour l'audio
    const handleCanPlayThrough = async () => {
      setIsLoaded(true);
      console.log('🎵 Fichier audio chargé et prêt');

      // Tenter de jouer automatiquement dès que c'est chargé
      try {
        await audio.play();
        setIsMuted(false);
        console.log('▶️ Son démarré automatiquement');
      } catch (error) {
        console.log('🚫 Autoplay bloqué - l\'utilisateur doit cliquer pour démarrer');
        // Le son reste "activé" dans l'interface, juste pas encore en cours de lecture
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      console.log('▶️ Audio en cours de lecture');
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log('⏸️ Audio en pause');
    };

    const handleError = (e) => {
      console.error('❌ Erreur de chargement audio:', e);
      console.log('💡 Assure-toi que ton fichier MP3 est dans /public/');
    };

    const handleLoadStart = () => {
      console.log('📥 Début du chargement audio...');
    };

    // Ajouter les event listeners
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    audioRef.current = audio;

    // Cleanup
    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) {
      console.log('⏳ Audio pas encore chargé...');
      return;
    }

    try {
      if (isMuted || !isPlaying) {
        // Jouer la musique
        await audio.play();
        setIsMuted(false);
        console.log('🔊 Son activé');
      } else {
        // Mettre en pause
        audio.pause();
        setIsMuted(true);
        console.log('🔇 Son désactivé');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la lecture:', error);

      // Gestion spéciale pour l'autoplay bloqué par le navigateur
      if (error.name === 'NotAllowedError') {
        console.log('🚫 Autoplay bloqué par le navigateur. L\'utilisateur doit interagir d\'abord.');
      }
    }
  };

  // Icône son activé
  const SoundOnIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Icône son désactivé
  const SoundOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 9L17 15M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Icône de chargement
  const LoadingIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="sound-control">
      <button
        className="sound-button"
        onClick={toggleSound}
        disabled={!isLoaded}
        title={!isLoaded ? 'Chargement...' : (isMuted ? 'Activer le son' : 'Désactiver le son')}
        data-cursor="hover"
      >
        {!isLoaded ? (
          <div style={{ animation: 'spin 1s linear infinite' }}>
            <LoadingIcon />
          </div>
        ) : isMuted ? (
          <SoundOffIcon />
        ) : (
          <SoundOnIcon />
        )}

        <span className="sr-only">
          {!isLoaded ? 'Chargement audio...' : (isMuted ? 'Activer le son' : 'Désactiver le son')}
        </span>
      </button>

      {/* Indicateur de statut (optionnel - pour debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '0',
          fontSize: '10px',
          color: 'white',
          background: 'rgba(0,0,0,0.7)',
          padding: '2px 6px',
          borderRadius: '3px',
          whiteSpace: 'nowrap'
        }}>
          {!isLoaded ? 'Loading...' : isPlaying ? 'Playing' : 'Paused'}
        </div>
      )}
    </div>
  );
};

// Styles CSS pour l'animation de rotation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default SoundControl;