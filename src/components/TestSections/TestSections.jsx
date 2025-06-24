// Fichier: src/components/TestSections/TestSections.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TestSections.css';

const TestSections = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation section 1
    if (section1Ref.current) {
      gsap.fromTo(text1Ref.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 70%",
            once: true
          }
        }
      );

      gsap.fromTo(image1Ref.current,
        { opacity: 0, x: 100, rotation: 15 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 60%",
            once: true
          }
        }
      );
    }

    // Animation section 2
    if (section2Ref.current) {
      gsap.fromTo(text2Ref.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
            once: true
          }
        }
      );

      gsap.fromTo(image2Ref.current,
        { opacity: 0, x: -100, rotation: -15 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 60%",
            once: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Section 1 - Découverte */}
      <section ref={section1Ref} className="test-section section-1">
        <div className="section-container">
          <div className="section-content">
            <div ref={text1Ref} className="section-text">
              <h2 className="section-title">Découvrez l'Exception</h2>
              <p className="section-description">
                Une gamme complète de soins visage qui révèle l'éclat naturel de votre peau.
                Chaque formule est pensée pour offrir une expérience sensorielle unique,
                alliant efficacité et plaisir d'utilisation.
              </p>
              <button className="section-button">Explorer la gamme</button>
            </div>
            <div ref={image1Ref} className="section-image">
              <div
                className="image-container"
                style={{ backgroundImage: 'url("/image-4.png")' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Innovation */}
      <section ref={section2Ref} className="test-section section-2">
        <div className="section-container">
          <div className="section-content reverse">
            <div ref={image2Ref} className="section-image">
              <div
                className="image-container"
                style={{ backgroundImage: 'url("/image-5.png")' }}
              />
            </div>
            <div ref={text2Ref} className="section-text">
              <h2 className="section-title">Innovation & Tradition</h2>
              <p className="section-description">
                L'alliance parfaite entre savoir-faire traditionnel et innovation scientifique.
                Nos laboratoires développent des formules d'exception qui respectent
                l'équilibre naturel de la peau tout en apportant des résultats visibles.
              </p>
              <button className="section-button">En savoir plus</button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Footer spacer */}
      <section className="test-section section-footer">
        <div className="footer-content">
          <h3>Merci de votre visite</h3>
          <p>Fin de la démonstration scroll</p>
        </div>
      </section>
    </>
  );
};

export default TestSections;