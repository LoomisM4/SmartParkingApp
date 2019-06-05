import React, {Component} from 'react';
import {Alert, Button, SafeAreaView, Text, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import {connectionDetails, getRoute} from "../Settings/Application";
import AsyncStorage from "@react-native-community/async-storage";

export class Login extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.center]}>
                <TextInput style={styles.textInput}
                    placeholder={"E-Mail"}
                    textContentType={"emailAddress"}
                    onChangeText={text => this.setState({email: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Password"}
                    textContentType={"password"}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                />
                <Button style={styles.content}
                    onPress={this.login}
                    title={"Login"}
                />
                <Text style={[styles.centerThis, {marginTop: 5}]}>oder
                    <Text
                        style={{color: 'blue'}}
                        onPress={_ => this.props.navigation.navigate("Register")}> Registrieren
                    </Text>
                </Text>
            </SafeAreaView>
        );
    }

    login = () => {
        // check if the user entered data
        if (this.state != null &&
            this.state.email != null &&
            this.state.email.length > 0 &&
            this.state.password != null &&
            this.state.password.length > 0) {
            // yes he did -> try to login
            fetch(getRoute("login"), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password,
                }),
            })
                .then(response => response.json())
                .then(response => this.handleResponse(response.token))
                .catch(error => Alert.alert("Fehler", error));
        } else {
            // no he did not
            Alert.alert("Eingabe überprüfen", "Bitte füllen Sie alle Felder aus.");
        }
    };

    async handleResponse(token) {
        if (token != undefined) {
            // Login was successful -> we have a token that has to be stored
            await AsyncStorage.setItem("token", token);
            this.props.navigation.navigate("Overview");
        } else {
            // Login failed
            Alert.alert("Fehler", "Benutzername oder Kennwort falsch");
        }
    }
}