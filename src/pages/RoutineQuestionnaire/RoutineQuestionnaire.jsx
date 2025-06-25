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
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  // Données du questionnaire selon le type
  const questionnaires = {
    targeted: {
      title: "Routine de Soins Ciblés",
      steps: [
        {
          id: 1,
          question: "Quel est votre principal besoin ?",
          description: "Choisissez le besoin qui correspond le mieux à vos attentes actuelles.",
          image: "/question-image-1.jpg",
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
          question: "À quel moment appliquez-vous vos soins ?",
          description: "Définissez votre rythme idéal pour une routine adaptée à votre quotidien.",
          image: "/question-image-2.jpg",
          options: [
            { id: "matin", label: "Uniquement le matin", description: "Routine matinale énergisante" },
            { id: "soir", label: "Uniquement le soir", description: "Routine nocturne réparatrice" },
            { id: "matin-soir", label: "Matin et soir", description: "Routine complète jour/nuit" },
            { id: "weekend", label: "Week-end uniquement", description: "Routine cocooning du weekend" }
          ]
        },
        {
          id: 3,
          question: "Quelle texture privilégiez-vous ?",
          description: "Sélectionnez la texture qui vous procure le plus de plaisir d'application.",
          image: "/question-image-3.jpg",
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
          image: "/question-image-exception-1.jpg",
          options: [
            { id: "premium", label: "Soin Premium", description: "Pour une expérience de luxe quotidienne" },
            { id: "intensif", label: "Soin Intensif", description: "Pour des résultats visibles et durables" },
            { id: "prestige", label: "Soin Prestige", description: "L'excellence absolue CHANEL" }
          ]
        },
        {
          id: 2,
          question: "Quelle est votre priorité anti-âge ?",
          description: "Choisissez l'aspect sur lequel vous souhaitez concentrer votre routine.",
          image: "/question-image-exception-2.jpg",
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
          image: "/question-image-exception-3.jpg",
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

  // Animation d'entrée
  useEffect(() => {
    if (!currentQuestion) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Image entre de la gauche
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );

    // Titre et description
    tl.fromTo(questionContainerRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
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
  }, [currentStep, currentQuestion]);

  // Animation du bouton continuer
  useEffect(() => {
    if (selectedOption && continueButtonRef.current) {
      gsap.fromTo(continueButtonRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [selectedOption]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    if (isLastStep) {
      // Dernière étape - aller aux résultats
      console.log('Réponses finales:', answers);
      navigate(`/routine/results/${type}`, {
        state: { answers: { ...answers, [currentQuestion.id]: selectedOption } }
      });
    } else {
      // Étape suivante
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setSelectedOption(answers[currentQuestionnaire.steps[currentStep - 1].id] || null);
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
          <p className="question-description">{currentQuestion.description}</p>
        </div>

        {/* Container des options avec scroll */}
        <div className="options-scroll-container">
          <div ref={optionsContainerRef} className="options-container">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`option-item ${selectedOption === option.id ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option.id)}
                data-cursor="hover"
              >
                <div className="option-radio">
                  <div className="radio-outer">
                    <div className="radio-inner" />
                  </div>
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
        {selectedOption && (
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