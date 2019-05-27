import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";

export class ChangeData extends Component {
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
                    placeholder={"E-Mail"}
                    contentType={"emailAddress"}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Passwort"}
                    contentType={"password"}
                    secureTextEntry={true}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Passwort wiederholen"}
                    textContentType={"password"}
                    secureTextEntry={true}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Straße"}
                    textContentType={"streetAddressLine1"}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Nr."}
                    textContentType={"telephoneNumber"}
                />
                <TextInput style={styles.textInput}
                    placeholder={"PLZ"}
                    textContentType={"postalCode"}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Ort"}
                    textContentType={"addressCity"}
                />
            </SafeAreaView>
        );
    }

    static save() {
        // TODO
    }
}