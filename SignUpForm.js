import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addCustomer } from './databaseActions';  // Adjust the path as needed

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const customer = {
        Name: name,
        Email: email,
        Password: password, // Please ensure this is hashed and secured before being stored
        CustomerID: userCredential.user.uid, // Using Firebase Auth UID as CustomerID
        Area: area
      };
      
      await addCustomer(customer);
      setName('');
      setEmail('');
      setPassword('');
      setArea('');
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="grey"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="grey"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        placeholderTextColor="grey"
        value={area}
        onChangeText={setArea}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {errorMessage && <Text style={styles.errorMessage}>Error: {errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    input: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4,
    },
    successMessage: {
        color: 'green',
        marginTop: 16,
    },
    errorMessage: {
        color: 'red',
        marginTop: 16,
    },
});

export default SignUpForm;
