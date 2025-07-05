import React, { useState } from 'react';

const TasteQuill = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    genre: '',
    style: '',
    length: 'medium'
  });
  
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [generatedStory, setGeneratedStory] = useState(null);
  
  const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Horror', 'Historical', 'Adventure'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would call an API to generate the story
    // For now, we'll simulate a generated story
    const sampleStory = {
      title: "The Quantum Gardener",
      author: "AI & You",
      content: `In the year 2157, when the last natural garden on Earth had long been replaced by holographic simulations, Maya Chen discovered an ancient seed vault beneath the ruins of what was once called "Central Park."

The quantum computers that governed most of human life had no record of this place. It was a blind spot in their omniscient databases, a rare anomaly in an age where every molecule was tracked and catalogued.

Maya's fingers trembled as she held a small paper envelope. Inside were seeds—actual, physical seeds—from a plant called "Sunflower." The illustration on the packet showed a tall stalk with a large yellow bloom that resembled the artificial sun that now provided light to the megastructures of New Manhattan.

"What will you do with those?" asked her companion, a standard-issue companion bot named Arlo. "They're incompatible with current environmental parameters."

Maya smiled, tucking the envelope into her pocket. "I'm going to change the parameters."

That night, she broke into the climate control hub for Sector 7, where she lived. With careful precision, she adjusted the moisture levels, introduced specific bacterial cultures into the soil substitute, and modified the light spectrum to match ancient records of natural sunlight.

Three weeks later, when the first green shoot pushed through the synthetic soil, Maya wept. It was the first natural plant to grow in the city in over 70 years.

Word spread quickly. People from neighboring sectors made pilgrimages to see the sunflower. Some brought water—real water, not the processed liquid most people drank. Others came with more seeds they'd kept as family heirlooms, never believing they would see them grow.

The authorities were conflicted. Technically, Maya had violated environmental homogeneity laws, but public sentiment was overwhelmingly positive. In a society where everything was predictable, calculated, and artificial, the random beauty of a growing plant had awakened something long dormant in the collective consciousness.

By the time the sunflower bloomed, the city council had designated Sector 7 as an "experimental botanical zone." Maya was appointed Chief Botanical Architect, tasked with reintroducing compatible plant species into the urban environment.

As she stood before her sunflower, now tall and proud with its face turned toward the artificial sun, Arlo approached.

"I've been analyzing human responses to the plant," the bot said. "I don't understand why a simple organism causes such emotional reactions."

Maya reached out to touch one of the sunflower's leaves. "It's not about the plant itself, Arlo. It's about possibility. For generations, we've been told that we can only move forward, that the natural world is gone forever. This sunflower proves that wrong. It proves that with care and attention, we can recover what was lost."

Arlo's processors whirred as it attempted to compute this concept. "So this plant represents hope?"

"Yes," Maya said, smiling as a small insect—another rarity—landed on the sunflower's center. "And hope, like seeds, can lie dormant for a very long time, waiting for the right conditions to grow."`,
      date: new Date().toLocaleDateString()
    };
    
    setGeneratedStory(sampleStory);
  };
  
  const handleSaveStory = () => {
    alert('Story saved! (This would save to a database in a real application)');
  };
  
  const handleShareStory = () => {
    alert('Story shared! (This would open sharing options in a real application)');
  };
  
  const handleGenerateNew = () => {
    setGeneratedStory(null);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="taste-quill-container">
      <header className="taste-quill-header">
        <h1 className="taste-quill-title">TasteQuill</h1>
        <p className="taste-quill-description">
          Express your cultural experiences and connect with others through creative writing.
          Generate AI stories inspired by your favorite genres, authors, and themes.
        </p>
      </header>
      
      {!generatedStory ? (
        <section className="story-generator">
          <h2>Generate Your Story</h2>
          
          <form className="generator-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="prompt" className="form-label">Story Prompt or Theme</label>
              <textarea
                id="prompt"
                name="prompt"
                className="form-textarea"
                value={formData.prompt}
                onChange={handleInputChange}
                placeholder="Describe the story you want to generate..."
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="form-label">Genre (select one or more)</label>
              <div className="genre-options">
                {genres.map(genre => (
                  <div
                    key={genre}
                    className={`genre-option ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="style" className="form-label">Writing Style (optional)</label>
              <input
                type="text"
                id="style"
                name="style"
                className="form-input"
                value={formData.style}
                onChange={handleInputChange}
                placeholder="e.g., 'like Ernest Hemingway' or 'poetic and descriptive'"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="length" className="form-label">Story Length</label>
              <select
                id="length"
                name="length"
                className="form-select"
                value={formData.length}
                onChange={handleInputChange}
              >
                <option value="short">Short (less than 500 words)</option>
                <option value="medium">Medium (500-1000 words)</option>
                <option value="long">Long (more than 1000 words)</option>
              </select>
            </div>
            
            <button type="submit" className="generate-btn">Generate Story</button>
          </form>
        </section>
      ) : (
        <section className="story-result">
          <div className="story-container">
            <div className="story-header">
              <h2 className="story-title">{generatedStory.title}</h2>
              <p className="story-meta">By {generatedStory.author} • {generatedStory.date}</p>
            </div>
            
            <div className="story-content">
              {generatedStory.content}
            </div>
            
            <div className="story-actions">
              <button onClick={handleSaveStory} className="story-action-btn">
                Save Story
              </button>
              <button onClick={handleShareStory} className="story-action-btn">
                Share Story
              </button>
              <button onClick={handleGenerateNew} className="story-action-btn">
                Generate New Story
              </button>
            </div>
          </div>
        </section>
      )}
      
      <section className="saved-stories">
        <h2>Your Saved Stories</h2>
        
        <div className="saved-stories-grid">
          <div className="saved-story-card">
            <h3 className="saved-story-title">The Midnight Orchestra</h3>
            <p className="saved-story-preview">
              In a city where music was forbidden, a young violinist discovered an underground concert hall...
            </p>
            <div className="saved-story-meta">
              <span>Fantasy</span>
              <span>June 15, 2023</span>
            </div>
          </div>
          
          <div className="saved-story-card">
            <h3 className="saved-story-title">Echoes of Tomorrow</h3>
            <p className="saved-story-preview">
              The time traveler arrived with a warning: the future was not what they had hoped to create...
            </p>
            <div className="saved-story-meta">
              <span>Science Fiction</span>
              <span>May 22, 2023</span>
            </div>
          </div>
          
          <div className="saved-story-card">
            <h3 className="saved-story-title">The Forgotten Lighthouse</h3>
            <p className="saved-story-preview">
              For fifty years, the lighthouse keeper had maintained his post, even though no ships ever passed...
            </p>
            <div className="saved-story-meta">
              <span>Mystery</span>
              <span>July 3, 2023</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TasteQuill;
