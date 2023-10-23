import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImageScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ImageScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ImageScreen;
