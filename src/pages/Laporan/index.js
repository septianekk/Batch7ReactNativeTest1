import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {Input} from '../../components';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../global';
import uuid from 'react-native-uuid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Laporan = ({navigation}) => {
  const [state, setState] = useState({
    nama: '',
    kejadian: '',
    alamat: '',
    keterangan: '',
    imageUri: '',
  });

  const [ImageUri, setImageUri] = useState();
  const [fileExtension, setExtension] = useState();
  const uniqId = uuid.v4();
  const id = uniqId.toUpperCase();
  const fileName = `${id}.${fileExtension}`;
  console.log(fileName);

  const handlePress = () => {
    navigation.navigate('Dashboard');
  };

  const addLaporan = () => {
    // console.log('Laporan masuk');
    // firestore()
    //   .collection('users')
    //   .doc(state.email)
    //   .set({
    //     nama: state.nama,
    //     kejadian: state.kejadian,
    //     alamat: state.alamat,
    //     keterangan: state.keterangan,
    //   })
    //   .then(() => {
    //     navigation.navigate('Dashboard');
    //     console.log('Laporan Tersimpan');
    //   })
    //   .catch((error) => {
    //     Alert.alert('Maaf Gagal Simpan', JSON.stringify(error));
    //   });
    const currentDate = new Date();
    const tanggal = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()} ${(
      '0' + currentDate.getHours()
    ).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${(
      '0' + currentDate.getSeconds()
    ).slice(-2)}`;
    console.log(tanggal);
    if (ImageUri) {
      const storageRef = storage().ref(`images/${fileName}`);
      storageRef.putFile(`${ImageUri}`).on(
        storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log('snapshot: ' + snapshot.state);
          console.log(
            'progress: ' +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          if (snapshot.state === storage.TaskState.SUCCESS) {
            console.log('Success');
          }
        },
        (error) => {
          console.log('image upload error: ' + error.toString());
        },
        () => {
          storageRef.getDownloadURL().then((downloadUrl) => {
            console.log('File available at: ' + downloadUrl);
            const data = {
              id: id,
              kejadian: state.kejadian,
              nama: state.nama,
              alamat: state.alamat,
              keterangan: state.keterangan,
              image: downloadUrl,
              waktu: tanggal,
            };
            firestore()
              .collection('laporan')
              .doc(id)
              .set(data)
              .then(() => {
                navigation.navigate('Dashboard');
                Alert.alert('Laporan Tersimpan');
                console.log('Laporan Tersimpan');
              })
              .catch((error) => {
                alert(error);
              });
          });
        },
      );
    }
  };

  const captureImage = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setImageUri(response.uri);
      setExtension(response.uri.split('.').pop());
    });
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setImageUri(response.uri);
      setExtension(response.uri.split('.').pop());
    });
  };

  return (
    <View style={{padding: 20, marginTop: 20}}>
      <ScrollView>
        <Icon
          name="angle-double-left"
          size={35}
          color="#900"
          onPress={handlePress}
        />
        <Text style={styles.text}>Register Account</Text>
        <Text style={styles.textInput}>Nama: </Text>
        <Input
          placeholder="Masukan Nama"
          value={state.nama}
          onChangeText={(text) => setState({...state, nama: text})}
        />
        <Text style={styles.textInput}>Kejadian: </Text>
        <Picker
          selectedValue={state.kejadian}
          style={styles.pick}
          onValueChange={(itemValue) =>
            setState({...state, kejadian: itemValue})
          }>
          <Picker.Item label="Pilih" />
          <Picker.Item label="Perampokan" value="perampokan" />
          <Picker.Item label="Bencana" value="bencana" />
          <Picker.Item label="Pembunuhan" value="pembunuhan" />
        </Picker>
        <Text style={styles.textInput}>Alamat: </Text>
        <Input
          placeholder="Masukan Alamat"
          value={state.alamat}
          onChangeText={(text) => setState({...state, alamat: text})}
        />
        <Text style={styles.textInput}>Keterangan: </Text>
        <TextInput
          placeholder="Masukan Keterangan"
          multiline={true}
          numberOfLines={4}
          value={state.keterangan}
          style={styles.input}
          onChangeText={(text) => setState({...state, keterangan: text})}
        />
        <View style={styles.container}>
          <View style={{borderWidth: 2, borderColor: 'black'}}>
            <Image source={{uri: ImageUri}} style={styles.imageStyle} />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => captureImage('photo')}>
            <Text style={styles.textStyle}>Launch Camera for Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => chooseFile('photo')}>
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={addLaporan}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            Buat Laporan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Laporan;

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginBottom: 25,
    marginTop: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
    maxWidth: 400,
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 14,
    color: colors.dark,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  pick: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 14,
    color: colors.dark,
    marginBottom: 20,
    textAlignVertical: 'top',
    height: 50,
    width: 150,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
});
