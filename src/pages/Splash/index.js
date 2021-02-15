import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);
  }, []);
  return (
    <View style={styles.splash}>
      <Text style={{fontSize: 25, color: '#000'}}>Hello Friends</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splash: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
