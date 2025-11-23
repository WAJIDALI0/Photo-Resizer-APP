import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PhotoUploader from './components/PhotoUploader';
import DimensionSelector from './components/DimensionSelector';
import PhotoGrid from './components/PhotoGrid';
import BackgroundSelector from './components/BackgroundSelector';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 2, height: 2 });
  const [photoCount, setPhotoCount] = useState(4);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const handleImageSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleDimensionChange = (width, height) => {
    setDimensions({ width, height });
  };

  const handlePrint = () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }
    Alert.alert('Print', 'Print functionality will be implemented');
  };

  const handleShare = () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }
    Alert.alert('Share', 'Share functionality will be implemented');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Resizer</Text>
        <Text style={styles.subtitle}>Create passport & ID photos</Text>
      </View>

      <PhotoUploader onImageSelect={handleImageSelect} />
      
      <DimensionSelector 
        dimensions={dimensions}
        onDimensionChange={handleDimensionChange}
      />

      <BackgroundSelector 
        backgroundColor={backgroundColor}
        onColorChange={setBackgroundColor}
      />

      <PhotoGrid 
        image={selectedImage}
        dimensions={dimensions}
        photoCount={photoCount}
        backgroundColor={backgroundColor}
        onCountChange={setPhotoCount}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrint}>
          <Text style={styles.buttonText}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});