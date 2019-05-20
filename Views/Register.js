import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";

export class Register extends Component {
    static navigationOptions = {
        title: "Registrieren"
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <TextInput
                    placeholder={"Name"}
                    textContentType={"name"}
                />
                <TextInput
                    placeholder={"E-Mail"}
                    contentType={"emailAddress"}
                />
                <TextInput
                    placeholder={"Passwort"}
                    contentType={"password"}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder={"Passwort wiederholen"}
                    textContentType={"password"}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder={"Strasse"}
                    textContentType={"streetAddressLine1"}
                />
                <TextInput
                    placeholder={"Nr."}
                    textContentType={"telephoneNumber"}
                />
                <TextInput
                    placeholder={"PLZ"}
                    textContentType={"postalCode"}
                />
                <TextInput
                    placeholder={"Ort"}
                    textContentType={"addressCity"}
                />
                <Button
                    title={"Registrierung abschließen"}
                    onPress={_ => this.props.navigation.goBack()}
                />
            </SafeAreaView>
        );
    }
}