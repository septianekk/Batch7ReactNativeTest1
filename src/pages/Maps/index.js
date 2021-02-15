import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Icon from 'react-native-vector-icons/FontAwesome';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibG9yZGVrayIsImEiOiJja2w0dXZvZGcwZmVnMm5wampoY2poaW8wIn0.IkRcNdkGIyMmGBC97qwJdg',
);
const Maps = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View style={styles.page}>
      <Icon
        name="angle-double-left"
        size={35}
        color="#900"
        onPress={handlePress}
        style={{marginTop: -70, marginRight: 340, marginBottom: 20}}
      />
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 600,
    width: 600,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
