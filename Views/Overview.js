import React, {Component} from 'react';
import {SafeAreaView, Text, View} from "react-native";
import {styles} from "../Settings/Style";

export class Overview extends Component {
    static navigationOptions = {
        title: "Übersicht",
    };

    static color = {
        circle: 'red'
    }

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <View
                    style={[styles.circle,
                        styles.centerThis,
                        {marginTop: 20, marginBottom: 50, backgroundColor: Overview.color.circle}]}/>
                <Text>Parkdauer</Text>
                <Text>H:mm</Text>
                <Text>Kosten</Text>
                <Text>0,00 €</Text>
            </SafeAreaView>
        );
    }
}