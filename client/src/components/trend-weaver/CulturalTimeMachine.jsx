import React, { useState } from 'react';

const CulturalTimeMachine = () => {
  const [selectedTaste, setSelectedTaste] = useState('');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [timelineData, setTimelineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customTaste, setCustomTaste] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Sample taste options
  const tasteOptions = [
    { id: 'nostalgic-cartoons', name: 'Nostalgic Cartoons' },
    { id: 'wellness-practices', name: 'Wellness Practices' },
    { id: 'sustainable-fashion', name: 'Sustainable Fashion' },
    { id: 'plant-based-eating', name: 'Plant-Based Eating' },
    { id: 'remote-work', name: 'Remote Work Culture' },
    { id: 'custom', name: 'Custom Taste...' }
  ];

  // Available years for the timeline
  const yearOptions = [
    { value: 2005, label: '2005 (Past)' },
    { value: 2015, label: '2015 (Recent Past)' },
    { value: 2025, label: 'Present (2025)' },
    { value: 2030, label: '2030 (Near Future)' }
  ];

  // Dynamic timeline data generator
  const generateTimelineData = (taste, year) => {
    // Base characteristics by time period
    const timeCharacteristics = {
      2005: {
        tech: ['Early social media adoption', 'DVD collections', 'Digital cameras', 'iPods', 'Flip phones'],
        media: ['Cable TV dominance', 'Physical media collections', 'Blockbuster video rentals', 'Print magazines', 'Early blogs'],
        social: ['Online forums', 'Email communication', 'In-person shopping', 'Traditional advertising', 'Limited e-commerce'],
        values: ['Privacy not yet a concern', 'Digital divide awareness', 'Early sustainability movement', 'Pre-smartphone life', 'Local community focus']
      },
      2015: {
        tech: ['Smartphone ubiquity', 'Streaming services', 'Social media maturity', 'Wearable technology', 'Cloud storage'],
        media: ['Streaming beginning to dominate', 'Social content creation', 'Mobile-first design', 'Influencer emergence', 'Subscription models'],
        social: ['Digital-first communication', 'Online shopping normalized', 'Remote work beginning', 'Dating apps mainstream', 'Digital payments'],
        values: ['Work-life balance discussions', 'Early cancel culture', 'Sharing economy', 'Digital minimalism', 'Experience over ownership']
      },
      2025: {
        tech: ['AI integration', 'Spatial computing', 'Digital twins', 'Ambient intelligence', 'Biointerfaces'],
        media: ['Personalized content ecosystems', 'Creator economy maturity', 'Immersive storytelling', 'Algorithm curation', 'Multi-sensory media'],
        social: ['Digital-physical hybrid experiences', 'Virtual communities', 'Flexible work norms', 'Digital identity management', 'Automated services'],
        values: ['Digital wellbeing', 'Climate adaptation', 'Inclusive design', 'Data sovereignty', 'Regenerative practices']
      },
      2030: {
        tech: ['Brain-computer interfaces', 'Ambient computing environments', 'Advanced biodesign', 'Climate tech integration', 'Quantum applications'],
        media: ['Fully immersive experiences', 'AI-human collaborative creation', 'Sensory-complete media', 'Decentralized platforms', 'Neuroadaptive content'],
        social: ['Post-smartphone interaction', 'Fluid physical-digital reality', 'Distributed living arrangements', 'Automated coordination', 'New work paradigms'],
        values: ['Regenerative systems', 'Post-scarcity mindsets', 'Interspecies ethics', 'Climate resilience', 'Collective intelligence']
      }
    };
    
    // Taste-specific characteristics
    const tasteCharacteristics = {
      'nostalgic-cartoons': {
        2005: ['DVD box sets of classic series', 'Adult Swim gaining popularity', 'Internet forums for fans', 'Limited merchandise', 'Ironic appreciation'],
        2015: ['Streaming revivals', 'Reboots for millennial parents', 'Social media communities', 'High-end collectibles', 'Original creator returns'],
        2025: ['AI-enhanced remasters', 'Cross-generational viewing', 'Immersive environments', 'Creator-owned reboots', 'Comfort content positioning'],
        2030: ['Personalized nostalgia experiences', 'Interactive narrative extensions', 'Biodesigned environments', 'Therapeutic applications', 'Era-blending content']
      },
      'wellness-practices': {
        2005: ['Yoga becoming mainstream', 'Early meditation apps', 'Organic food movement', 'Traditional spa experiences', 'Work-life balance discussions'],
        2015: ['Wearable fitness trackers', 'Mindfulness movement', 'Clean eating trends', 'Boutique fitness studios', 'Wellness tourism'],
        2025: ['Biomonitoring integration', 'Mental health technology', 'Personalized nutrition', 'Community wellness hubs', 'Nature prescription programs'],
        2030: ['Neuroadaptive wellness', 'Environmental health integration', 'Collective wellbeing metrics', 'Regenerative practices', 'Interspecies wellness']
      },
      'sustainable-fashion': {
        2005: ['Organic cotton basics', 'Early fair trade programs', 'Hemp experimentation', 'Small eco-boutiques', 'Designer upcycling projects'],
        2015: ['Fast fashion greenwashing', 'Material innovation', 'Transparency marketing', 'Celebrity sustainable brands', 'Digital secondhand platforms'],
        2025: ['Circular design standards', 'Digital product passports', 'Rental subscription models', 'Biodesigned materials', 'Repair as luxury'],
        2030: ['Fully traceable supply chains', 'Programmable materials', 'Personalized production', 'Regenerative business models', 'Environmental remediation textiles']
      },
      'plant-based-eating': {
        2005: ['Vegetarian restaurants', 'Soy-based alternatives', 'Health food stores', 'Animal welfare focus', 'Limited mainstream options'],
        2015: ['Plant-based burgers', 'Milk alternatives proliferation', 'Fast-casual vegan chains', 'Instagram food culture', 'Celebrity endorsements'],
        2025: ['Precision fermentation foods', 'Biodesigned proteins', 'Hyperlocal plant systems', 'Climate impact labeling', 'Personalized nutrition'],
        2030: ['Cellular agriculture integration', 'Automated food production', 'Carbon-negative ingredients', 'Post-animal bioeconomy', 'Food system redesign']
      },
      'remote-work': {
        2005: ['Early telecommuting policies', 'Home office setups', 'Conference calls', 'Work-life separation', 'Limited collaboration tools'],
        2015: ['Digital nomad movement', 'Coworking spaces', 'Cloud collaboration tools', 'Remote team management', 'Work-from-home policies'],
        2025: ['Hybrid work optimization', 'Virtual headquarters', 'Four-day workweeks', 'Productivity measurement evolution', 'Distributed team culture'],
        2030: ['Post-geographic organizations', 'Immersive collaboration', 'AI workforce integration', 'Universal basic services', 'New work paradigms']
      }
    };
    
    // Connected trends by time period
    const connectedTrends = {
      2005: {
        'nostalgic-cartoons': ['Early viral internet memes', 'DVD collector culture', 'College humor websites', 'Indie comic conventions', 'Retro gaming communities'],
        'wellness-practices': ['Organic food movement', 'Alternative medicine interest', 'Work-life balance discussions', 'Early lifestyle blogs', 'Yoga studio proliferation'],
        'sustainable-fashion': ['Organic food movement', 'Anti-globalization activism', 'DIY craft revival', 'Early ethical consumption', 'Independent boutique culture'],
        'plant-based-eating': ['Environmental documentaries', 'Health food stores', 'Organic farming movement', 'Animal rights activism', 'Alternative medicine'],
        'remote-work': ['Early blogging platforms', 'Digital camera adoption', 'Home office equipment', 'Work-life balance discussions', 'Telecommuting policies']
      },
      2015: {
        'nostalgic-cartoons': ['Crowdfunded revivals', 'Pop culture conventions', 'Subscription box services', 'Millennial parenting', 'Digital streaming platforms'],
        'wellness-practices': ['Athleisure fashion', 'Subscription box services', 'Clean eating movement', 'Mindfulness apps', 'Boutique fitness studios'],
        'sustainable-fashion': ['Sharing economy platforms', 'Minimalism and decluttering', 'Social media activism', 'Clean beauty movement', 'Direct-to-consumer models'],
        'plant-based-eating': ['Food delivery apps', 'Instagram food culture', 'Wellness influencers', 'Climate awareness', 'Meal kit services'],
        'remote-work': ['Digital nomad movement', 'Coworking spaces', 'Productivity apps', 'Cloud services', 'Gig economy platforms']
      },
      2025: {
        'nostalgic-cartoons': ['Digital wellness practices', 'Multi-generational media', 'Creator economy platforms', 'Virtual collectibles', 'Emotional design'],
        'wellness-practices': ['Biomonitoring wearables', 'Climate adaptation', 'Community health hubs', 'Nature connection technology', 'Mental health platforms'],
        'sustainable-fashion': ['Carbon footprint tracking', 'Biodesign across industries', 'Digital ownership verification', 'Hyperlocal manufacturing', 'Climate adaptation products'],
        'plant-based-eating': ['Precision fermentation', 'Climate impact labeling', 'Vertical farming', 'Personalized nutrition', 'Food waste upcycling'],
        'remote-work': ['Virtual reality offices', 'Four-day workweek', 'Digital wellness tools', 'Hybrid-first venues', 'Distributed living communities']
      },
      2030: {
        'nostalgic-cartoons': ['Therapeutic media prescriptions', 'Biodesigned environments', 'AI-collaborative creation', 'Memory augmentation', 'Intergenerational design'],
        'wellness-practices': ['Neuroadaptive environments', 'Climate resilience communities', 'Interspecies connection', 'Regenerative health systems', 'Collective wellbeing metrics'],
        'sustainable-fashion': ['Regenerative economics', 'Climate positive certification', 'Adaptive environments', 'Distributed manufacturing', 'Post-ownership models'],
        'plant-based-eating': ['Cellular agriculture', 'Automated food systems', 'Carbon-negative production', 'Bioregional food networks', 'Post-scarcity distribution'],
        'remote-work': ['Post-geographic organizations', 'Universal basic services', 'AI collaboration systems', 'Climate-adaptive work patterns', 'New economic paradigms']
      }
    };
    
    // Cultural context templates
    const contextTemplates = {
      'nostalgic-cartoons': {
        2005: 'In 2005, nostalgic cartoons were primarily consumed through DVD box sets and late-night cable programming blocks. The audience was mainly college students and young adults who grew up with 80s and 90s animation. Nostalgia was treated somewhat ironically, with a focus on rediscovering the "cheesiness" of older content. Adult Swim was establishing a new model for adult-oriented animation that referenced nostalgic properties.',
        2015: 'By 2015, streaming platforms had transformed nostalgic cartoon consumption, making entire series easily accessible. This period saw the beginning of the reboot trend, with studios reviving properties from the 80s and 90s with both original audiences and their children in mind. Nostalgia became a major marketing strategy across media. The rise of social media allowed fan communities to organize and advocate for revivals of canceled shows.',
        2025: 'In 2025, nostalgic cartoons have evolved into a sophisticated market spanning multiple generations. AI-enhanced remasters have given new life to classic content, while VR and AR technologies create immersive nostalgic environments. The emotional wellness aspect of nostalgia is now explicitly recognized, with cartoon content often marketed as "comfort viewing" during uncertain times. Multiple generations now share nostalgic experiences, with Gen Z feeling nostalgia for early 2000s content while their parents connect with 80s-90s properties.',
        2030: 'By 2030, nostalgic cartoon experiences will likely become highly personalized through advanced AI that can generate content matching individual nostalgic preferences. The line between viewer and creator will blur as interactive technologies allow fans to extend narratives of beloved properties. Nostalgia will be increasingly recognized for its therapeutic benefits, with some healthcare providers "prescribing" specific nostalgic content for emotional wellness. Physical spaces designed to evoke cartoon worlds will become more sophisticated through biodesign and advanced materials.'
      },
      'wellness-practices': {
        2005: 'In 2005, wellness practices were beginning to enter the mainstream but remained somewhat compartmentalized from everyday life. Yoga studios were becoming common in urban areas, and meditation was gaining scientific recognition, but these practices were still often viewed as alternative or spiritual rather than essential components of health. Work-life balance was emerging as a concept, but workplace wellness programs were limited. Digital wellness tools were in their infancy, with basic meditation timers and fitness tracking.',
        2015: 'By 2015, wellness had evolved into a significant lifestyle category and market force. Wearable technology was tracking steps and sleep, mindfulness apps had millions of users, and boutique fitness studios were expanding rapidly in urban centers. Social media was amplifying wellness trends, from clean eating to high-intensity workouts. Wellness tourism was growing as a category, with retreats and destinations focused on health and rejuvenation. Corporate wellness programs were becoming more common, though often focused on physical health metrics rather than holistic wellbeing.',
        2025: 'In 2025, wellness has become deeply integrated into daily life and systems rather than a separate category. Biomonitoring provides continuous health data that connects to environmental conditions and social contexts. Mental health technology has evolved beyond meditation apps to more sophisticated tools for emotional regulation and connection. Community wellness hubs combine physical spaces with digital platforms to support collective wellbeing. Nature prescription programs have become standard in healthcare, recognizing the essential role of environmental connection in human health.',
        2030: 'By 2030, wellness practices will likely evolve beyond individual health to encompass environmental and collective wellbeing. Neuroadaptive environments will respond to human states and needs without requiring conscious tracking or management. The connection between human health and environmental health will be embedded in everyday systems and policies. Wellness metrics will increasingly focus on collective and community wellbeing rather than just individual health markers. Interspecies wellness—recognizing the interconnection between human health and the wellbeing of other species—will become a more mainstream concept.'
      },
      'sustainable-fashion': {
        2005: 'In 2005, sustainable fashion existed primarily as a niche market with limited mainstream visibility. The focus was largely on natural materials and fair trade practices, with little attention to broader systemic issues in the fashion industry. Sustainable options were often characterized by a distinct "eco" aesthetic that prioritized environmental messaging over contemporary design. The movement was largely driven by small independent brands and boutiques in progressive urban centers.',
        2015: 'By 2015, sustainable fashion had gained significant visibility, though it remained challenged by the dominance of fast fashion. This period saw the rise of "conscious collections" from major retailers, often criticized as greenwashing. At the same time, genuine innovation in materials and business models was accelerating. Digital platforms for second-hand clothing were transforming the resale market. Transparency was becoming a key differentiator for brands, with early blockchain and QR code tracking of supply chains.',
        2025: 'In 2025, sustainable fashion has moved from niche to norm, with regulatory frameworks in major markets requiring extended producer responsibility. Digital product passports tracking the environmental and social impact of garments have become standard. The ownership model has shifted significantly, with rental and subscription services dominating certain product categories. Biodesigned materials created through fermentation and lab processes are scaling to commercial viability. The repair and maintenance of quality items has been reframed as a premium service, with luxury brands offering lifetime care programs.',
        2030: 'By 2030, sustainable fashion will likely evolve beyond "doing less harm" to actively regenerating environmental and social systems. Advanced tracking technologies will enable full transparency across global supply networks. Programmable and adaptive materials will reduce waste by allowing garments to evolve with user needs and trends. On-demand personalized production will become economically viable at scale through advanced manufacturing technologies. Leading brands will operate on regenerative business models that measure success by positive impact rather than just profit. Some innovative textiles will be designed to actively remediate environmental damage through properties like carbon sequestration or water purification.'
      },
      'plant-based-eating': {
        2005: 'In 2005, plant-based eating was still largely synonymous with vegetarianism and veganism, often motivated by animal welfare concerns rather than environmental or mainstream health considerations. Meat and dairy alternatives were limited, with soy-based products dominating the market but often criticized for taste and texture. Plant-based options in restaurants were typically limited to one or two menu items. The movement was supported by a network of health food stores and vegetarian restaurants in urban areas, but had limited visibility in mainstream food culture.',
        2015: 'By 2015, plant-based eating was gaining significant momentum through improved products and broader cultural visibility. Plant-based burgers engineered to closely mimic meat were entering the market. Alternative milks had proliferated beyond soy to include almond, coconut, and other varieties. Fast-casual vegan chains were expanding in urban areas. Instagram food culture was elevating the visual appeal of plant-based dishes. Environmental documentaries were connecting food choices to climate impact for mainstream audiences. Celebrity endorsements were helping normalize plant-based diets.',
        2025: 'In 2025, plant-based eating has evolved beyond a dietary choice to become integrated with broader systems change. Precision fermentation has created animal protein alternatives indistinguishable from conventional products. Biodesigned proteins offer novel nutritional profiles rather than just mimicking animal products. Hyperlocal plant growing systems in urban environments connect consumers directly to production. Climate impact labeling on food products has made environmental considerations a standard part of food choices. Personalized nutrition has helped optimize plant-based diets for individual health needs.',
        2030: 'By 2030, plant-based eating will likely evolve in tandem with broader food system transformation. Cellular agriculture will complement plant-based approaches, with hybrid products combining cultivated animal cells with plant ingredients. Automated food production systems will make sophisticated plant-based cooking accessible to more people. Carbon-negative ingredients will become a selling point as climate priorities intensify. The post-animal bioeconomy will create new categories of foods beyond traditional plant vs. animal distinctions. Food system redesign will focus on resilience, regeneration, and equitable access rather than just substituting plant ingredients for animal ones.'
      },
      'remote-work': {
        2005: 'In 2005, remote work was still considered an exception rather than a norm, often limited to specific roles like sales or certain days of the week. Technology supported basic remote functions through email, conference calls, and early VPNs, but collaboration tools were limited. Home office setups typically mimicked traditional offices rather than being designed for the home environment. Work and personal life were generally kept separate, with remote work seen as a compromise rather than a preference. Digital connectivity was sufficient for basic tasks but often frustrating for more complex collaboration.',
        2015: 'By 2015, remote work was gaining momentum through improved technology and changing cultural attitudes. The digital nomad movement was celebrating location independence, while coworking spaces were creating new types of professional communities. Cloud-based collaboration tools were making remote teamwork more viable. Companies were developing more formal remote team management practices and work-from-home policies. The conversation was shifting from whether remote work was possible to how to optimize it for different contexts. Mobile technology was enabling work from more locations, though often creating expectations of constant availability.',
        2025: 'In 2025, remote work has evolved into sophisticated hybrid models that optimize for both flexibility and connection. Virtual headquarters provide persistent digital spaces for teams, while physical offices have been redesigned as collaboration hubs rather than daily workplaces. Four-day workweeks have become common, recognizing that remote work often involves more focused productivity. Productivity measurement has evolved beyond hours worked to focus on outcomes and wellbeing. Distributed team culture has developed its own norms, rituals, and best practices distinct from traditional office culture.',
        2030: 'By 2030, remote work will likely evolve beyond current paradigms as part of broader changes to work itself. ' +
          'Post-geographic organizations will operate across time zones and cultures with new coordination mechanisms. ' +
          'Immersive collaboration technologies will create presence and connection without physical proximity. ' +
          'AI workforce integration will automate routine tasks while elevating human creative and relational work. ' +
          'Universal basic services may provide essential needs, changing the relationship between work and survival. ' +
          'New work paradigms will emerge that don\'t fit traditional employment categories, blending learning, creation, care, and problem-solving in new ways.'
      }
    };
    
    // Generate for custom taste if selected
    if (taste === 'custom') {
      // Create a function to generate characteristics based on the custom taste
      const generateCustomCharacteristics = (taste, year) => {
        // Use the custom taste name to seed a pseudo-random selection
        const seed = taste.length;
        
        // Select base characteristics from the time period
        const baseChars = timeCharacteristics[year];
        const selectedChars = [];
        
        // Select one item from each category
        for (const category in baseChars) {
          const items = baseChars[category];
          const index = (seed + category.length) % items.length;
          selectedChars.push(items[index]);
        }
        
        // Add a custom characteristic based on the taste name
        const customChar = `${taste}-focused communities`;
        selectedChars.push(customChar);
        
        return selectedChars;
      };
      
      // Generate connected trends for custom taste
      const generateCustomTrends = (taste, year) => {
        // Use all available trends for that year and select a subset
        const allTrends = [];
        for (const tasteKey in connectedTrends[year]) {
          allTrends.push(...connectedTrends[year][tasteKey]);
        }
        
        // Remove duplicates
        const uniqueTrends = [...new Set(allTrends)];
        
        // Select 5 trends based on the taste name as seed
        const seed = taste.length;
        const selectedTrends = [];
        for (let i = 0; i < 5; i++) {
          const index = (seed + i) % uniqueTrends.length;
          selectedTrends.push(uniqueTrends[index]);
        }
        
        // Add a custom trend based on the taste name
        const customTrend = `${taste} innovation`;
        selectedTrends.push(customTrend);
        
        return selectedTrends;
      };
      
      // Generate context for custom taste
      const generateCustomContext = (taste, year) => {
        const yearDescriptions = {
          2005: `In 2005, ${taste} was in its early stages of development, primarily adopted by enthusiasts and early innovators. Limited technology and infrastructure supported this interest, with most activity happening in specialized communities and forums. Mainstream awareness was minimal, with little commercial or cultural impact beyond niche groups.`,
          2015: `By 2015, ${taste} had gained significant visibility through social media and digital platforms. Improved technology and growing cultural interest created new opportunities for engagement and expression. Commercial interests were beginning to recognize the market potential, while communities were becoming more organized and influential in shaping the evolution of this cultural domain.`,
          2025: `In 2025, ${taste} has become integrated into broader cultural and technological systems. Advanced tools and platforms have transformed how people engage with and express this interest. The boundaries between this domain and others have blurred, creating rich cross-pollination of ideas and practices. Both individual expression and community connection have evolved in sophisticated ways.`,
          2030: `By 2030, ${taste} will likely evolve beyond current paradigms as part of broader technological and cultural transformation. Immersive and adaptive experiences will create new forms of engagement and expression. The distinction between creator and audience will continue to blur, with participatory models becoming dominant. This domain will increasingly connect to larger systems of meaning, identity, and social organization.`
        };
        
        return yearDescriptions[year];
      };
      
      return {
        keyCharacteristics: generateCustomCharacteristics(customTaste, year),
        culturalContext: generateCustomContext(customTaste, year),
        connectedTrends: generateCustomTrends(customTaste, year)
      };
    }
    
    // Return data for predefined tastes
    if (tasteCharacteristics[taste] && tasteCharacteristics[taste][year]) {
      return {
        keyCharacteristics: tasteCharacteristics[taste][year],
        culturalContext: contextTemplates[taste][year],
        connectedTrends: connectedTrends[year][taste]
      };
    }
    
    // Fallback for unknown combinations
    return {
      keyCharacteristics: [
        'Characteristic 1 for this time period',
        'Characteristic 2 for this time period',
        'Characteristic 3 for this time period',
        'Characteristic 4 for this time period',
        'Characteristic 5 for this time period'
      ],
      culturalContext: `This is a generated analysis of ${taste} in ${year}. The cultural context would describe how this taste or trend manifested during this specific time period, including key influencers, market dynamics, and social factors that shaped its expression.`,
      connectedTrends: [
        'Connected trend 1',
        'Connected trend 2',
        'Connected trend 3',
        'Connected trend 4',
        'Connected trend 5'
      ]
    };
  };

  const handleTasteSelect = (tasteId) => {
    if (tasteId === 'custom') {
      setShowCustomInput(true);
      setSelectedTaste('');
    } else {
      setShowCustomInput(false);
      setSelectedTaste(tasteId);
    }
  };

  const handleCustomTasteSubmit = () => {
    if (customTaste.trim()) {
      setSelectedTaste('custom');
      setShowCustomInput(false);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleTimeline = () => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Generate dynamic timeline data based on selected taste and year
      const tasteToUse = selectedTaste === 'custom' ? customTaste : selectedTaste;
      const data = generateTimelineData(tasteToUse, selectedYear);
      
      setTimelineData({
        [selectedYear]: data
      });
      
      setIsLoading(false);
    }, 1500);
  };

  // Get the display name for the selected taste
  const getSelectedTasteName = () => {
    if (selectedTaste === 'custom') {
      return customTaste;
    } else {
      const option = tasteOptions.find(option => option.id === selectedTaste);
      return option ? option.name : '';
    }
  };

  return (
    <div className="cultural-time-machine">
      <div className="time-machine-header">
        <h2>Cultural Time Machine</h2>
        <p>Rewind or fast-forward cultural trends to understand context and make predictions</p>
      </div>
      
      <div className="time-machine-controls">
        <div className="taste-selection">
          <h3>Select a Cultural Taste</h3>
          <div className="taste-options">
            {tasteOptions.map(option => (
              <button
                key={option.id}
                className={`taste-option ${selectedTaste === option.id ? 'selected' : ''}`}
                onClick={() => handleTasteSelect(option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>
          
          {showCustomInput && (
            <div className="custom-taste-input">
              <input
                type="text"
                placeholder="Enter a cultural taste or trend..."
                value={customTaste}
                onChange={(e) => setCustomTaste(e.target.value)}
              />
              <button 
                onClick={handleCustomTasteSubmit}
                disabled={!customTaste.trim()}
              >
                Set
              </button>
            </div>
          )}
        </div>
        
        {selectedTaste && (
          <div className="year-selection">
            <h3>Select a Year</h3>
            <div className="year-slider-container">
              <input
                type="range"
                min="2005"
                max="2030"
                step="5"
                value={selectedYear}
                onChange={handleYearChange}
                className="year-slider"
              />
              <div className="year-markers">
                {yearOptions.map(year => (
                  <span 
                    key={year.value} 
                    className={`year-marker ${selectedYear === year.value ? 'active' : ''}`}
                    style={{ left: `${((year.value - 2005) / 25) * 100}%` }}
                  >
                    {year.label}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              className="timeline-button"
              onClick={handleTimeline}
            >
              Travel to {selectedYear}
            </button>
          </div>
        )}
      </div>
      
      {isLoading && (
        <div className="loading-indicator">
          <p>Traveling through time...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {timelineData && (
        <div className="timeline-results">
          <h3>{getSelectedTasteName()} in {selectedYear}</h3>
          
          <div className="timeline-content">
            <div className="characteristics-section">
              <h4>Key Characteristics</h4>
              <ul>
                {timelineData[selectedYear].keyCharacteristics.map((characteristic, index) => (
                  <li key={index}>{characteristic}</li>
                ))}
              </ul>
            </div>
            
            <div className="context-section">
              <h4>Cultural Context</h4>
              <p>{timelineData[selectedYear].culturalContext}</p>
            </div>
            
            <div className="connected-trends">
              <h4>Connected Trends</h4>
              <div className="trends-list">
                {timelineData[selectedYear].connectedTrends.map((trend, index) => (
                  <span key={index} className="trend-tag">{trend}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalTimeMachine;
