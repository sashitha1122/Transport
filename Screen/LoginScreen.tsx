import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons'; // Make sure you have react-native-vector-icons installed
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../scripts/type';

type LoginScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const handleLogin = () => {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameValid(false);
      isValid = false;
    } else {
      setUsernameValid(true);
    }

    if (password.trim() === "") {
      setPasswordValid(false);
      isValid = false;
    } else {
      setPasswordValid(true);
    }

    if (isValid) {
      navigation.navigate("Home",  { username } );
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require('../assets/images/loginimage1.jpg')}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={[
          styles.inputWrapper,
          usernameValid === false ? styles.invalid : usernameValid === true ? styles.valid : null
        ]}>
          <FontAwesome name="user" size={20} color="#262626" style={styles.inputIcon} />
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {usernameValid === false && <Text style={styles.errorText}>Username is required</Text>}
        
        <View style={[
          styles.inputWrapper,
          passwordValid === false ? styles.invalid : passwordValid === true ? styles.valid : null
        ]}>
          <FontAwesome name="lock" size={20} color="#262626" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {passwordValid === false && <Text style={styles.errorText}>Password is required</Text>}

        <Text style={styles.forgetpasswordText}>Forget Password?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.footerText}>Don't have an account?{""}
            <Text style={{ textDecorationLine: "underline" }}> Create</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",  // Page background color
    flex: 1,
    borderColor: '#ccc',
  },
  topImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: "100%",
  },
  topImage: {
    width: "111%",
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  helloContainer: {
    marginVertical: 20,
  },
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
    marginBottom: 40,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#262626',
  },
  invalid: {
    borderColor: 'red',
  },
  valid: {
    borderColor: 'green',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#262626',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  forgetpasswordText: {
    color: 'blue',
    textAlign: 'right',
    marginTop: 5,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 40,
    fontWeight: "400",
  },
});





