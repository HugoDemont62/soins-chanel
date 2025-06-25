// Fichier: src/pages/RoutineQuestionnaire/RoutineQuestionnaire.jsx
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './RoutineQuestionnaire.css';

const RoutineQuestionnaire = () => {
  const { type } = useParams(); // 'targeted' ou 'exception'
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const imageRef = useRef(null);
  const questionContainerRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const continueButtonRef = useRef(null);

  // État du questionnaire
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // Support pour choix multiple
  const [answers, setAnswers] = useState({});
  const [hasAnimated, setHasAnimated] = useState(false); // Pour éviter de réanimer les options

  // Données du questionnaire selon le type
  const questionnaires = {
    targeted: {
      title: "Routine de Soins Ciblés",
      steps: [
        {
          id: 1,
          question: "Quel est votre principal besoin ?",
          description: "Choisissez le besoin qui correspond le mieux à vos attentes actuelles.",
          image: "/image-1.png",
          multipleChoice: false, // Choix unique
          options: [
            { id: "hydration", label: "Hydratation intense", description: "Pour une peau sèche et déshydratée" },
            { id: "anti-age", label: "Anti-âge global", description: "Pour prévenir et corriger les signes de l'âge" },
            { id: "eclat", label: "Éclat du teint", description: "Pour retrouver luminosité et uniformité" },
            { id: "purete", label: "Pureté", description: "Pour une peau nette et sans imperfections" },
            { id: "sensibilite", label: "Sensibilité", description: "Pour apaiser et protéger les peaux sensibles" }
          ]
        },
        {
          id: 2,
          question: "Quels sont vos moments de soins préférés ?",
          description: "Vous pouvez sélectionner plusieurs moments selon vos habitudes.",
          image: "/image-2.png",
          multipleChoice: true, // Choix multiple
          options: [
            { id: "matin", label: "Le matin", description: "Routine matinale énergisante" },
            { id: "midi", label: "À midi", description: "Retouche hydratation en journée" },
            { id: "soir", label: "Le soir", description: "Routine nocturne réparatrice" },
            { id: "weekend", label: "Week-end", description: "Routine cocooning du weekend" }
          ]
        },
        {
          id: 3,
          question: "Quelle texture privilégiez-vous ?",
          description: "Sélectionnez la texture qui vous procure le plus de plaisir d'application.",
          image: "/image-3.png",
          multipleChoice: false, // Choix unique
          options: [
            { id: "creme", label: "Crème onctueuse", description: "Texture riche et nourrissante" },
            { id: "fluide", label: "Fluide léger", description: "Texture fraîche et non grasse" },
            { id: "serum", label: "Sérum concentré", description: "Texture ultra-légère et pénétrante" },
            { id: "huile", label: "Huile précieuse", description: "Texture luxueuse et sensorielle" },
            { id: "gel", label: "Gel rafraîchissant", description: "Texture fraîche et apaisante" }
          ]
        }
      ]
    },
    exception: {
      title: "Routine de Soins d'Exception",
      steps: [
        {
          id: 1,
          question: "Quel niveau de soin recherchez-vous ?",
          description: "Définissez l'intensité de votre routine beauté quotidienne.",
          image: "/-image-1.png",
          multipleChoice: false,
          options: [
            { id: "premium", label: "Soin Premium", description: "Pour une expérience de luxe quotidienne" },
            { id: "intensif", label: "Soin Intensif", description: "Pour des résultats visibles et durables" },
            { id: "prestige", label: "Soin Prestige", description: "L'excellence absolue CHANEL" }
          ]
        },
        {
          id: 2,
          question: "Quelles sont vos priorités anti-âge ?",
          description: "Sélectionnez tous les aspects sur lesquels vous souhaitez agir.",
          image: "/image-2.png",
          multipleChoice: true, // Choix multiple
          options: [
            { id: "fermete", label: "Fermeté", description: "Redensifier et raffermir la peau" },
            { id: "rides", label: "Rides et ridules", description: "Lisser et prévenir les signes du temps" },
            { id: "luminosite", label: "Luminosité", description: "Révéler l'éclat naturel de la peau" },
            { id: "regeneration", label: "Régénération", description: "Stimuler le renouvellement cellulaire" }
          ]
        },
        {
          id: 3,
          question: "Quel rituel vous correspond ?",
          description: "Sélectionnez le rituel qui s'adapte le mieux à votre style de vie.",
          image: "/image-3.png",
          multipleChoice: false,
          options: [
            { id: "complet", label: "Rituel complet", description: "Nettoyage, sérum, crème, contour des yeux" },
            { id: "essentiel", label: "Rituel essentiel", description: "Les 3 étapes fondamentales" },
            { id: "expert", label: "Rituel expert", description: "Protocole professionnel à domicile" }
          ]
        }
      ]
    }
  };

  const currentQuestionnaire = questionnaires[type] || questionnaires.targeted;
  const currentQuestion = currentQuestionnaire.steps[currentStep];
  const isLastStep = currentStep === currentQuestionnaire.steps.length - 1;

  // Animation d'entrée SEULEMENT au changement de step
  useEffect(() => {
    if (!currentQuestion) return;

    setHasAnimated(false);
    setSelectedOptions([]); // Reset sélection pour nouvelle question

    const tl = gsap.timeline({ delay: 0.2 });

    // Image entre de la gauche
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );

    // Titre et description
    tl.fromTo(questionContainerRef.current?.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        onComplete: () => setHasAnimated(true) // Marquer comme animé
      },
      "-=0.8"
    );

    // Options avec stagger
    tl.fromTo(optionsContainerRef.current?.children,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
      "-=0.6"
    );

    return () => {
      tl.kill();
    };
  }, [currentStep]); // ← SEULEMENT au changement de step

  // Animation du bouton continuer (séparée et sans interférer avec les options)
  useEffect(() => {
    if (selectedOptions.length > 0 && continueButtonRef.current && hasAnimated) {
      gsap.fromTo(continueButtonRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [selectedOptions, hasAnimated]); // ← Dépend des options sélectionnées ET de l'état d'animation

  const handleOptionSelect = (optionId) => {
    if (currentQuestion.multipleChoice) {
      // Choix multiple
      setSelectedOptions(prev => {
        if (prev.includes(optionId)) {
          // Désélectionner si déjà sélectionné
          return prev.filter(id => id !== optionId);
        } else {
          // Ajouter à la sélection
          return [...prev, optionId];
        }
      });
    } else {
      // Choix unique
      setSelectedOptions([optionId]);
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length === 0) return;

    // Sauvegarder les réponses
    const answerValue = currentQuestion.multipleChoice ? selectedOptions : selectedOptions[0];
    const updatedAnswers = { ...answers, [currentQuestion.id]: answerValue };
    setAnswers(updatedAnswers);

    if (isLastStep) {
      // Dernière étape - aller aux résultats
      console.log('Réponses finales:', updatedAnswers);
      navigate(`/routine/results/${type}`, {
        state: { answers: updatedAnswers }
      });
    } else {
      // Étape suivante
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Récupérer les réponses précédentes
      const previousAnswer = answers[currentQuestionnaire.steps[currentStep - 1].id];
      if (Array.isArray(previousAnswer)) {
        setSelectedOptions(previousAnswer);
      } else if (previousAnswer) {
        setSelectedOptions([previousAnswer]);
      } else {
        setSelectedOptions([]);
      }
    } else {
      navigate('/routine/selection');
    }
  };

  if (!currentQuestion) {
    return <div>Chargement...</div>;
  }

  return (
    <div ref={pageRef} className="routine-questionnaire-page">

      {/* Section Image - 50% gauche */}
      <div className="image-section">
        <img
          ref={imageRef}
          src={currentQuestion.image}
          alt={`Question ${currentStep + 1}`}
          className="question-image"
        />

        {/* Indicateur de progression */}
        <div className="progress-indicator">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / currentQuestionnaire.steps.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {currentStep + 1} / {currentQuestionnaire.steps.length}
          </span>
        </div>
      </div>

      {/* Section Questions - 50% droite */}
      <div className="question-section">

        {/* Header avec bouton retour */}
        <div className="question-header">
          <button
            className="back-button"
            onClick={handleBack}
            data-cursor="hover"
          >
            ← Retour
          </button>
          <div className="routine-type">{currentQuestionnaire.title}</div>
        </div>

        {/* Container de la question */}
        <div ref={questionContainerRef} className="question-container">
          <h2 className="question-title">{currentQuestion.question}</h2>
          <p className="question-description">
            {currentQuestion.description}
            {currentQuestion.multipleChoice && (
              <span style={{ display: 'block', marginTop: '8px', fontSize: '0.85em', color: '#D4AF37', fontWeight: '600' }}>
                ✓ Choix multiples possibles
              </span>
            )}
          </p>
        </div>

        {/* Container des options avec scroll */}
        <div className="options-scroll-container">
          <div ref={optionsContainerRef} className="options-container">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`option-item ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option.id)}
                data-cursor="hover"
              >
                <div className="option-radio">
                  {currentQuestion.multipleChoice ? (
                    // Checkbox pour choix multiple
                    <div className="checkbox-outer">
                      <div className="checkbox-inner" />
                      {selectedOptions.includes(option.id) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute' }}>
                          <path d="M20 6L9 17L4 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ) : (
                    // Radio button pour choix unique
                    <div className="radio-outer">
                      <div className="radio-inner" />
                    </div>
                  )}
                </div>
                <div className="option-content">
                  <h3 className="option-label">{option.label}</h3>
                  <p className="option-description">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton continuer */}
        {selectedOptions.length > 0 && (
          <div className="continue-container">
            <button
              ref={continueButtonRef}
              className="continue-button"
              onClick={handleContinue}
              data-cursor="hover"
            >
              {isLastStep ? 'Voir ma routine' : 'Continuer'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutineQuestionnaire;