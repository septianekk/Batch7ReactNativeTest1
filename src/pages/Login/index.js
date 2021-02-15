import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Input} from '../../components';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/FontAwesome';
const Login = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  // const InputChange = (value, input) => {
  //   setFormData({
  //     ...formData,
  //     // fullName: value,
  //     // email: value,
  //     // phone: value,
  //     // address: value,
  //     // password: value,
  //     // confirmpassword: value,
  //     [input]: value,
  //   });
  // };

  const sendData = () => {
    console.log('Kirim data', formData);
  };

  const loginUser = () => {
    console.log('Test Register');
    auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((response) => {
        console.log('User account  signed in!');
        console.log('RESPONSE LOGIN' + response);
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const handlePress = () => {
    navigation.navigate('WelcomeAuth');
  };

  return (
    <View style={{padding: 20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Icon
          name="angle-double-left"
          size={35}
          color="#900"
          onPress={handlePress}
        />
        <Text style={styles.text}>Login Account</Text>
        <Input
          placeholder="Email"
          value={state.email}
          onChangeText={(text) => setState({...state, email: text})}
        />
        <Input
          placeholder="Password"
          value={state.password}
          secureTextEntry
          onChangeText={(text) => setState({...state, password: text})}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={loginUser}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBack: {
    marginBottom: 5,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
    maxWidth: 400,
    marginBottom: 20,
  },
  inputForm: {
    marginBottom: 15,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginBottom: 25,
  },
});

export default Login;
