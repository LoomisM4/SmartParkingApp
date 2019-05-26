import React, {Component} from 'react';
import {SafeAreaView, Text} from "react-native";
import {styles} from "../Settings/Style";

export class Overview extends Component {
    static navigationOptions = {
        title: "Übersicht"
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <Text>TODO</Text>
            </SafeAreaView>
        );
    }
}