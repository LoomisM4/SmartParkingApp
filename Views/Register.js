import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";

export class Register extends Component {
    static navigationOptions = {
        title: "Registrieren"
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally]}>
                <TextInput style={styles.textInput}
                    placeholder={"Name"}
                    textContentType={"name"}
                />
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
                <Button
                    title={"Registrierung abschließen"}
                    onPress={_ => register(this.props)}
                />
            </SafeAreaView>
        );

        function register(props) {
            // TODO

            props.navigation.goBack();
        }
    }
}