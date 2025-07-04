import React, { useState } from 'react';
import { submitTasteQuill } from '../services/api';

const TasteQuill = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This would be replaced with an actual API call
      // await submitTasteQuill(formData);
      
      // For now, just add to local state
      const newSubmission = {
        id: Date.now(),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toLocaleDateString()
      };
      
      setSubmissions([newSubmission, ...submissions]);
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: ''
      });
      
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting content:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="taste-quill-container">
      <h1>TasteQuill</h1>
      <p>Express your cultural experiences and connect with others through creative writing.</p>
      
      <div className="submission-form">
        <h2>Share Your Experience</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your experience a title"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="food">Food & Cuisine</option>
              <option value="music">Music & Performance</option>
              <option value="art">Visual Arts</option>
              <option value="literature">Literature</option>
              <option value="travel">Travel & Places</option>
              <option value="tradition">Traditions & Customs</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Your Experience</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              placeholder="Share your cultural experience or creative expression..."
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., italian, cooking, family-recipe"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Share Your Story'}
          </button>
        </form>
      </div>

      {submissions.length > 0 && (
        <div className="submissions">
          <h2>Your Submissions</h2>
          <div className="submissions-list">
            {submissions.map(submission => (
              <div key={submission.id} className="submission-card">
                <h3>{submission.title}</h3>
                <div className="submission-meta">
                  {submission.category} • {submission.date}
                </div>
                <p className="submission-content">{submission.content}</p>
                <div className="submission-tags">
                  {submission.tags.map((tag, index) => (
                    <span key={index} className="submission-tag">
                      {tag}
                    </span>
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
