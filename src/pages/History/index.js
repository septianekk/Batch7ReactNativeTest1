import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import firestore from '@react-native-firebase/firestore';
function History({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [laporan, setLaporan] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('laporan')
      .onSnapshot((querySnapshot) => {
        // see next step
        const laporan = [];

        querySnapshot.forEach((documentSnapshot) => {
          laporan.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setLaporan(laporan);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  const handlePress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <FlatList
      data={laporan}
      renderItem={({item}) => (
        <View>
          <Icon
            name="angle-double-left"
            size={35}
            color="#900"
            onPress={handlePress}
            style={{padding: 20}}
          />
          <Text style={styles.title}>Histori List</Text>
          <View style={styles.listItem}>
            <Image source={{uri: item.image}} style={styles.img} />
            <View style={{marginLeft: 20, flex: 1}}>
              <Text>Nama: {item.nama}</Text>
              <Text>Kejadian: {item.kejadian}</Text>
              <Text>Alamat: {item.alamat}</Text>
              <Text>Keterangan: {item.keterangan}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

export default History;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    alignSelf: 'center',
    marginTop: -20,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },

  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
  },
});
