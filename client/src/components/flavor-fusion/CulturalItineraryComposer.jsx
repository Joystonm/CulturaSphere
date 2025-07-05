import React, { useState, useRef } from 'react';
import axios from 'axios';

const CulturalItineraryComposer = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [travelPace, setTravelPace] = useState('moderate');
  const [travelMode, setTravelMode] = useState('walking');
  const [userTastes, setUserTastes] = useState('');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');
  const itineraryRef = useRef(null);

  const travelPaceOptions = [
    { value: 'relaxed', label: 'Relaxed - Fewer activities, more time to enjoy' },
    { value: 'moderate', label: 'Moderate - Balanced pace with time to explore' },
    { value: 'active', label: 'Active - Packed schedule to see as much as possible' }
  ];

  const travelModeOptions = [
    { value: 'walking', label: 'Walking' },
    { value: 'cycling', label: 'Cycling' },
    { value: 'public-transport', label: 'Public Transport' },
    { value: 'scenic-drive', label: 'Scenic Drive' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real implementation, this would be:
      // const response = await axios.post('/api/flavor-fusion/itinerary', {
      //   destination, days, travelPace, travelMode, userTastes
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockItinerary = generateMockItinerary(destination, days, userTastes);
      setItinerary(mockItinerary);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
      console.error('Error generating itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock itinerary data
  const generateMockItinerary = (destination, days, userTastes) => {
    const itinerary = [];
    
    for (let i = 0; i < days; i++) {
      itinerary.push({
        morning: {
          title: `${destination} Cultural Museum`,
          description: `Start your day with a visit to the ${destination} Cultural Museum, which houses artifacts dating back centuries and showcases the rich history of the region.`,
          tasteMatch: `Based on your interest in ${userTastes.split(',')[0] || 'cultural history'}, this museum offers a perfect introduction to the local heritage.`
        },
        afternoon: {
          title: `Local Cuisine at ${destination} Market`,
          description: `Explore the vibrant local market and sample authentic dishes from various food stalls. Don't miss the signature local specialties!`,
          tasteMatch: `Your appreciation for ${userTastes.split(',')[1] || 'culinary experiences'} will be satisfied by the diverse flavors and cooking techniques on display.`
        },
        evening: {
          title: `Sunset at ${destination} Viewpoint`,
          description: `End your day with a relaxing visit to the famous viewpoint, where you can watch the sunset over the city while enjoying local drinks and snacks.`,
          tasteMatch: `This aligns with your interest in ${userTastes.split(',')[2] || 'scenic experiences'}, offering a perfect blend of natural beauty and local atmosphere.`
        }
      });
    }
    
    return itinerary;
  };

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Create a simple text representation of the itinerary
    let content = `${days}-Day ${destination} Itinerary\n\n`;
    
    itinerary.forEach((day, index) => {
      content += `Day ${index + 1}\n`;
      content += `Morning: ${day.morning.title}\n`;
      content += `${day.morning.description}\n\n`;
      content += `Afternoon: ${day.afternoon.title}\n`;
      content += `${day.afternoon.description}\n\n`;
      content += `Evening: ${day.evening.title}\n`;
      content += `${day.evening.description}\n\n`;
    });
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${destination}_${days}_day_itinerary.txt`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cultural-itinerary-composer">
      <div className="composer-header">
        <h2>Cultural Itinerary Composer</h2>
        <p>Generate a personalized travel plan based on your cultural preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="itinerary-form">
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Kyoto, Japan"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="days">Number of Days</label>
          <select
            id="days"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="travelPace">Travel Pace</label>
          <select
            id="travelPace"
            value={travelPace}
            onChange={(e) => setTravelPace(e.target.value)}
          >
            {travelPaceOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="travelMode">Preferred Travel Mode</label>
          <select
            id="travelMode"
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
          >
            {travelModeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="userTastes">Your Cultural Tastes</label>
          <textarea
            id="userTastes"
            value={userTastes}
            onChange={(e) => setUserTastes(e.target.value)}
            placeholder="Tell us about your interests (e.g., I love jazz music, contemporary art, spicy food, and historical architecture)"
            rows={4}
            required
          />
        </div>

        <button type="submit" className="compose-button" disabled={loading}>
          {loading ? 'Generating...' : 'Compose Itinerary'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {itinerary && (
        <div className="itinerary-result" ref={itineraryRef}>
          <h3>Your {days}-Day {destination} Itinerary</h3>
          
          {itinerary.map((day, dayIndex) => (
            <div key={dayIndex} className="itinerary-day">
              <h4>Day {dayIndex + 1}</h4>
              
              {['morning', 'afternoon', 'evening'].map(timeSlot => (
                <div key={timeSlot} className="time-slot">
                  <h5>{timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}</h5>
                  <div className="activity-card">
                    <h6>{day[timeSlot].title}</h6>
                    <p>{day[timeSlot].description}</p>
                    <div className="taste-match">
                      <span className="match-label">Why it matches your taste:</span>
                      <p>{day[timeSlot].tasteMatch}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          <div className="itinerary-actions">
            <button className="action-button" onClick={handleDownloadPDF}>
              <i className="fas fa-file-pdf"></i> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalItineraryComposer;
