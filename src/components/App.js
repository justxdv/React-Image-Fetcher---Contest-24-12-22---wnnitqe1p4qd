import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${inputValue}`
        );
        const data = await response.json();
        setPhoto(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (inputValue !== "") {
      fetchData();
    }
  }, [inputValue]);

  return (
    <div className="App">
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter a number between 1-5000"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {isLoading && <Loader />}
      {error && <div>Error: {error.message}</div>}
      {photo && <PhotoFrame url={photo.url} title={photo.title} />}
    </div>
  );
};

export default App;
