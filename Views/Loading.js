import React, {Component} from 'react';
import {ActivityIndicator, SafeAreaView} from "react-native";
import {styles} from "../Settings/Style";
import AsyncStorage from "@react-native-community/async-storage";
import Ctx from "../Context";
import {getRoute} from "../Settings/Application";

export class Loading extends Component {
    valid: Boolean;

    constructor(props) {
        super(props);
        this.seekToken().catch(console.log);
    };

    async navigateToNextView() {
        if (this.valid === true) {
            // Token is valid -> switch to Overview
            this.props.navigation.navigate("Overview");
        } else {
            // no or invalid token-> login
            this.props.navigation.navigate("Login");
        }
    };

    async validateToken() {
        if (Ctx.token != null) {
            // token is available -> validate it
            await fetch(getRoute("validate"), {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + Ctx.token
                }
            })
                .then(response => response.json())
                .then(response => this.valid = response.validated)
                .catch(console.log);
        }

        this.navigateToNextView().catch(console.log);
    };

    async seekToken() {
        await AsyncStorage.getItem("token").then(t => {
            if (t != null) {
                Ctx.token = t.toString();
            }
        });

        this.validateToken().catch(console.log);
    }

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.center]}>
                <ActivityIndicator/>
            </SafeAreaView>
        );
    }


}