import { useEffect, useRef } from 'react';
import './TextSection.css';

const TextSection = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightContentRef = useRef(null);
  const wordsRef = useRef([]);

  const mainText = "Démaquiller Nettoyer Préparer Sérum Crème Protection";
  const words = mainText.split(' ');

  const rightContent = [
    {
      title: "Démaquiller",
      description: "Retirez délicatement toutes traces de maquillage avec nos formules douces et efficaces."
    },
    {
      title: "Nettoyer",
      description: "Purifiez votre peau en profondeur tout en préservant son équilibre naturel."
    },
    {
      title: "Préparer",
      description: "Préparez votre peau à recevoir les soins avec nos lotions tonifiantes."
    },
    {
      title: "Sérum",
      description: "Concentrés d'actifs puissants pour cibler vos préoccupations spécifiques."
    },
    {
      title: "Crème",
      description: "Hydratez et nourrissez votre peau avec nos textures sensorielles."
    },
    {
      title: "Protection",
      description: "Protégez votre peau des agressions extérieures au quotidien."
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animation des mots un par un
          wordsRef.current.forEach((word, index) => {
            if (word) {
              setTimeout(() => {
                word.style.transform = 'translateY(0) scale(1)';
                word.style.opacity = '1';

                // Effet de grossissement temporaire
                setTimeout(() => {
                  word.style.transform = 'translateY(0) scale(1.1)';
                  word.style.color = '#D4AF37';
                }, 100);

                setTimeout(() => {
                  word.style.transform = 'translateY(0) scale(1)';
                  word.style.color = '#000000';
                }, 300);
              }, index * 200);
            }
          });

          // Animation du contenu de droite
          setTimeout(() => {
            if (rightContentRef.current) {
              rightContentRef.current.style.transform = 'translateX(0)';
              rightContentRef.current.style.opacity = '1';
            }
          }, words.length * 200 + 500);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="text-section">
      <div className="section-container">
        {/* Texte principal à gauche */}
        <div className="left-content">
          <div ref={leftTextRef} className="main-text">
            {words.map((word, index) => (
              <span
                key={index}
                ref={(el) => (wordsRef.current[index] = el)}
                className="text-word"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="subtitle-text">
            La simplicité chanel
          </div>
        </div>

        {/* Contenu descriptif à droite */}
        <div ref={rightContentRef} className="right-content">
          <div className="description-grid">
            {rightContent.map((item, index) => (
              <div key={index} className="description-item">
                <h3 className="description-title">{item.title}</h3>
                <p className="description-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextSection;