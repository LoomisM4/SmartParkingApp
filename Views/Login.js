import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";

export class Login extends Component {
    render() {
        return (
            <SafeAreaView style={styles.view}>
                <TextInput
                    placeholder={"E-Mail"}
                    textContentType={"emailAddress"}
                />
                <TextInput
                    placeholder={"Password"}
                    textContentType={"password"}
                    secureTextEntry={true}
                />
                <Button
                    onPress={login}
                    title={"Login"}
                />
                <Button
                    title={"Registrieren"}
                    onPress={_ => this.props.navigation.navigate("Register")}
                />
            </SafeAreaView>
        );

        function login() {
            // TODO
        }
    }
}