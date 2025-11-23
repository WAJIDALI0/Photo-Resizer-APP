import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 2, height: 2 });
  const [photoCount, setPhotoCount] = useState(4);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const presetSizes = [
    { name: 'Passport (2x2)', width: 2, height: 2 },
    { name: 'ID Card (1.5x2)', width: 1.5, height: 2 },
    { name: 'Visa (2x2)', width: 2, height: 2 },
    { name: 'License (1.25x1.5)', width: 1.25, height: 1.5 },
  ];

  const colors = [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Blue', color: '#2196F3' },
    { name: 'Red', color: '#F44336' },
    { name: 'Gray', color: '#9E9E9E' },
    { name: 'Light Blue', color: '#87CEEB' },
    { name: 'Cream', color: '#F5F5DC' },
  ];

  const countOptions = [4, 8, 12, 16, 20, 24];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }
    window.print();
  };

  const handleShare = () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }
    if (navigator.share) {
      navigator.share({
        title: 'Photo Resizer',
        text: 'Check out my resized photos!',
      });
    } else {
      alert('Share functionality not supported in this browser');
    }
  };

  const renderPhotoGrid = () => {
    const photos = [];
    for (let i = 0; i < photoCount; i++) {
      photos.push(
        <div
          key={i}
          className="photo-item"
          style={{
            backgroundColor: backgroundColor,
            aspectRatio: `${dimensions.width}/${dimensions.height}`,
          }}
        >
          {selectedImage ? (
            <img src={selectedImage} alt={`Photo ${i + 1}`} />
          ) : (
            <span>Photo {i + 1}</span>
          )}
        </div>
      );
    }
    return photos;
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📸 Photo Resizer</h1>
        <p>Create passport & ID photos with custom dimensions</p>
      </header>

      <div className="container">
        {/* Photo Upload */}
        <div className="section">
          <h2>Upload Photo</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        {/* Dimension Selector */}
        <div className="section">
          <h2>Photo Dimensions (inches)</h2>
          <div className="preset-buttons">
            {presetSizes.map((preset, index) => (
              <button
                key={index}
                onClick={() => setDimensions({ width: preset.width, height: preset.height })}
                className="preset-btn"
              >
                {preset.name}
              </button>
            ))}
          </div>
          <div className="custom-size">
            <label>
              Width:
              <input
                type="number"
                step="0.1"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 2 })}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                step="0.1"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 2 })}
              />
            </label>
          </div>
        </div>

        {/* Background Color */}
        <div className="section">
          <h2>Background Color</h2>
          <div className="color-buttons">
            {colors.map((colorOption, index) => (
              <button
                key={index}
                onClick={() => setBackgroundColor(colorOption.color)}
                className={`color-btn ${backgroundColor === colorOption.color ? 'selected' : ''}`}
                style={{ backgroundColor: colorOption.color }}
              >
                {colorOption.name}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Count */}
        <div className="section">
          <h2>Photos per page</h2>
          <div className="count-buttons">
            {countOptions.map((count) => (
              <button
                key={count}
                onClick={() => setPhotoCount(count)}
                className={`count-btn ${photoCount === count ? 'selected' : ''}`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="section">
          <h2>Preview</h2>
          <div className="photo-grid">
            {renderPhotoGrid()}
          </div>
          <p className="info">
            Size: {dimensions.width}" × {dimensions.height}" | Count: {photoCount}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="section">
          <div className="action-buttons">
            <button onClick={handlePrint} className="action-btn print-btn">
              🖨️ Print
            </button>
            <button onClick={handleShare} className="action-btn share-btn">
              📱 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;