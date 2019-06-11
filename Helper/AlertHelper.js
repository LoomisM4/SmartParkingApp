import React from 'react';
import {Alert} from "react-native";

export function sendAlert(title, message) {
    Alert.alert(title, message);
}

export function sendErrorAlert(message) {
    Alert.alert("Fehler", message);
}