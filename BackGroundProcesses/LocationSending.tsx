import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
  }
};

const PermissionsButton = () => (
  <TouchableOpacity onPress={requestPermissions}>
    <Text>Enable background location</Text>
  </TouchableOpacity>
);
TaskManager.defineTask('update location', ({ data, error }) => {
  if (error) {
    alert('Background location error: ' + error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    setInterval(() => 
        updateLocation()
    , 5000);
    const updateLocation = () => {
        fetch("put the endpoint for the nearest responder", {
          method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
            }),
        });
      };
    };    
});

export default PermissionsButton;
