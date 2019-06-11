import React, {Component} from 'react';
import {Button, SafeAreaView, Text, View} from "react-native";
import {styles} from "../Settings/Style";

export class Overview extends Component {
    static navigationOptions = {
        title: "Übersicht",
    };

    state = {
        circleColor: 'red',
        circleText: "nicht geparkt"
    };

    changeColor = () => {
        if (this.state.circleColor === 'red') {
            this.setState({circleColor: 'green'});
            this.setState({circleText: "Geparkt"})
        }
        else {
            this.setState({circleColor: 'red'});
            this.setState({circleText: "Nicht geparkt"})
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <View style={[styles.circle,
                        styles.centerThis,
                        styles.center,
                        {marginTop: 20, marginBottom: 50, backgroundColor: this.state.circleColor}]}>
                    <Text style={[styles.centerThis, {fontSize: 40}]}>{this.state.circleText}</Text>
                </View>
                <Text style={styles.content}>Parkdauer</Text>
                <Text style={[styles.content, styles.information]}>H:mm</Text>
                <Text style={styles.content}>Kosten</Text>
                <Text style={[styles.content, styles.information]}>0,00 €</Text>
                <Button title={"Ändern"} onPress={this.changeColor}/>
            </SafeAreaView>
        );
    }
}