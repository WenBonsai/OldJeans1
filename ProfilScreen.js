import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            // Sign-out successful.
            // Du kan eventuelt tilføje navigation her eller opdatere tilstand for at informere brugeren.
        } catch (error) {
            // An error happened.
            console.error("Der skete en fejl under logud:", error.message);
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.emailText}>E-mail: {user.email}</Text>
                    <Button title="Log ud" onPress={handleLogOut} />
                </>
            ) : (
                <Text>Ingen bruger er logget ind</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    emailText: {
        marginBottom: 16,
        fontSize: 16,
    },
});

export default ProfileScreen;
