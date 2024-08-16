import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// InputField Component: A reusable input field with custom styling
const InputField = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}  // Placeholder text
        secureTextEntry={secureTextEntry}  // Password field toggle
        value={value}  // Current value of the input field
        onChangeText={onChangeText}  // Function to handle text change
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default InputField;
