import React, { useState, useRef } from 'react';
import axios from 'axios';

const PostTripStoryMode = () => {
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState({ start: '', end: '' });
  const [experiences, setExperiences] = useState('');
  const [storyStyle, setStoryStyle] = useState('narrative');
  const [loading, setLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [error, setError] = useState('');
  const storyRef = useRef(null);

  const storyStyleOptions = [
    { value: 'narrative', label: 'Narrative Story' },
    { value: 'poetic', label: 'Poetic Journal' },
    { value: 'travel-guide', label: 'Personal Travel Guide' },
    { value: 'letter', label: 'Letter to Future Self' },
    { value: 'essay', label: 'Reflective Essay' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real implementation, we would upload photos and send form data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockStory = generateMockStory(destination, travelDates, experiences, storyStyle);
      setGeneratedStory(mockStory);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      console.error('Error generating post-trip story:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock story data
  const generateMockStory = (destination, travelDates, experiences, storyStyle) => {
    // Generate title based on destination and style
    let title, subtitle;
    
    switch (storyStyle) {
      case 'poetic':
        title = `Whispers of ${destination}`;
        subtitle = 'A Poetic Journey Through Time and Space';
        break;
      case 'travel-guide':
        title = `${destination} Through My Eyes`;
        subtitle = 'A Personal Guide to Hidden Treasures';
        break;
      case 'letter':
        title = `Dear Future Self: Reflections from ${destination}`;
        subtitle = 'Memories to Cherish and Lessons Learned';
        break;
      case 'essay':
        title = `Reflections on ${destination}`;
        subtitle = 'A Personal Essay of Discovery';
        break;
      default: // narrative
        title = `My Journey Through ${destination}`;
        subtitle = 'Adventures, Discoveries, and Transformations';
    }
    
    // Generate content sections based on style and experiences
    const experienceKeywords = experiences.split(' ').filter(word => word.length > 4);
    const randomKeyword = experienceKeywords[Math.floor(Math.random() * experienceKeywords.length)] || 'journey';
    
    // Create content sections
    const content = [];
    
    // Add introduction
    content.push({
      type: 'text',
      heading: 'Beginnings',
      paragraphs: [
        `My adventure in ${destination} began with a sense of anticipation and wonder. The ${travelDates.start ? 'morning' : 'day'} of my arrival greeted me with ${Math.random() > 0.5 ? 'bright sunshine' : 'gentle rain'}, setting the tone for what would become an unforgettable experience.`,
        `I had long dreamed of exploring this place, drawn by its reputation for ${randomKeyword} and cultural richness. Now, standing on its soil, I felt both the excitement of discovery and the comfort of finally arriving somewhere I had imagined so many times.`
      ]
    });
    
    // Add middle section
    content.push({
      type: 'text',
      heading: 'Discoveries',
      paragraphs: [
        `The days unfolded with a rhythm of their own. Each morning brought new possibilities, and I found myself drawn to the ${Math.random() > 0.5 ? 'bustling markets' : 'quiet corners'} where local life revealed itself in authentic moments.`,
        `What struck me most was the way ${experiences.split(' ').slice(0, 3).join(' ')}... These experiences shaped my understanding of not just ${destination}, but of travel itself.`
      ]
    });
    
    // Add quote
    content.push({
      type: 'quote',
      text: `"Travel isn't always comfortable. Sometimes it hurts. But that's okay. The journey changes you; it leaves marks on your memory, on your heart, and on your body. You take something with you... and hopefully, you leave something good behind."`
    });
    
    // Add conclusion
    content.push({
      type: 'text',
      heading: 'Reflections',
      paragraphs: [
        `As my time in ${destination} came to a close, I found myself collecting memories like precious souvenirs. The taste of local cuisine, the sound of unfamiliar languages, the feeling of being both a stranger and somehow at home.`,
        `This journey has become a part of me now, woven into the fabric of who I am. And while I may have left ${destination} behind, I carry its essence with me wherever I go next.`
      ]
    });
    
    return {
      title,
      subtitle,
      content
    };
  };

  // Function to handle story download as PDF
  const handleDownloadStory = () => {
    // Create a simple text representation of the story
    let content = `${generatedStory.title}\n`;
    content += `${generatedStory.subtitle}\n\n`;
    
    generatedStory.content.forEach(section => {
      if (section.heading) {
        content += `${section.heading.toUpperCase()}\n\n`;
      }
      
      if (section.type === 'text') {
        section.paragraphs.forEach(paragraph => {
          content += `${paragraph}\n\n`;
        });
      } else if (section.type === 'quote') {
        content += `${section.text}\n\n`;
      } else if (section.type === 'photo') {
        content += `[Photo: ${section.caption}]\n\n`;
      }
    });
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${destination}_story.txt`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="post-trip-story-mode">
      <div className="story-mode-header">
        <h2>Post-Trip Story Mode</h2>
        <p>Transform your travel memories into a beautifully crafted story</p>
      </div>

      <form onSubmit={handleSubmit} className="story-form">
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Marrakech, Morocco"
            required
          />
        </div>

        <div className="form-group date-range">
          <label>Travel Dates</label>
          <div className="date-inputs">
            <div className="date-input">
              <label htmlFor="startDate">From</label>
              <input
                type="date"
                id="startDate"
                value={travelDates.start}
                onChange={(e) => setTravelDates({ ...travelDates, start: e.target.value })}
              />
            </div>
            <div className="date-input">
              <label htmlFor="endDate">To</label>
              <input
                type="date"
                id="endDate"
                value={travelDates.end}
                onChange={(e) => setTravelDates({ ...travelDates, end: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="experiences">Your Experiences</label>
          <textarea
            id="experiences"
            value={experiences}
            onChange={(e) => setExperiences(e.target.value)}
            placeholder="Share your memorable experiences, places visited, foods tried, people met, etc."
            rows={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="storyStyle">Story Style</label>
          <select
            id="storyStyle"
            value={storyStyle}
            onChange={(e) => setStoryStyle(e.target.value)}
          >
            {storyStyleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="generate-button" disabled={loading}>
          {loading ? 'Generating Story...' : 'Generate My Story'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {generatedStory && (
        <div className="generated-story" ref={storyRef}>
          <div className="story-container">
            <div className="story-header">
              <h3>{generatedStory.title}</h3>
              <p className="story-subtitle">{generatedStory.subtitle}</p>
            </div>
            
            <div className="story-content">
              {generatedStory.content.map((section, index) => (
                <div key={index} className="story-section">
                  {section.heading && <h4>{section.heading}</h4>}
                  
                  {section.type === 'text' && (
                    <div className="story-text">
                      {section.paragraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  
                  {section.type === 'quote' && (
                    <blockquote className="story-quote">
                      {section.text}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="story-actions">
            <button className="action-button" onClick={handleDownloadStory}>
              <i className="fas fa-file-pdf"></i> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTripStoryMode;
