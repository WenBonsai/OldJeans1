import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const auth = getAuth();

    const handleLogin = async () => {
        setLoading(true);
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCompleted(true);
            setEmail('');
            setPassword('');
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text>Opret en brugerkonto</Text>
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
                placeholder="Adgangskode"
                placeholderTextColor="grey"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
            
            {isCompleted && <Text style={styles.successMessage}>Brugeren er oprettet med succes!</Text>}
            {errorMessage && <Text style={styles.errorMessage}>Fejl: {errorMessage}</Text>}
        </View>
    );
}

// ... rest of the styles and export remains the same


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

export default LoginForm;
