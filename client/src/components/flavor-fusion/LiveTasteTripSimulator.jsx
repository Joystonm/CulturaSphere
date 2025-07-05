import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LiveTasteTripSimulator = () => {
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState('');
  const [duration, setDuration] = useState(2);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [error, setError] = useState('');
  const [simulationStarted, setSimulationStarted] = useState(false);
  const chatEndRef = useRef(null);

  const handleStartSimulation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setConversation([]);
    
    try {
      const response = await axios.post('/api/flavor-fusion/taste-trip-simulator/start', {
        destination,
        interests,
        duration
      });
      
      // Add the initial response to the conversation
      setConversation([
        {
          type: 'system',
          content: 'Welcome to your simulated taste trip! Ask questions or give instructions to explore.'
        },
        {
          type: 'assistant',
          content: response.data.initialResponse
        }
      ]);
      
      setSimulationStarted(true);
    } catch (err) {
      setError('Failed to start simulation. Please try again.');
      console.error('Error starting simulation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (currentMessage.trim() === '') return;
    
    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    
    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', content: userMessage }]);
    
    try {
      // Show typing indicator
      setConversation(prev => [...prev, { type: 'typing' }]);
      
      const response = await axios.post('/api/flavor-fusion/taste-trip-simulator/message', {
        message: userMessage,
        destination,
        interests
      });
      
      // Remove typing indicator and add assistant response
      setConversation(prev => {
        const newConversation = prev.filter(msg => msg.type !== 'typing');
        return [...newConversation, { type: 'assistant', content: response.data.response }];
      });
    } catch (err) {
      // Remove typing indicator and add error message
      setConversation(prev => {
        const newConversation = prev.filter(msg => msg.type !== 'typing');
        return [...newConversation, { 
          type: 'system', 
          content: 'Sorry, there was an error processing your request. Please try again.' 
        }];
      });
      console.error('Error in simulation conversation:', err);
    }
  };

  const handleResetSimulation = () => {
    setSimulationStarted(false);
    setConversation([]);
  };

  // Scroll to bottom of chat when conversation updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <div className="live-taste-trip-simulator">
      <div className="simulator-header">
        <h2>Live Taste Trip Simulator</h2>
        <p>Experience a narrated journey based on your cultural interests</p>
      </div>

      {!simulationStarted ? (
        <form onSubmit={handleStartSimulation} className="simulator-form">
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Istanbul, Turkey"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interests">Your Interests</label>
            <textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., I love Agatha Christie novels and vintage soul music"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Simulated Duration (Days)</label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(day => (
                <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="start-button" disabled={loading}>
            {loading ? 'Starting Simulation...' : 'Start Taste Trip'}
          </button>
        </form>
      ) : (
        <div className="simulation-interface">
          <div className="simulation-info">
            <div className="info-item">
              <span className="info-label">Destination:</span>
              <span className="info-value">{destination}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duration:</span>
              <span className="info-value">{duration} days</span>
            </div>
            <button 
              className="reset-button" 
              onClick={handleResetSimulation}
            >
              Reset Simulation
            </button>
          </div>
          
          <div className="chat-container">
            <div className="chat-messages">
              {conversation.map((message, index) => (
                <div 
                  key={index} 
                  className={`message ${message.type}`}
                >
                  {message.type === 'typing' ? (
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <div className="message-content">{message.content}</div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask about local spots, food, or what to do next..."
                disabled={conversation.some(msg => msg.type === 'typing')}
              />
              <button 
                type="submit"
                disabled={currentMessage.trim() === '' || conversation.some(msg => msg.type === 'typing')}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LiveTasteTripSimulator;
