import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Platform, View, Alert, Button, Image, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

const CameraScreen = () => {
    const cameraRef = useRef();

    const [hasPermission, setHasPermission] = useState(null);
    const [imageArr, setImageArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        const getPermissions = async () => {
            const cameraPermission = await Camera.requestPermissionsAsync();
    
            let mediaPermission;
            if (Platform.OS !== 'web') {
                mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (mediaPermission.status !== 'granted') {
                    Alert.alert('Permission Denied!', 'Sorry, we need camera roll permissions to make this work.');
                    return;
                }
            }
    
            if (cameraPermission.status !== 'granted') {
                Alert.alert('Permission Denied!', 'Sorry, we need camera permissions to make this work.');
                return;
            }
    
            setHasPermission(cameraPermission.status === 'granted' && (Platform.OS === 'web' || mediaPermission.status === 'granted'));
        };
    
        getPermissions();
    }, []);

    const snap = async () => {
        if (!cameraRef.current) return;
        setLoading(true);
        const result = await cameraRef.current.takePictureAsync();
        setImageArr((imagesArr) => [result].concat(imagesArr));
        setLoading(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageArr((imagesArr) => [result].concat(imagesArr));
        }
    };

    const CameraGallery = () => {
        if (imageArr.length > 0) {
            return (
                <View style={{ flex: 0.4, alignItems: 'center', padding: 10, width: '100%' }}>
                    <Text>Antal billeder: {imageArr.length}</Text>
                    <ScrollView horizontal={true}>
                        {imageArr.map((image, index) => (
                            <TouchableOpacity key={index}>
                                <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, margin: 5 }} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            );
        } else {
            return null;
        }
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.centeredView}>
                <Text>No access to camera</Text>
                <Button title={"Change settings"} onPress={() => Linking.openSettings()} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                        <Text>Flip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={snap}>
                        <Text>{loading ? "Loading..." : "Tag billede"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={pickImage}>
                        <Text>Galleri</Text>
                    </TouchableOpacity>
                </View>
            </Camera>

            <CameraGallery />

            {imageArr.length > 0 && <Image source={{ uri: imageArr[0].uri }} style={{ width: '100%', height: 200 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
    }
});

export default CameraScreen;
