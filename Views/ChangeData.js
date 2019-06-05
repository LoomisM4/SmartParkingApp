import React, {Component} from 'react';
import {Alert, Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import {getRoute} from "../Settings/Application";

export class ChangeData extends Component {
    static navigationOptions = {
        headerRight: (
            <Button
                onPress={_ => this.save()}
                title="Speichern"
            />
        ),
    };

    constructor(props) {
        super(props);
        // get information about the user, to fill the form
        fetch(getRoute("resolve"), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bearer: "TODO",
            }),
        })
            .then(response => response.json())
            .then(response => this.handleResponse(response))
            .catch(error => Alert.alert("Fehler", error));
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally, {marginTop: 10}]}>
                <TextInput style={styles.textInput}
                    placeholder={"E-Mail"}
                    contentType={"emailAddress"}
                    value={this.state.email}
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
                    value={this.state.street}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Nr."}
                    textContentType={"telephoneNumber"}
                    value={this.state.nr}
                />
                <TextInput style={styles.textInput}
                    placeholder={"PLZ"}
                    textContentType={"postalCode"}
                    value={this.state.zip}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Ort"}
                    textContentType={"addressCity"}
                    value={this.state.city}
                />
            </SafeAreaView>
        );
    };

    handleResponse = (response) => {
        // TODO set details in state
    };

    save = () => {
        // TODO
    }
}