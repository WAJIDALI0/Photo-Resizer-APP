import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BackgroundSelector = ({ backgroundColor, onColorChange }) => {
  const colors = [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Blue', color: '#2196F3' },
    { name: 'Red', color: '#F44336' },
    { name: 'Gray', color: '#9E9E9E' },
    { name: 'Light Blue', color: '#87CEEB' },
    { name: 'Cream', color: '#F5F5DC' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Background Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((colorOption, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorButton,
              { backgroundColor: colorOption.color },
              backgroundColor === colorOption.color && styles.selectedColor
            ]}
            onPress={() => onColorChange(colorOption.color)}
          >
            <Text style={[
              styles.colorText,
              { color: colorOption.color === '#FFFFFF' ? '#000' : '#fff' }
            ]}>
              {colorOption.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorButton: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
  colorText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BackgroundSelector;