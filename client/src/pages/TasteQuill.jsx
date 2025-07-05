import React, { useState, useEffect } from 'react';
import { submitTasteQuill } from '../services/api';

const TasteQuill = () => {
  const [tasteSeeds, setTasteSeeds] = useState([]);
  const [seedInput, setSeedInput] = useState('');
  const [storyMode, setStoryMode] = useState('fantasy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [seriesMode, setSeriesMode] = useState(false);
  const [savedStories, setSavedStories] = useState([]);

  const storyModes = [
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'dystopian', name: 'Dystopian' },
    { id: 'satire', name: 'Satire' },
    { id: 'romance', name: 'Romance' },
    { id: 'experimental', name: 'Experimental' }
  ];

  const suggestedSeeds = [
    'Tolkien', 'Cyberpunk', 'Studio Ghibli', 'Greek Mythology', 
    'Jazz Age', 'Film Noir', 'Impressionism', 'Magical Realism',
    'Wes Anderson', 'Haruki Murakami', 'Art Deco', 'Minimalism'
  ];

  const handleSeedInputChange = (e) => {
    setSeedInput(e.target.value);
  };

  const handleSeedInputKeyDown = (e) => {
    if (e.key === 'Enter' && seedInput.trim()) {
      addSeed(seedInput.trim());
      setSeedInput('');
    }
  };

  const addSeed = (seed) => {
    if (!tasteSeeds.includes(seed)) {
      setTasteSeeds([...tasteSeeds, seed]);
    }
  };

  const removeSeed = (seed) => {
    setTasteSeeds(tasteSeeds.filter(s => s !== seed));
  };

  const handleModeChange = (mode) => {
    setStoryMode(mode);
  };

  const handleSeriesModeToggle = () => {
    setSeriesMode(!seriesMode);
  };

  const generateStory = async () => {
    if (tasteSeeds.length === 0) return;
    
    setIsGenerating(true);
    setGeneratedStory(null);
    
    try {
      // This would be replaced with an actual API call
      // const response = await submitTasteQuill({
      //   seeds: tasteSeeds,
      //   mode: storyMode,
      //   seriesMode
      // });
      // setGeneratedStory(response.data);
      
      // Placeholder data for now
      setTimeout(() => {
        const storyData = {
          title: storyMode === 'dystopian' 
            ? "Echoes of the Forgotten Sky" 
            : storyMode === 'fantasy'
            ? "The Crystal Weaver's Journey"
            : storyMode === 'satire'
            ? "The Committee for Appropriate Imagination"
            : storyMode === 'romance'
            ? "Whispers Across Time"
            : "Fragments of Consciousness",
          coverImage: `/path/to/${storyMode}-cover.jpg`,
          content: generatePlaceholderContent(storyMode, tasteSeeds),
          author: "CulturaSphere AI",
          createdAt: new Date().toISOString(),
          seeds: tasteSeeds,
          mode: storyMode
        };
        
        setGeneratedStory(storyData);
        setIsGenerating(false);
      }, 3000);
    } catch (error) {
      console.error('Error generating story:', error);
      setIsGenerating(false);
    }
  };

  const generatePlaceholderContent = (mode, seeds) => {
    // This is just placeholder text - in a real app, this would come from the LLM
    const seedText = seeds.join(', ');
    
    if (mode === 'dystopian') {
      return `The city's neon glow cast long shadows across the crumbling infrastructure, a stark reminder of what once was. Inspired by ${seedText}, this world had become a reflection of humanity's greatest fears and darkest impulses.\n\nAria adjusted her breathing apparatus, the filtered air tasting metallic against her tongue. The Upper Districts would be monitoring this sector tonight—they always did after a Silence Protocol was initiated. She needed to move quickly.\n\n"The archives won't be accessible after midnight," Devon's voice crackled through her implanted comm. "Whatever you're looking for, it better be worth the oxygen rations."\n\nIt was worth everything, she thought, clutching the small data crystal that contained the last uncorrupted memories of the world before. Before the skies turned amber. Before the Corporate Wars. Before humanity fractured into the Elevated and the Forgotten.\n\nThe crystal held the truth about the Collapse, and more importantly, about who engineered it. Knowledge that could finally unite the scattered resistance cells across what remained of the continent.`;
    } else if (mode === 'fantasy') {
      return `The ancient trees of Eldenwood whispered secrets as Thorne made his way along the hidden path, his footsteps leaving no trace upon the moss-covered ground. Drawing inspiration from ${seedText}, the forest seemed alive with magic and mystery.\n\n"The Crystal Heart pulses stronger," murmured Lyra, his fae companion, her wings shimmering with an iridescent light that danced between the shadows. "We must be nearing the Forgotten Temple."\n\nThorne nodded, feeling the weight of the prophecy upon his shoulders. Seven days since the Crimson Moon had appeared in the night sky, seven days since the ancient wards protecting the realm had begun to fail. Whatever slumbered beneath the temple had begun to stir after a thousand years of dormancy.\n\n"Do you think the old stories are true?" he asked, his hand instinctively moving to the hilt of his ancestral blade. "About the Weaver and the tapestry of worlds?"\n\nLyra's expression grew solemn. "All stories contain seeds of truth, Thorne. The question is whether we're prepared to face this particular truth when we find it."`;
    } else if (mode === 'satire') {
      return `The Committee for Appropriate Imagination convened precisely at 9 AM, as it had every Tuesday since the Great Rationalization. Drawing from ${seedText}, the members took their designated seats, arranged by efficiency quotient rather than seniority.\n\n"Item one on today's agenda," announced Chairperson Bland, adjusting her perfectly symmetrical glasses, "addressing the troubling rise in unauthorized daydreaming among citizens aged 25-40."\n\nVice-Chairperson Dullard cleared his throat. "Our metrics show a 12% increase in workplace window-gazing and a concerning 23% spike in shower-based hypothetical arguments."\n\n"Unacceptable," muttered Commissioner Proper, whose job it was to maintain the national Imagination Containment Protocols. "We've provided ample approved fantasies for the quarter. Three involving moderate career advancement and one about finding money in an old coat."\n\nThe committee nodded in unified disapproval. Unauthorized imagination led to innovation, which led to change, which led to paperwork. No one wanted that.`;
    } else if (mode === 'romance') {
      return `The rain fell in gentle sheets across the Parisian boulevard, transforming the city lights into a watercolor painting of gold and amber. Inspired by ${seedText}, the scene was set for a chance encounter that would change two lives forever.\n\nElena hurried under the awning of the small bookshop, shaking droplets from her umbrella. She hadn't meant to stay at the museum so late, but the new exhibition had transported her to another time, another place.\n\n"They're closing in five minutes," came a voice, warm and accented, from behind her.\n\nShe turned to find a man with kind eyes and an apologetic smile, gesturing to the bookshop's door. "I just need one book," she said, returning his smile. "I've been searching for it for months."\n\n"What book could be worth getting soaked to the bone?" he asked, curiosity replacing his initial reserve.\n\nElena hesitated, then answered truthfully. "A collection of letters between Monet and his wife. First edition."\n\nHis eyes widened slightly. "You're in luck," he said, pulling a key from his pocket. "I happen to be the owner, and I happen to have received that exact book in an estate sale last week. Some things, it seems, are meant to be found."`;
    } else {
      return `The boundaries between consciousness and reality blurred as the subject contemplated the nature of perception itself. Influenced by ${seedText}, fragments of thought coalesced into temporary structures of meaning before dissolving again into the void.\n\nTime: a construct.\nMemory: unreliable.\nIdentity: fluid.\n\nThe observer became the observed, watching itself watching itself in an infinite regression of awareness. Words formed patterns that transcended their definitions, becoming pure rhythm and sensation.\n\nWas this room always here? Were these thoughts always mine? The questions themselves became objects to be examined from multiple dimensions simultaneously.\n\nSomewhere, a clock ticked. Or perhaps it was the sound of neural pathways forming, of reality being continuously created through the act of perception.\n\nA voice—internal or external, impossible to determine—whispered: "To understand the pattern, you must first become the pattern."\n\nAnd so it began again, the endless cycle of meaning-making in a universe of infinite possibility.`;
    }
  };

  const handleSaveStory = () => {
    if (!generatedStory) return;
    
    setSavedStories([generatedStory, ...savedStories]);
    alert('Story saved to your collection!');
  };

  const handleExportStory = () => {
    if (!generatedStory) return;
    
    // This would typically generate and download an EPUB or PDF
    console.log('Exporting story...');
    alert('Story would be exported as EPUB here in a real implementation.');
  };

  const handleShareStory = () => {
    if (!generatedStory) return;
    
    // This would typically open a share dialog
    console.log('Sharing story...');
    alert('Story sharing dialog would open here in a real implementation.');
  };

  const handleGenerateCharacterSheet = () => {
    // This would typically generate a character sheet based on the story
    console.log('Generating character sheet...');
    alert('Character sheet would be generated here in a real implementation.');
  };

  return (
    <div className="taste-quill-container">
      <h1>TasteQuill</h1>
      <p className="section-description">AI-generated stories crafted in the style of your favorite creators and genres.</p>
      
      <div className="taste-quill-layout">
        {/* Input Panel */}
        <div className="input-panel">
          <h2>Create Your Story</h2>
          
          <div className="taste-seeds-section">
            <h3>Select Your Taste Seeds</h3>
            <p>Choose genres, artists, shows, philosophies, etc. that inspire you</p>
            
            <div className="seed-input-container">
              <input
                type="text"
                value={seedInput}
                onChange={handleSeedInputChange}
                onKeyDown={handleSeedInputKeyDown}
                placeholder="Type and press Enter to add..."
                className="seed-input"
              />
            </div>
            
            <div className="suggested-seeds">
              <p>Suggested:</p>
              <div className="seed-buttons">
                {suggestedSeeds.map(seed => (
                  <button
                    key={seed}
                    onClick={() => addSeed(seed)}
                    className="seed-button"
                    disabled={tasteSeeds.includes(seed)}
                  >
                    {seed}
                  </button>
                ))}
              </div>
            </div>
            
            {tasteSeeds.length > 0 && (
              <div className="selected-seeds">
                <p>Your seeds:</p>
                <div className="seed-tags">
                  {tasteSeeds.map(seed => (
                    <span key={seed} className="seed-tag">
                      {seed}
                      <button 
                        onClick={() => removeSeed(seed)}
                        className="remove-seed"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="story-mode-section">
            <h3>Choose a Mode</h3>
            <div className="mode-buttons">
              {storyModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`mode-button ${storyMode === mode.id ? 'active' : ''}`}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="advanced-options">
            <label className="series-mode-toggle">
              <input
                type="checkbox"
                checked={seriesMode}
                onChange={handleSeriesModeToggle}
              />
              Series Mode (Generate chapters with memory)
            </label>
          </div>
          
          <button
            onClick={generateStory}
            disabled={isGenerating || tasteSeeds.length === 0}
            className="generate-button"
          >
            {isGenerating ? 'Creating Your Story...' : 'Generate Story'}
          </button>
        </div>
        
        {/* Output Panel */}
        <div className="output-panel">
          {isGenerating ? (
            <div className="generating-animation">
              <div className="typewriter">
                <div className="typewriter-text">Crafting your story...</div>
              </div>
              <p>Our AI is weaving a tale inspired by your unique taste profile</p>
            </div>
          ) : generatedStory ? (
            <div className="generated-story">
              <div className="story-header">
                <h2 className="story-title">{generatedStory.title}</h2>
                <p className="story-meta">
                  By {generatedStory.author} • {new Date(generatedStory.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="story-content">
                {generatedStory.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="story-actions">
                <button onClick={handleSaveStory} className="action-button">
                  Save Story
                </button>
                <button onClick={handleExportStory} className="action-button">
                  Export as EPUB
                </button>
                <button onClick={handleShareStory} className="action-button">
                  Share Story
                </button>
                <button onClick={handleGenerateCharacterSheet} className="action-button">
                  Generate Character Sheet
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Your story will appear here after generation</p>
              <p className="tip">Tip: Add more taste seeds for a more personalized story</p>
            </div>
          )}
        </div>
      </div>
      
      {savedStories.length > 0 && (
        <div className="saved-stories-section">
          <h2>Your Story Collection</h2>
          <div className="saved-stories-grid">
            {savedStories.map((story, index) => (
              <div key={index} className="saved-story-card">
                <h3>{story.title}</h3>
                <p className="story-excerpt">{story.content.substring(0, 100)}...</p>
                <div className="story-seeds">
                  {story.seeds.map((seed, i) => (
                    <span key={i} className="story-seed-tag">{seed}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasteQuill;
