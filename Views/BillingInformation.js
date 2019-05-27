import React, {Component} from 'react';
import {SafeAreaView, TextInput, Button} from "react-native";
import {styles} from "../Settings/Style";

export class BillingInformation extends Component {
    static navigationOptions = {
        headerRight: (
            <Button
                onPress={_ => this.save()}
                title="Speichern"
            />
        ),
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, {marginTop: 10}]}>
                <TextInput style={styles.textInput}
                    placeholder={"IBAN"}
                />
            </SafeAreaView>
        );
    }

    static save() {
        // TODO
    }
}