import React, {Component} from 'react';
import {SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";

export class BillingInformation extends Component {
    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally, {marginTop: 10}]}>
                <TextInput style={styles.textInput}
                    placeholder={"IBAN"}
                />
            </SafeAreaView>
        );
    }

    save = () => {
        // TODO
    }
}