import React, {Component} from 'react';
import {SafeAreaView, Text} from "react-native";
import {styles} from "../Settings/Style";

export class History extends Component {
    static navigationOptions = {
        title: "Historie"
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <Text>TODO</Text>
            </SafeAreaView>
        );
    }
}