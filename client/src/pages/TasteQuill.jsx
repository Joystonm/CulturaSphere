import React, { useState } from 'react';
import { generateStory } from '../services/api';

const TasteQuill = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    genre: '',
    style: '',
    length: 'medium'
  });
  
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Prepare data for API call
      const storyData = {
        prompt: formData.prompt,
        genre: selectedGenres.join(', '),
        style: formData.style,
        length: formData.length
      };
      
      // Call the API to generate a story
      const response = await generateStory(storyData);
      setGeneratedStory(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error generating story:', err);
      setError('Failed to generate story. Please try again later.');
      setLoading(false);
    }
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
      
      {error && <div className="error-message">{error}</div>}
      
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
            
            <button 
              type="submit" 
              className="generate-btn" 
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Story'}
            </button>
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
    </div>
  );
};

export default TasteQuill;
