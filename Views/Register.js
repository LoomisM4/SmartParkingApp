import React, {Component} from 'react';
import {Alert, Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import AsyncStorage from "@react-native-community/async-storage";
import UserHelper from "../Helper/UserHelper";
import ApiHelper from "../Helper/ApiHelper";

export class Register extends Component {
    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = {
        title: "Registrieren"
    };

    state = {
        email: "",
        password: "",
        password2: "",
        street: "",
        nr: "",
        zip: "",
        city: ""
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally, {marginTop: 10}]}>
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
        if (this.state === null ||
            this.state.email === null ||
            this.state.email.length === 0 ||
            this.state.password === null ||
            this.state.password.length === 0 ||
            this.state.password2 == null ||
            this.state.password2.length === 0 ||
            this.state.street === null ||
            this.state.street.length === 0 ||
            this.state.nr === null ||
            this.state.nr.length === 0 ||
            this.state.zip === null ||
            this.state.zip.length === 0 ||
            this.state.city === null ||
            this.state.city.length === 0) {
            // not every field is filled
            Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
            return;
        }

        if (this.state.password !== this.state.password2) {
            // password and password2 are not equal
            Alert.alert("Fehler", "Die beiden Passwörter stimmen nicht überein.");
            return;
        }

        // Everything is fine. Do the request
        ApiHelper.doRegister(this.state.email,
            this.state.password,
            this.state.street,
            this.state.nr,
            this.state.zip,
            this.state.city)
            .then(response => response.json())
            .then(response => this.handleResponse(response.token))
            .catch(error => Alert.alert("Fehler", error));
    };

    async handleResponse(token) {
        if (token !== undefined) {
            // Registration was successful -> we have a token that has to be stored
            await AsyncStorage.setItem("token", token);
            UserHelper.token = token;
            this.props.navigation.navigate("Overview");
        } else {
            // Login failed
            Alert.alert("Fehler", "Ups, da ist etwas schiefgelaufen.");
        }
    }
}