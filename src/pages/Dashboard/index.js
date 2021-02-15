import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CardViewWithImage} from 'react-native-simple-card-view';
import {colors} from '../../global/colors';
import {warningImg} from '../../assets';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
const Dashboard = ({navigation}) => {
  const [state, setState] = useState({
    counter: 1,
  });
  const logout = () => {
    console.log('SignOut');
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('error sign out', error);
        navigation.navigate('Login');
      });
  };

  const moveTo = (where) => {
    navigation.navigate(where);
  };

  const pushPanicButton = () => {
    if (state.counter < 3) {
      let dummyCounter = state.counter;
      setState({counter: dummyCounter + 1});
    } else {
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          (info) => {
            const {coords} = info;

            console.log(coords.latitude);
            console.log(coords.longitude);
            let uniqueId = Date.now();
            database()
              .ref('/maps/' + uniqueId)
              .set({
                email: email,
                latitude: coords.latitude,
                longitude: coords.longitude,
              })
              .then(() => {
                Alert.alert(
                  'Panic Button',
                  `Dilaporkan kejadian di lokasi  ${coords.latitude} , ${coords.longitude}`,
                );
                setState({counter: 1});
              });
          },
          (error) => console.log(error),
          {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000,
          },
        );
      }
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <CardViewWithImage
          width={180}
          source={{
            uri:
              'https://img.icons8.com/color/70/000000/administrator-male.png',
          }}
          title={'Laporan'}
          onPress={() => moveTo('Laporan')}
        />
        <CardViewWithImage
          width={180}
          source={{
            uri: 'https://img.icons8.com/dusk/70/000000/checklist.png',
          }}
          title={'History Laporan'}
          onPress={() => moveTo('History')}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <CardViewWithImage
          width={180}
          source={{
            uri:
              'https://i.pinimg.com/originals/61/9d/13/619d13147cd5de7c813be306b9d87981.png',
          }}
          title={'Maps'}
          onPress={() => moveTo('Maps')}
        />
        <CardViewWithImage
          width={180}
          source={{
            uri: 'https://image.flaticon.com/icons/png/512/130/130925.png',
          }}
          onPress={logout}
          title={'Sign out'}
        />
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.cardRounded} onPress={pushPanicButton}>
          <Image source={warningImg} style={styles.cardImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.default,
    borderRadius: 15,
    padding: 10,
    height: 100,
  },
  container2: {
    alignItems: 'center',
    marginTop: 100,
  },
  cardImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  cardRounded: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    //flexBasis: '42%',
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
