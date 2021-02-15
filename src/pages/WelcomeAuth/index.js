import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import ActionButton from './ActionButton';
import {colors} from '../../global/colors';
import {imageWelcome} from '../../assets';
const WelcomeAuth = ({navigation}) => {
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.page}>
      <Image source={imageWelcome} style={styles.illustration} />
      <Text style={styles.welcomeText}>Welcome to App</Text>
      <ActionButton title="Masuk" onPress={() => handlePress('Login')} />
      <ActionButton title="Daftar" onPress={() => handlePress('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  illustration: {
    width: 230,
    height: 150,
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 18,
    color: colors.default,
    marginBottom: 76,
  },
});

export default WelcomeAuth;
