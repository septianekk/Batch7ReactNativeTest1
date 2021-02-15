import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Input} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Register = ({navigation}) => {
  const [state, setState] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmpassword: '',
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
    alert(JSON.stringify(state));
  };

  const handlePress = () => {
    navigation.navigate('WelcomeAuth');
  };

  const registUser = () => {
    console.log('test regist');
    auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((response) => {
        console.log('User account created');
        console.log('responseNIHBOS' + response);
        firestore()
          .collection('users')
          .doc(state.email)
          .set({
            name: state.fullName,
            email: state.email,
            phone: state.phone,
            address: state.address,
          })
          .then(() => {
            navigation.navigate('Dashboard');
          });
      });
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
        <Text style={styles.text}>Register Account</Text>
        <Input
          placeholder="Name"
          value={state.fullName}
          onChangeText={(text) => setState({...state, fullName: text})}
        />
        <Input
          placeholder="Email"
          value={state.email}
          onChangeText={(text) => setState({...state, email: text})}
        />
        <Input
          placeholder="Phone"
          value={state.phone}
          onChangeText={(text) => setState({...state, phone: text})}
        />
        <Input
          placeholder="Address"
          value={state.address}
          onChangeText={(text) => setState({...state, address: text})}
        />
        <Input
          placeholder="Password"
          value={state.password}
          secureTextEntry
          onChangeText={(text) => setState({...state, password: text})}
        />
        <Input
          placeholder="Re-Password"
          value={state.confirmpassword}
          secureTextEntry
          onChangeText={(text) => setState({...state, confirmpassword: text})}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={registUser}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            Register
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
    marginTop: 20,
  },
});

export default Register;
