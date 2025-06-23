import { useState, useEffect, useRef } from 'react';
import './SoundControl.css';

const SoundControl = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Créer un contexte audio pour les sons d'ambiance
    const createAmbientSound = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Créer un oscillateur pour un son d'ambiance subtil
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configuration pour un son doux et apaisant
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // Note A3
        oscillator.type = 'sine';

        // Volume très faible pour l'ambiance
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);

        return { oscillator, gainNode, audioContext };
      } catch (error) {
        console.log('Web Audio API not supported');
        return null;
      }
    };

    const ambientAudio = createAmbientSound();
    audioRef.current = ambientAudio;

    return () => {
      if (ambientAudio && ambientAudio.audioContext) {
        ambientAudio.audioContext.close();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    const { oscillator, gainNode, audioContext } = audioRef.current;

    if (!isPlaying && !isMuted) {
      // Démarrer le son d'ambiance
      try {
        oscillator.start();
        gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.5);
        setIsPlaying(true);
      } catch (error) {
        console.log('Could not start audio');
      }
    }

    setIsMuted(!isMuted);

    if (isPlaying) {
      // Ajuster le volume
      gainNode.gain.linearRampToValueAtTime(
        isMuted ? 0.02 : 0,
        audioContext.currentTime + 0.3
      );
    }
  };

  const SoundOnIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SoundOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <button className="sound-control" onClick={toggleSound}>
      {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
      <span className="sr-only">{isMuted ? 'Activer le son' : 'Désactiver le son'}</span>
    </button>
  );
}

export default SoundControl;