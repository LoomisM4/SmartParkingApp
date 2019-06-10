import React, {Component} from 'react';
import {Alert, Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import {getRoute} from "../Settings/Application";
import Ctx from "../Context";

export class ChangeData extends Component {
    static navigationOptions = {
        headerRight: (
            <Button
                onPress={ChangeData.save}
                title="Speichern"
            />
        ),
    };

    static details = {
        email: "",
        password: "",
        street: "",
        nr: "",
        zip: "",
        city: ""
    };

    constructor(props) {
        super(props);

        // get information about the user, to fill the form
        fetch(getRoute("resolve"), {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + Ctx.token
            }
        })
            .then(response => response.json())
            .then(response => this.handleResponse(response))
            .catch(error => Alert.alert("Fehler", error));
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally, {marginTop: 10}]}>
                <TextInput style={styles.textInput}
                    placeholder={"Straße"}
                    textContentType={"streetAddressLine1"}
                    onChangeText={text => ChangeData.details.street = text}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Nr."}
                    textContentType={"telephoneNumber"}
                    onChangeText={text => ChangeData.details.nr = text}
                />
                <TextInput style={styles.textInput}
                    placeholder={"PLZ"}
                    textContentType={"postalCode"}
                    onChangeText={text => ChangeData.details.zip = text}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Ort"}
                    textContentType={"addressCity"}
                    onChangeText={text => ChangeData.details.city = text}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Passwort"}
                    contentType={"password"}
                    secureTextEntry={true}
                    onChangeText={text => ChangeData.details.password = text}
                />
            </SafeAreaView>
        );
    };

    handleResponse = (response) => {
        ChangeData.details.email = response.username;
        // ChangeData.details.street = response.address.street;
        // ChangeData.details.nr = response.address.houseNumber;
        // ChangeData.details.zip = response.address.postalCode;
        // ChangeData.details.city = response.address.country;
    };

    static save() {
        // check is every field was filled
        if (ChangeData.details.password.length === 0 ||
            ChangeData.details.street.length === 0 ||
            ChangeData.details.nr.length === 0 ||
            ChangeData.details.zip.length === 0 ||
            ChangeData.details.city.length === 0) {
            // not every field is filled
            Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus");
            return;
        }

        // everything is fine -> save the new information
        fetch(getRoute("resolve/" + ChangeData.details.email), {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: 'Bearer ' + Ctx.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: {
                username: ChangeData.details.email,
                password: ChangeData.details.password,
                address: {
                    street: ChangeData.details.street,
                    houseNumber: ChangeData.details.nr,
                    postalCode: ChangeData.details.zip,
                    country: ChangeData.details.city
                }
            }
        })
            .catch(console.log);
    }
}