import React, {Component} from 'react';
import {Alert, Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import {getRoute} from "../Settings/Application";
import AsyncStorage from "@react-native-community/async-storage";

export class Register extends Component {
    static navigationOptions = {
        title: "Registrieren"
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally]}>
                <TextInput style={styles.textInput}
                    placeholder={"E-Mail"}
                    contentType={"emailAddress"}
                    onChangeText={text => this.setState({email: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Passwort"}
                    contentType={"password"}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Passwort wiederholen"}
                    textContentType={"password"}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password2: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Straße"}
                    textContentType={"streetAddressLine1"}
                    onChangeText={text => this.setState({street: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Nr."}
                    textContentType={"telephoneNumber"}
                    onChangeText={text => this.setState({nr: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"PLZ"}
                    textContentType={"postalCode"}
                    onChangeText={text => this.setState({zip: text})}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Ort"}
                    textContentType={"addressCity"}
                    onChangeText={text => this.setState({city: text})}
                />
                <Button
                    title={"Registrierung abschließen"}
                    onPress={this.register}
                />
            </SafeAreaView>
        );
    }

    register = () => {
        if (this.state == null ||
            this.state.email == null ||
            this.state.email.length == 0 ||
            this.state.password == null ||
            this.state.password.length == 0 ||
            this.state.password2 == null ||
            this.state.password2.length == 0 ||
            this.state.street == null ||
            this.state.street.length == 0 ||
            this.state.nr == null ||
            this.state.nr.length == 0 ||
            this.state.zip == null ||
            this.state.zip.length == 0 ||
            this.state.city == null ||
            this.state.city.length == 0) {
            // not every field is filled
            Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
            return;
        }

        if (this.state.password != this.state.password2) {
            // password and password2 are not equal
            Alert.alert("Fehler", "Die beiden Passwörter stimmen nicht überein.");
            return;
        }

        // Everything is fine. Do the request
        fetch(getRoute("signup"), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
                address: {
                    street: this.state.street,
                    houseNumber: this.state.nr,
                    postalCode: this.state.zip,
                    country: this.state.city
                }
            }),
        })
            .then(response => response.json())
            .then(response => this.handleResponse(response.token))
            .catch(error => Alert.alert("Fehler", error));
    }

    async handleResponse(token) {
        if (token != undefined) {
            // Login was successful -> we have a token that has to be stored
            await AsyncStorage.setItem("token", token);
            this.props.navigation.navigate("Overview");
        } else {
            // Login failed
            Alert.alert("Fehler", "Ups, da ist etwas schiefgelaufen.");
        }
    }
}