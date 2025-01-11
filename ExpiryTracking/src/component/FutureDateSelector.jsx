import React, { useState, useEffect } from 'react';

const FutureDateSelector = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    
    // Validate the selected date
    const selectedDateTime = new Date(selected).getTime();
    const todayTime = new Date(today).getTime();
    
    if (selectedDateTime <= todayTime) {
      setError('Please select a future date');
    } else {
      setError('');
    }
  };
  
  return (
    <div className="p-6 max-w-sm mx-auto">
      <div className="mb-4">
        <label 
          htmlFor="futureDate" 
        >
          Select a future date:
        </label>
        <input
          type="date"
          id="futureDate"
          min={today}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      
      {error && (
        <p>
          {error}
        </p>
      )}
      
      {selectedDate && !error && (
        <p>
          Selected date: {new Date(selectedDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default FutureDateSelector;