import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const places = [
    { id: '1', latitude: 37.78825, longitude: -122.4324, title: 'Sted 1', description: 'Beskrivelse for sted 1' },
    { id: '2', latitude: 37.78925, longitude: -122.4334, title: 'Sted 2', description: 'Beskrivelse for sted 2' },
    // ... Tilføj flere steder efter behov
];

const LocationMap = () => {
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Tilladelse til adgang til placering blev nægtet');
            return;
        }
        setHasLocationPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
    };

    useEffect(() => {
        getLocationPermission();
    }, []);

    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {places.map(place => (
                <Marker
                    key={place.id}
                    coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                    title={place.title}
                    description={place.description}
                />
            ))}
            {currentLocation && (
                <Marker
                    coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                    title="Din Position"
                    description="Her er du lige nu"
                />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      flex: 1
    }
});

export default LocationMap;
