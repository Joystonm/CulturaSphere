import React, { useState, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const TravelPDFGenerator = () => {
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState({ start: '', end: '' });
  const [interests, setInterests] = useState('');
  const [narrativeStyle, setNarrativeStyle] = useState('friendly');
  const [loading, setLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [error, setError] = useState('');
  const pdfPreviewRef = useRef(null);

  const narrativeStyleOptions = [
    { value: 'friendly', label: 'Friendly & Conversational' },
    { value: 'poetic', label: 'Poetic & Descriptive' },
    { value: 'practical', label: 'Practical & Concise' },
    { value: 'humorous', label: 'Humorous & Light' },
    { value: 'adventurous', label: 'Adventurous & Bold' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real implementation, this would be:
      // const response = await axios.post('/api/flavor-fusion/travel-pdf', {
      //   destination, travelDates, interests, narrativeStyle
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockPdfPreview = generateMockPdfPreview(destination, travelDates, interests, narrativeStyle);
      setPdfPreview(mockPdfPreview);
    } catch (err) {
      setError('Failed to generate travel PDF. Please try again.');
      console.error('Error generating travel PDF:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock PDF preview data
  const generateMockPdfPreview = (destination, travelDates, interests, narrativeStyle) => {
    // Extract interests for personalization
    const interestsList = interests.split(',').map(item => item.trim());
    const mainInterest = interestsList[0] || 'cultural exploration';
    
    // Generate phrasebook based on destination
    let phrasebook = [];
    if (destination.toLowerCase().includes('japan')) {
      phrasebook = [
        { local: 'こんにちは', pronunciation: 'Kon-nichiwa', translation: 'Hello' },
        { local: 'ありがとう', pronunciation: 'Arigatou', translation: 'Thank you' },
        { local: 'お願いします', pronunciation: 'Onegaishimasu', translation: 'Please' }
      ];
    } else if (destination.toLowerCase().includes('france')) {
      phrasebook = [
        { local: 'Bonjour', pronunciation: 'Bon-zhoor', translation: 'Hello' },
        { local: 'Merci', pronunciation: 'Mer-see', translation: 'Thank you' },
        { local: 'S\'il vous plaît', pronunciation: 'Seel voo play', translation: 'Please' }
      ];
    } else {
      phrasebook = [
        { local: 'Hello', pronunciation: 'Hello', translation: 'Hello' },
        { local: 'Thank you', pronunciation: 'Thank you', translation: 'Thank you' },
        { local: 'Please', pronunciation: 'Please', translation: 'Please' }
      ];
    }
    
    // Generate cultural tips
    const culturalTips = {
      dos: [
        `Learn a few basic phrases in the local language`,
        `Try the local cuisine, especially dishes recommended by residents`,
        `Respect local customs and traditions`,
        `Carry a small gift when visiting someone's home`,
        `Be mindful of appropriate dress codes at religious sites`
      ],
      donts: [
        `Don't rush through attractions; take time to appreciate the culture`,
        `Avoid loud conversations in quiet or sacred spaces`,
        `Don't take photos where prohibited or of people without permission`,
        `Avoid making comparisons to your home country`,
        `Don't ignore local etiquette regarding tipping and payment`
      ]
    };
    
    // Generate daily plans
    const dailyPlans = [
      {
        activities: [
          `Morning: Visit the main cultural district and explore local museums`,
          `Afternoon: Enjoy lunch at a traditional restaurant`,
          `Evening: Take a leisurely walk through the historic center`
        ]
      },
      {
        activities: [
          `Morning: Explore the local market and shop for authentic souvenirs`,
          `Afternoon: Visit key landmarks and architectural highlights`,
          `Evening: Experience local entertainment or nightlife`
        ]
      },
      {
        activities: [
          `Morning: Take a guided tour focused on ${mainInterest}`,
          `Afternoon: Relax at a local café and observe daily life`,
          `Evening: Enjoy a farewell dinner featuring regional specialties`
        ]
      }
    ];
    
    // Generate recommendations based on interests
    const recommendations = {
      music: [
        `Traditional folk music from ${destination}`,
        `Contemporary artists influenced by local culture`,
        `Ambient sounds inspired by the region's landscapes`
      ],
      reading: [
        `"The Cultural History of ${destination}" by Local Author`,
        `"Hidden Gems: A Traveler's Guide to ${destination}"`,
        `"Tales and Legends from ${destination}"`
      ]
    };
    
    // Generate personal note based on narrative style
    let personalNote;
    switch (narrativeStyle) {
      case 'poetic':
        personalNote = `As you wander through the winding streets of ${destination}, let the rhythm of the city guide your steps. Each moment is a verse in the poem of your journey, each encounter a stanza rich with meaning.`;
        break;
      case 'practical':
        personalNote = `This guide provides essential information for your trip to ${destination}. Follow these recommendations for an efficient and rewarding experience, and don't hesitate to adapt the itinerary to your preferences.`;
        break;
      case 'humorous':
        personalNote = `Welcome to ${destination}, where the locals might raise an eyebrow at your pronunciation but will appreciate your effort! Remember: getting lost isn't a travel mistake—it's an unplanned adventure.`;
        break;
      case 'adventurous':
        personalNote = `${destination} awaits your exploration! Push beyond the typical tourist paths to discover the true heart of this remarkable place. Embrace the unexpected and let your curiosity be your compass.`;
        break;
      default: // friendly
        personalNote = `I'm so excited for your trip to ${destination}! This guide is designed with your interests in mind, especially your passion for ${mainInterest}. Enjoy every moment of your journey!`;
    }
    
    return {
      title: `Your Personal Guide to ${destination}`,
      subtitle: `Crafted for your journey from ${travelDates.start || 'your arrival'} to ${travelDates.end || 'your departure'}`,
      phrasebook,
      culturalTips,
      dailyPlans,
      recommendations,
      personalNote
    };
  };

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Create a PDF document
    const doc = new jsPDF();
    
    // Set font size and add title
    doc.setFontSize(20);
    doc.text(pdfPreview.title, 105, 20, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(12);
    doc.text(pdfPreview.subtitle, 105, 30, { align: 'center' });
    
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Current Y position tracker
    let yPos = 45;
    
    // Add Mini Phrasebook section
    doc.setFontSize(16);
    doc.text("MINI PHRASEBOOK", 20, yPos);
    yPos += 10;
    
    // Create phrasebook table
    const phrasebookData = pdfPreview.phrasebook.map(phrase => 
      [phrase.local, phrase.pronunciation, phrase.translation]
    );
    
    doc.autoTable({
      startY: yPos,
      head: [['Local', 'Pronunciation', 'Translation']],
      body: phrasebookData,
      margin: { left: 20 },
      tableWidth: 170
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
    
    // Add Cultural Do's and Don'ts section
    doc.setFontSize(16);
    doc.text("CULTURAL DO'S AND DON'TS", 20, yPos);
    yPos += 10;
    
    // Do's
    doc.setFontSize(14);
    doc.text("Do's:", 20, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    pdfPreview.culturalTips.dos.forEach(item => {
      doc.text(`• ${item}`, 25, yPos);
      yPos += 7;
    });
    
    yPos += 5;
    
    // Don'ts
    doc.setFontSize(14);
    doc.text("Don'ts:", 20, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    pdfPreview.culturalTips.donts.forEach(item => {
      doc.text(`• ${item}`, 25, yPos);
      yPos += 7;
    });
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 10;
    }
    
    // Add Daily Plan Overview section
    doc.setFontSize(16);
    doc.text("DAILY PLAN OVERVIEW", 20, yPos);
    yPos += 10;
    
    pdfPreview.dailyPlans.forEach((day, index) => {
      doc.setFontSize(14);
      doc.text(`Day ${index + 1}:`, 20, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      day.activities.forEach(activity => {
        doc.text(`• ${activity}`, 25, yPos);
        yPos += 7;
      });
      
      yPos += 5;
      
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    // Add Recommendations section
    doc.setFontSize(16);
    doc.text("RECOMMENDATIONS", 20, yPos);
    yPos += 10;
    
    // Music
    doc.setFontSize(14);
    doc.text("Music:", 20, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    pdfPreview.recommendations.music.forEach(item => {
      doc.text(`• ${item}`, 25, yPos);
      yPos += 7;
    });
    
    yPos += 5;
    
    // Reading
    doc.setFontSize(14);
    doc.text("Reading:", 20, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    pdfPreview.recommendations.reading.forEach(item => {
      doc.text(`• ${item}`, 25, yPos);
      yPos += 7;
    });
    
    // Check if we need a new page
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 10;
    }
    
    // Add Personal Note section
    doc.setFontSize(16);
    doc.text("PERSONAL NOTE", 20, yPos);
    yPos += 10;
    
    // Split the personal note into lines that fit the page width
    const splitText = doc.splitTextToSize(pdfPreview.personalNote, 170);
    doc.setFontSize(10);
    doc.text(splitText, 20, yPos);
    
    // Save the PDF
    doc.save(`${destination}_travel_guide.pdf`);
  };

  return (
    <div className="travel-pdf-generator">
      <div className="generator-header">
        <h2>Travel PDF Generator</h2>
        <p>Create a personalized travel guide with local phrases and cultural insights</p>
      </div>

      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Lisbon, Portugal"
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
          <label htmlFor="interests">Your Interests</label>
          <textarea
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Tell us about your interests (e.g., architecture, local cuisine, history, outdoor activities)"
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="narrativeStyle">Narrative Style</label>
          <select
            id="narrativeStyle"
            value={narrativeStyle}
            onChange={(e) => setNarrativeStyle(e.target.value)}
          >
            {narrativeStyleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="generate-button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Travel Guide'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {pdfPreview && (
        <div className="pdf-preview" ref={pdfPreviewRef}>
          <h3>Your Travel Guide Preview</h3>
          
          <div className="preview-container">
            <div className="preview-header">
              <h4>{pdfPreview.title}</h4>
              <p className="preview-subtitle">{pdfPreview.subtitle}</p>
            </div>
            
            <div className="preview-sections">
              <div className="preview-section">
                <h5>Mini Phrasebook</h5>
                <div className="phrases-list">
                  {pdfPreview.phrasebook.map((phrase, index) => (
                    <div key={index} className="phrase-item">
                      <div className="phrase-local">{phrase.local}</div>
                      <div className="phrase-pronunciation">{phrase.pronunciation}</div>
                      <div className="phrase-translation">{phrase.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="preview-section">
                <h5>Cultural Do's and Don'ts</h5>
                <div className="culture-lists">
                  <div className="culture-do">
                    <h6>Do's</h6>
                    <ul>
                      {pdfPreview.culturalTips.dos.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="culture-dont">
                    <h6>Don'ts</h6>
                    <ul>
                      {pdfPreview.culturalTips.donts.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="preview-section">
                <h5>Daily Plan Overview</h5>
                <div className="daily-plans">
                  {pdfPreview.dailyPlans.map((day, index) => (
                    <div key={index} className="daily-plan">
                      <h6>Day {index + 1}</h6>
                      <ul>
                        {day.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="preview-section">
                <h5>Recommendations</h5>
                <div className="recommendations">
                  <div className="recommendation-group">
                    <h6>Music</h6>
                    <ul>
                      {pdfPreview.recommendations.music.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="recommendation-group">
                    <h6>Reading</h6>
                    <ul>
                      {pdfPreview.recommendations.reading.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="preview-section">
                <h5>Personal Note</h5>
                <blockquote className="personal-note">
                  {pdfPreview.personalNote}
                </blockquote>
              </div>
            </div>
          </div>
          
          <div className="pdf-actions">
            <button className="download-button" onClick={handleDownloadPDF}>
              <i className="fas fa-file-pdf"></i> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPDFGenerator;
