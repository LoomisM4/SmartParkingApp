import React, {Component} from 'react';
import {AsyncStorage, SafeAreaView, ActivityIndicator} from "react-native";
import {styles} from "../Settings/Style";

export class Loading extends Component {
    constructor(props) {
        super(props);
        this.seekToken();
    }

    async seekToken() {
        const token = await AsyncStorage.getItem("token");
        if (token != null) {
            // token is available -> switch to Overview
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