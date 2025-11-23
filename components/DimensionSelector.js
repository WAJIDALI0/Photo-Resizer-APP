import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const DimensionSelector = ({ dimensions, onDimensionChange }) => {
  const [customWidth, setCustomWidth] = useState(dimensions.width.toString());
  const [customHeight, setCustomHeight] = useState(dimensions.height.toString());

  const presetSizes = [
    { name: 'Passport (2x2)', width: 2, height: 2 },
    { name: 'ID Card (1.5x2)', width: 1.5, height: 2 },
    { name: 'Visa (2x2)', width: 2, height: 2 },
    { name: 'License (1.25x1.5)', width: 1.25, height: 1.5 },
  ];

  const selectPreset = (preset) => {
    setCustomWidth(preset.width.toString());
    setCustomHeight(preset.height.toString());
    onDimensionChange(preset.width, preset.height);
  };

  const updateCustomSize = () => {
    const width = parseFloat(customWidth) || 2;
    const height = parseFloat(customHeight) || 2;
    onDimensionChange(width, height);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Dimensions (inches)</Text>
      
      <View style={styles.presetContainer}>
        {presetSizes.map((preset, index) => (
          <TouchableOpacity
            key={index}
            style={styles.presetButton}
            onPress={() => selectPreset(preset)}
          >
            <Text style={styles.presetText}>{preset.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.customContainer}>
        <Text style={styles.customTitle}>Custom Size:</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Width:</Text>
            <TextInput
              style={styles.input}
              value={customWidth}
              onChangeText={setCustomWidth}
              onBlur={updateCustomSize}
              keyboardType="numeric"
              placeholder="2.0"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height:</Text>
            <TextInput
              style={styles.input}
              value={customHeight}
              onChangeText={setCustomHeight}
              onBlur={updateCustomSize}
              keyboardType="numeric"
              placeholder="2.0"
            />
          </View>
        </View>
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
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  presetButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    minWidth: '48%',
    alignItems: 'center',
  },
  presetText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  customContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DimensionSelector;