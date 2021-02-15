import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ActionButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: 'white',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginBottom: 25,
  },
});

export default ActionButton;
