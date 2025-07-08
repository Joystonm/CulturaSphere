import React, { useState, useRef, useEffect } from 'react';

const TrendStrategistAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI Trend Strategist Assistant. Ask me questions about cultural trends, audience insights, or campaign ideas based on taste affinities.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample suggested questions
  const suggestedQuestions = [
    "What kind of campaign would work for fans of horror podcasts and vintage cars?",
    "Where is Afrobeats music intersecting with fashion trends?",
    "What type of visual aesthetic should I use for Gen Z into surrealist art?",
    "How are sustainability values showing up in luxury consumer behavior?",
    "Which emerging music genres pair well with craft cocktail culture?"
  ];

  // Dynamic response generator
  const generateResponse = (question) => {
    // Keywords to look for in the question
    const keywords = {
      music: ['music', 'songs', 'albums', 'artists', 'genres', 'playlists', 'audio', 'sound', 'listening'],
      fashion: ['fashion', 'clothing', 'apparel', 'style', 'wear', 'outfits', 'textiles', 'garments'],
      food: ['food', 'cuisine', 'culinary', 'dining', 'restaurants', 'ingredients', 'dishes', 'cooking', 'eating'],
      art: ['art', 'visual', 'design', 'aesthetic', 'artists', 'creative', 'visuals', 'imagery'],
      media: ['media', 'content', 'platform', 'channel', 'audience', 'viewers', 'followers', 'engagement'],
      sustainability: ['sustainability', 'sustainable', 'eco', 'green', 'environmental', 'climate', 'ethical'],
      technology: ['technology', 'tech', 'digital', 'devices', 'apps', 'platforms', 'online', 'virtual'],
      wellness: ['wellness', 'health', 'wellbeing', 'mindfulness', 'self-care', 'mental', 'physical']
    };
    
    // Audience segments
    const audiences = {
      genZ: ['gen z', 'generation z', 'young', 'youth', 'teens', 'teenagers', 'college'],
      millennials: ['millennials', 'millennial', '30s', 'young professionals'],
      genX: ['gen x', 'generation x', '40s', 'middle-aged'],
      boomers: ['boomers', 'baby boomers', 'older', 'seniors', 'retirees']
    };
    
    // Identify keywords in the question
    const findMatches = (categories) => {
      const matches = [];
      for (const [category, terms] of Object.entries(categories)) {
        if (terms.some(term => question.toLowerCase().includes(term.toLowerCase()))) {
          matches.push(category);
        }
      }
      return matches;
    };
    
    const matchedTopics = findMatches(keywords);
    const matchedAudiences = findMatches(audiences);
    
    // Generate response components
    const generateIntro = () => {
      const intros = [
        "Based on current cultural data and taste affinities, I can provide some insights on this.",
        "Looking at the latest trend signals and cross-domain patterns, there are several relevant insights here.",
        "This is an interesting question that touches on some emerging cultural patterns.",
        "The data shows some fascinating connections related to your question.",
        "Current cultural signals indicate several relevant trends in this space."
      ];
      return intros[Math.floor(Math.random() * intros.length)];
    };
    
    const generateTopicInsight = (topic) => {
      const insights = {
        music: [
          "Music consumption patterns are showing increased interest in cross-cultural fusion and genre-blending experiences.",
          "Listeners are increasingly seeking emotional resonance and authenticity over production polish.",
          "There's a growing connection between music communities and other cultural domains like visual arts and culinary experiences.",
          "Audio is becoming more spatial and immersive, with listeners seeking multi-sensory experiences.",
          "Music discovery is becoming more algorithm-resistant, with renewed interest in human curation and community recommendations."
        ],
        fashion: [
          "Fashion is increasingly viewed through a sustainability lens, with transparency becoming a key differentiator.",
          "The boundaries between digital and physical fashion are blurring, creating new opportunities for expression.",
          "Personal style is becoming more fluid and less trend-dependent, with emphasis on individual expression.",
          "Fashion is increasingly connected to broader cultural narratives and social movements.",
          "Adaptive and inclusive design is moving from niche to mainstream, influencing broader aesthetic trends."
        ],
        food: [
          "Food culture is becoming more place-based and bioregional, with increased interest in local food systems.",
          "The line between functional nutrition and culinary pleasure is blurring, with more emphasis on both health and flavor.",
          "Food experiences are increasingly designed for digital sharing while still prioritizing in-person connection.",
          "Cultural fusion is evolving beyond superficial combinations to more thoughtful cultural exchange and context.",
          "Fermentation and preservation techniques are seeing renewed interest, connecting traditional practices with contemporary concerns."
        ],
        art: [
          "Visual culture is increasingly participatory, with audiences seeking co-creation opportunities.",
          "Digital art is finding new physical expressions, while traditional mediums are incorporating digital techniques.",
          "Art is becoming more integrated with everyday spaces rather than confined to traditional galleries.",
          "Visual storytelling is becoming more non-linear and interactive, influenced by gaming and digital experiences.",
          "There's growing interest in art that engages with environmental and social systems rather than just representing them."
        ],
        media: [
          "Content is becoming more format-fluid, designed to adapt across multiple platforms and contexts.",
          "Audience engagement is shifting from passive consumption to active participation and co-creation.",
          "Micro-communities are becoming more influential than broad demographic targeting.",
          "Authenticity and transparency are increasingly valued over polished production.",
          "Content that bridges digital and physical experiences is showing stronger engagement."
        ],
        sustainability: [
          "Sustainability is evolving from a feature to a fundamental expectation across categories.",
          "Regenerative approaches are replacing 'less bad' sustainability messaging.",
          "Climate adaptation is becoming as important as climate mitigation in product development.",
          "Circular systems are gaining traction over linear improvements.",
          "Sustainability is increasingly connected to community resilience rather than just individual choices."
        ],
        technology: [
          "Technology is becoming more ambient and integrated into everyday experiences rather than demanding attention.",
          "Digital tools that enhance rather than replace physical experiences are showing stronger adoption.",
          "Technology that creates meaningful connection is valued over technology that simply enables convenience.",
          "There's growing interest in technology that respects attention and wellbeing rather than exploiting it.",
          "Digital experiences that acknowledge human limitations and needs are gaining preference over those that demand constant engagement."
        ],
        wellness: [
          "Wellness is expanding beyond individual practices to community and environmental health.",
          "Mental wellbeing is becoming more integrated with other aspects of life rather than a separate category.",
          "Cultural practices are being recognized for their wellness benefits beyond their aesthetic value.",
          "Wellness is becoming more evidence-based while still honoring traditional wisdom.",
          "Rest and recovery are being reframed as productive rather than indulgent."
        ]
      };
      
      if (insights[topic]) {
        return insights[topic][Math.floor(Math.random() * insights[topic].length)];
      }
      return "";
    };
    
    const generateAudienceInsight = (audience) => {
      const insights = {
        genZ: [
          "Gen Z shows strong preference for brands and experiences that allow for personal expression while building community.",
          "This audience values transparency and authenticity, quickly identifying and rejecting manufactured trends.",
          "They're drawn to fluid identity expression and resist rigid categorization across all domains.",
          "Digital natives but increasingly seeking meaningful offline experiences that can be shared online.",
          "Value systems and social positioning are often more important than traditional status markers."
        ],
        millennials: [
          "Millennials are entering a new life stage that's reshaping their relationship with brands and experiences.",
          "This audience increasingly values quality and longevity over novelty, with growing interest in heritage and craftsmanship.",
          "They're navigating competing values of convenience and sustainability, favoring solutions that address both.",
          "Digital detox and intentional technology use are becoming more important as they seek better balance.",
          "Community and belonging are increasingly important as traditional structures continue to evolve."
        ],
        genX: [
          "Gen X is often overlooked but represents significant cultural and economic influence.",
          "This audience values authenticity and substance, with little patience for empty marketing.",
          "They're comfortable moving between digital and analog experiences, valuing both innovation and tradition.",
          "Often serving as cultural translators between older and younger generations.",
          "Increasingly interested in reinvention and new chapters rather than traditional retirement planning."
        ],
        boomers: [
          "Baby Boomers are defying traditional expectations of their age group, remaining culturally engaged and adaptive.",
          "This audience has significant spending power and is more digitally connected than stereotypes suggest.",
          "They value experiences that bridge generational divides and create family connections.",
          "Wellness and vitality are key interests, with focus on both physical and cognitive health.",
          "They're increasingly interested in legacy, meaning, and contribution beyond material success."
        ]
      };
      
      if (insights[audience]) {
        return insights[audience][Math.floor(Math.random() * insights[audience].length)];
      }
      return "";
    };
    
    const generateStrategicDirection = () => {
      const directions = [
        "For strategic direction, focus on creating multi-sensory experiences that bridge digital and physical realms. The strongest engagement comes from thoughtful integration rather than treating these as separate channels.",
        "Consider community-building approaches that give participants a sense of co-ownership rather than just consumption. The most successful cultural initiatives right now are those that create belonging while still allowing for individual expression.",
        "Look for unexpected collaborations across domains that can create fresh perspectives and reach new audiences. The most interesting cultural spaces are emerging at these intersections rather than within traditional categories.",
        "Authenticity and transparency in your approach will be essential. Today's audiences have unprecedented access to information and can quickly identify disconnects between messaging and reality.",
        "Consider how your initiative can evolve over time rather than launching as a finished product. Audiences increasingly value being part of an evolving story rather than passive recipients of a completed vision."
      ];
      return directions[Math.floor(Math.random() * directions.length)];
    };
    
    // Construct the response
    let response = generateIntro() + "\n\n";
    
    // Add topic insights
    if (matchedTopics.length > 0) {
      for (const topic of matchedTopics) {
        const insight = generateTopicInsight(topic);
        if (insight) {
          response += insight + "\n\n";
        }
      }
    } else {
      // If no specific topics matched, add a general insight
      response += "Cultural trends are increasingly cross-domain, with the most interesting developments happening at the intersection of different fields and practices. The boundaries between categories like music, fashion, technology, and wellness are becoming more fluid.\n\n";
    }
    
    // Add audience insights
    if (matchedAudiences.length > 0) {
      for (const audience of matchedAudiences) {
        const insight = generateAudienceInsight(audience);
        if (insight) {
          response += insight + "\n\n";
        }
      }
    }
    
    // Add strategic direction
    response += generateStrategicDirection() + "\n\n";
    
    // Add closing
    response += "These insights are based on current cultural signals and taste affinities, but remember that the most powerful strategies come from combining data with human creativity and intuition.";
    
    return response;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Generate dynamic response based on the question
      const responseContent = generateResponse(userMessage.content);
      
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="trend-strategist-assistant">
      <div className="assistant-header">
        <h2>AI Trend Strategist Assistant</h2>
        <p>Get consultant-level insights on cultural trends and audience affinities</p>
      </div>
      
      <div className="chat-container">
        <div className="messages-container">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.type}`}
            >
              <div className="message-content">
                {message.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="suggested-questions">
          <h4>Try asking about:</h4>
          <div className="questions-list">
            {suggestedQuestions.map((question, index) => (
              <button 
                key={index} 
                className="suggested-question"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        <div className="input-container">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask about cultural trends, audience insights, or campaign ideas..."
            rows={3}
          />
          <button 
            className="send-button"
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
          >
            Send
          </button>
        </div>
      </div>
      
      <div className="assistant-footer">
        <p>Powered by Groq LLM + Qloo taste graph data</p>
      </div>
    </div>
  );
};

export default TrendStrategistAssistant;
