import React, {Component} from 'react';
import {SafeAreaView, ActivityIndicator, Alert} from "react-native";
import {styles} from "../Settings/Style";
import AsyncStorage from "@react-native-community/async-storage";
import {getRoute} from "../Settings/Application";

export class Loading extends Component {
    constructor(props) {
        super(props);
        this.seekToken();
    }

    async seekToken() {
        const token = await AsyncStorage.getItem("token");
        if (token != null) {
            // // token is available -> validate it
            // fetch(getRoute("validate"), {
            //     method: 'GET',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         bearer: token,
            //     }),
            // })
            //     .then(response => response.json())
            //     .then(response => {
            //         if (response.validated)
            //         // Token is valid -> switch to Overview
            //             this.props.navigation.navigate("Overview");
            //         else
            //         // Token not valid -> User has to login again
            //             this.props.navigation.navigate("Login");
            //     })
            //     .catch(error => Alert.alert("Fehler", error));
            this.props.navigation.navigate("Overview");
        } else {
            // no token -> login
            this.props.navigation.navigate("Login");
        }
    }

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.center]}>
                <ActivityIndicator/>
            </SafeAreaView>
        );
    }


}