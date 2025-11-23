import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const PhotoGrid = ({ image, dimensions, photoCount, backgroundColor, onCountChange }) => {
  const screenWidth = Dimensions.get('window').width;
  const gridWidth = screenWidth - 40;
  
  const countOptions = [4, 8, 12, 16, 20, 24];
  
  const getGridLayout = (count) => {
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 8) return { cols: 2, rows: 4 };
    if (count <= 12) return { cols: 3, rows: 4 };
    if (count <= 16) return { cols: 4, rows: 4 };
    if (count <= 20) return { cols: 4, rows: 5 };
    return { cols: 4, rows: 6 };
  };

  const layout = getGridLayout(photoCount);
  const photoWidth = (gridWidth - (layout.cols + 1) * 10) / layout.cols;
  const photoHeight = photoWidth * (dimensions.height / dimensions.width);

  const renderPhoto = (index) => (
    <View
      key={index}
      style={[
        styles.photoContainer,
        {
          width: photoWidth,
          height: photoHeight,
          backgroundColor: backgroundColor,
        }
      ]}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.placeholderText}>Photo {index + 1}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Layout</Text>
      
      <View style={styles.countSelector}>
        <Text style={styles.countTitle}>Photos per page:</Text>
        <View style={styles.countButtons}>
          {countOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.countButton,
                photoCount === count && styles.selectedCount
              ]}
              onPress={() => onCountChange(count)}
            >
              <Text style={[
                styles.countText,
                photoCount === count && styles.selectedCountText
              ]}>
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.grid, { backgroundColor: '#f0f0f0' }]}>
        <View style={styles.gridContainer}>
          {Array.from({ length: photoCount }, (_, index) => renderPhoto(index))}
        </View>
      </View>

      <Text style={styles.info}>
        Size: {dimensions.width}" × {dimensions.height}" | Count: {photoCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  countSelector: {
    marginBottom: 20,
  },
  countTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  countButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  countButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
    marginBottom: 5,
  },
  selectedCount: {
    backgroundColor: '#2196F3',
  },
  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedCountText: {
    color: 'white',
  },
  grid: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  photoContainer: {
    margin: 5,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontWeight: '500',
  },
});

export default PhotoGrid;