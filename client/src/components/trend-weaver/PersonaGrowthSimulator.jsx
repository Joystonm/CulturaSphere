import React, { useState } from 'react';

const PersonaGrowthSimulator = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [timeframe, setTimeframe] = useState('3');
  const [simulationResults, setSimulationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample personas - these would be fetched from an API in a real app
  const personas = [
    {
      id: 1,
      name: 'Urban Bohemian Explorer',
      description: 'Creatively minded urban dwellers who value authenticity and artistic expression',
      currentTastes: [
        { category: 'Music', items: ['Indie folk', 'Jazz fusion', 'Ambient electronica'] },
        { category: 'Literature', items: ['Beat poetry', 'Existentialist fiction', 'Literary magazines'] },
        { category: 'Food', items: ['Third-wave coffee', 'Fusion street food', 'Natural wine'] },
        { category: 'Fashion', items: ['Vintage workwear', 'Artisanal accessories', 'Sustainable brands'] }
      ],
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Cinematic Minimalist Nomad',
      description: 'Digital professionals who blend work and travel while maintaining a curated aesthetic',
      currentTastes: [
        { category: 'Music', items: ['Minimal techno', 'Contemporary classical', 'Japanese ambient'] },
        { category: 'Literature', items: ['Travel essays', 'Architectural theory', 'Scandinavian noir'] },
        { category: 'Food', items: ['Plant-based bowls', 'Specialty coffee', 'Fermented foods'] },
        { category: 'Fashion', items: ['Technical fabrics', 'Monochrome palettes', 'Functional design'] }
      ],
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Folklore + Forest Lover',
      description: 'Nature-connected individuals who blend traditional crafts with modern sustainability',
      currentTastes: [
        { category: 'Music', items: ['Folk revival', 'Acoustic instrumentals', 'Nature field recordings'] },
        { category: 'Literature', items: ['Nature writing', 'Mythology', 'Craft manuals'] },
        { category: 'Food', items: ['Foraged ingredients', 'Fermentation', 'Herbal teas'] },
        { category: 'Fashion', items: ['Natural dyes', 'Handcrafted textiles', 'Functional outdoor gear'] }
      ],
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Dynamic taste evolution generator
  const generateTasteEvolution = (persona, timeframe) => {
    // Categories to generate tastes for
    const categories = ['Music', 'Literature', 'Food', 'Fashion'];
    
    // Taste evolution patterns by persona type and timeframe
    const evolutionPatterns = {
      // Urban Bohemian Explorer patterns
      1: {
        Music: {
          short: ['Japanese city pop', 'Ambient jazz', 'Reissued obscure soundtracks'],
          medium: ['Archival reissues', 'Cross-cultural collaborations', 'Experimental electronic'],
          long: ['AI-human collaborations', 'Biomusic', 'Climate-responsive soundscapes']
        },
        Literature: {
          short: ['Climate fiction', 'Translated short stories', 'Zine collections'],
          medium: ['Micro-publishing houses', 'Multimedia storytelling', 'Cultural theory'],
          long: ['Interactive narratives', 'Speculative non-fiction', 'Sensory literature']
        },
        Food: {
          short: ['Regional Chinese cuisine', 'Non-alcoholic craft beverages', 'Hyper-local ingredients'],
          medium: ['Zero-waste cooking', 'Revived historical techniques', 'Functional ingredients'],
          long: ['Bioregional cuisine', 'Climate-adaptive foods', 'Sensory dining experiences']
        },
        Fashion: {
          short: ['Upcycled statement pieces', 'Gender-neutral silhouettes', 'Craft-focused accessories'],
          medium: ['Digital-physical hybrid pieces', 'Biodesigned materials', 'Archive-inspired collections'],
          long: ['Living textiles', 'Climate-responsive design', 'Digital fashion collectibles']
        }
      },
      // Cinematic Minimalist Nomad patterns
      2: {
        Music: {
          short: ['Generative ambient', 'Architectural sound design', 'Recontextualized field recordings'],
          medium: ['AI-composed soundscapes', 'Biofeedback audio', 'Location-responsive playlists'],
          long: ['Neuro-personalized audio', 'Climate data sonification', 'Spatial audio environments']
        },
        Literature: {
          short: ['Systems thinking essays', 'Digital minimalism guides', 'Place-based micro-fiction'],
          medium: ['Augmented reality narratives', 'Philosophy of technology', 'Solarpunk fiction'],
          long: ['Mixed reality storytelling', 'Embodied knowledge systems', 'Speculative design fiction']
        },
        Food: {
          short: ['Adaptogenic formulations', 'Precision nutrition', 'Elevated convenience foods'],
          medium: ['Personalized nutrition systems', 'Bioregional meal services', 'Functional food design'],
          long: ['Closed-loop nutrition systems', 'Biodesigned proteins', 'Climate-resilient ingredients']
        },
        Fashion: {
          short: ['Climate-adaptive textiles', 'Modular design systems', 'Digital-physical wearables'],
          medium: ['Biometric-responsive garments', 'Digital twin wardrobes', 'Climate-specific systems'],
          long: ['Self-repairing textiles', 'Environmental data-responsive design', 'Circular ownership models']
        }
      },
      // Folklore + Forest Lover patterns
      3: {
        Music: {
          short: ['Contemporary folk fusion', 'Bioregional sound art', 'Reinterpreted traditional music'],
          medium: ['Ecological sound art', 'Community singing traditions', 'Plant-based instrument making'],
          long: ['Interspecies collaborations', 'Climate adaptation soundscapes', 'Bioregional sound archives']
        },
        Literature: {
          short: ['New nature writing', 'Bioregional poetry', 'Traditional craft revival guides'],
          medium: ['Bioregional almanacs', 'Climate adaptation stories', 'Traditional ecological knowledge'],
          long: ['More-than-human narratives', 'Future folklore creation', 'Regenerative knowledge systems']
        },
        Food: {
          short: ['Heritage grain baking', 'Wild food preservation', 'Seasonal ritual foods'],
          medium: ['Perennial agriculture', 'Community food systems', 'Seasonal celebration foods'],
          long: ['Food sovereignty systems', 'Climate-resilient cuisines', 'Multispecies food forests']
        },
        Fashion: {
          short: ['Biolocal dyes', 'Mended aesthetic', 'Weather-adaptive natural materials'],
          medium: ['Community fiber systems', 'Regenerative material sourcing', 'Adaptive reuse design'],
          long: ['Hyperlocal material systems', 'Regenerative design collectives', 'Adaptive reuse networks']
        }
      }
    };
    
    // Behavior description templates
    const behaviorTemplates = {
      // Urban Bohemian Explorer templates
      1: {
        '3': 'In the next 3 months, the Urban Bohemian Explorer will begin seeking more specialized cultural experiences that blend global influences with local context. They\'ll increasingly value the stories behind products and experiences, gravitating toward creators who can articulate their process and inspiration. Their social media consumption will shift toward more niche content creators and specialized communities rather than mainstream platforms.',
        '6': 'By the 6-month mark, this persona will develop more curatorial tendencies, possibly starting their own small collections or creative projects. They\'ll seek out experiences that blend digital and physical realms in thoughtful ways. Their purchasing decisions will increasingly prioritize items with longevity and cultural significance over novelty. They\'ll begin forming tighter communities around specific cultural niches rather than broader scenes.',
        '12': 'A year from now, the Urban Bohemian Explorer will have evolved into a more active cultural participant rather than just a consumer. They may launch creative side projects, collaborate with like-minded individuals, or create spaces (physical or digital) for cultural exchange. Their interests will increasingly intersect with climate awareness and technological evolution, seeking experiences that thoughtfully address these themes. They\'ll value community and co-creation over individual consumption.'
      },
      // Cinematic Minimalist Nomad templates
      2: {
        '3': 'In the coming months, the Cinematic Minimalist Nomad will further refine their digital-physical balance, seeking tools and experiences that seamlessly integrate both realms. They\'ll increasingly value time and attention as their most precious resources, gravitating toward products and services that respect these values. Their content consumption will become more intentional and curated, possibly utilizing AI tools to filter and personalize their information diet.',
        '6': 'By mid-year, this persona will develop more sophisticated systems for balancing productivity, creativity, and wellbeing. They\'ll be early adopters of tools that help them maintain this balance while traveling or working remotely. Their aesthetic will evolve to incorporate more biodesign elements and adaptive functionality. They\'ll seek deeper connections with fewer, more aligned brands and communities rather than maintaining broader, shallower affiliations.',
        '12': 'A year from now, the Cinematic Minimalist Nomad will have evolved into a more systems-oriented thinker who values regenerative approaches to consumption and creation. They\'ll likely participate in decentralized communities focused on reimagining work, travel, and creative production. Their purchasing decisions will prioritize products designed for circularity, adaptability, and minimal environmental impact. They may become more involved in creating or advocating for new models of living that balance global connectivity with local resilience.'
      },
      // Folklore + Forest Lover templates
      3: {
        '3': 'In the next few months, the Folklore + Forest Lover will deepen their connection to place-based practices and seasonal rhythms. They\'ll seek out more specific knowledge about local ecology and traditional practices relevant to their bioregion. Their content consumption will shift toward skill-building resources and community knowledge-sharing rather than aspirational content. They\'ll begin documenting their own experiences and experiments with traditional crafts and natural processes.',
        '6': 'By mid-year, this persona will become more community-oriented, seeking or creating local groups focused on skill-sharing and collective projects. They\'ll develop a deeper understanding of systems thinking as it applies to ecology and human communities. Their purchasing decisions will increasingly prioritize locally-made items and those with transparent, regenerative supply chains. They may begin teaching or sharing their own developing skills with others.',
        '12': 'A year from now, the Folklore + Forest Lover will have evolved into a more systems-aware practitioner who sees their personal practices as connected to broader ecological and cultural regeneration. They\'ll likely be involved in community projects focused on building resilience and preserving or evolving traditional knowledge. Their relationship with technology will be more intentional, using digital tools to support place-based connections rather than replace them. They may become advocates for bioregional approaches to culture and economy.'
      }
    };
    
    // Map timeframe to pattern type
    const patternType = timeframe === '3' ? 'short' : timeframe === '6' ? 'medium' : 'long';
    
    // Generate emerging tastes
    const emergingTastes = categories.map(category => {
      return {
        category,
        items: evolutionPatterns[persona.id][category][patternType]
      };
    });
    
    // Get behavior description
    const behaviorDescription = behaviorTemplates[persona.id][timeframe];
    
    return {
      emergingTastes,
      behaviorDescription
    };
  };

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
    setSimulationResults(null);
  };

  const handleSimulate = () => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Generate dynamic taste evolution based on selected persona and timeframe
      const results = generateTasteEvolution(selectedPersona, timeframe);
      setSimulationResults(results);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="persona-growth-simulator">
      <div className="simulator-header">
        <h2>Persona Growth Simulator</h2>
        <p>Model how customer personas evolve over time based on taste transitions</p>
      </div>
      
      <div className="simulator-content">
        <div className="persona-selection">
          <h3>Select a Persona</h3>
          <div className="personas-grid">
            {personas.map(persona => (
              <div 
                key={persona.id} 
                className={`persona-card ${selectedPersona?.id === persona.id ? 'selected' : ''}`}
                onClick={() => handlePersonaSelect(persona)}
              >
                <div className="persona-image">
                  <img src={persona.image} alt={persona.name} />
                </div>
                <div className="persona-info">
                  <h4>{persona.name}</h4>
                  <p>{persona.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {selectedPersona && (
          <div className="current-tastes">
            <h3>Current Taste Profile</h3>
            <div className="taste-categories">
              {selectedPersona.currentTastes.map((category, index) => (
                <div key={index} className="taste-category">
                  <h4>{category.category}</h4>
                  <ul>
                    {category.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="simulation-controls">
              <div className="timeframe-selection">
                <h3>Project Growth Over</h3>
                <div className="timeframe-options">
                  <button 
                    className={timeframe === '3' ? 'active' : ''}
                    onClick={() => setTimeframe('3')}
                  >
                    3 Months
                  </button>
                  <button 
                    className={timeframe === '6' ? 'active' : ''}
                    onClick={() => setTimeframe('6')}
                  >
                    6 Months
                  </button>
                  <button 
                    className={timeframe === '12' ? 'active' : ''}
                    onClick={() => setTimeframe('12')}
                  >
                    12 Months
                  </button>
                </div>
              </div>
              
              <button 
                className="simulate-button"
                onClick={handleSimulate}
              >
                Simulate Growth
              </button>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-indicator">
            <p>Analyzing taste transitions...</p>
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {simulationResults && (
          <div className="simulation-results">
            <h3>Projected Taste Evolution in {timeframe} Months</h3>
            
            <div className="emerging-tastes">
              <h4>Emerging Tastes</h4>
              <div className="taste-categories">
                {simulationResults.emergingTastes.map((category, index) => (
                  <div key={index} className="taste-category emerging">
                    <h5>{category.category}</h5>
                    <ul>
                      {category.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="behavior-projection">
              <h4>Projected Behavior</h4>
              <p>{simulationResults.behaviorDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaGrowthSimulator;
