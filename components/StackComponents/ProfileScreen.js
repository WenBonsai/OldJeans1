import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';  // Make sure you've installed this


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

    const handlePickImage = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                uploadImageToFirebase(uri);
            }
        });
    };

    return (
        <View style={styles.container}>
        {/* {user ? ( */}
            <>
                <Text style={styles.emailText}>E-mail: {user ? user.email : "No User"}</Text>
                <Text>Debug: Button should be below</Text>
                <Button title="Log ud" onPress={handleLogOut} />
                <Button title="Upload Image" onPress={handleImageUpload} />
            </>
        {/* ) : (
            <Text>Ingen bruger er logget ind</Text>
        )} */}
    </View>
    
    );
};

// Firebase Storage function
const uploadImageToFirebase = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const filename = new Date().toISOString(); // or any other naming logic you prefer
      const ref = storage().ref(`images/${filename}.jpg`);
      const task = ref.put(blob);
      
      // Listen to task events
      task.on('state_changed', 
        (snapshot) => {
          // Monitor the progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          // Image has been uploaded
          ref.getDownloadURL().then((url) => {
            console.log('Image available at', url);
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
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
