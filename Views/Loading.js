import React, {Component} from 'react';
import {SafeAreaView, Text} from "react-native";
import {styles} from "../Settings/Style";

export class Loading extends Component {
    render() {
        return (
            <SafeAreaView style={styles.view} onLayout={this.props.navigation.navigate("Login")}>
                <Text>Laden...</Text>
            </SafeAreaView>
        );
    }
}