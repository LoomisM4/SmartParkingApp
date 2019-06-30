import React, {Component} from 'react';
import {Alert, Button, SafeAreaView, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import ApiHelper from "../Helper/ApiHelper";
import UserHelper from "../Helper/UserHelper";
import {sendAlert, sendErrorAlert} from "../Helper/AlertHelper";

export class ChangeData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "Loading...",
            password: "Loading...",
            street: "Loading...",
            nr: "Loading...",
            zip: "Loading...",
            city: "Loading..."
        };

        // get information about the user, to fill the form
        ApiHelper.getUserInformation()
            .then(response => response.json())
            .then(this.handleResponse)
            .catch(console.log);
    };

    render() {
        return (
            <SafeAreaView style={[styles.view, styles.centerHorizontally, {marginTop: 10}]}>
                <TextInput style={styles.textInput}
                           placeholder={"eMail"}
                           value={this.state.email}
                           textContentType={"emailAddress"}
                           onChangeText={text => this.setState({email: text})}
                />
                <TextInput style={styles.textInput}
                           placeholder={"Straße"}
                           value={this.state.street}
                           textContentType={"streetAddressLine1"}
                           onChangeText={text => this.setState({street: text})}
                />
                <TextInput style={styles.textInput}
                           placeholder={"Nr."}
                           value={this.state.nr}
                           textContentType={"telephoneNumber"}
                           onChangeText={text => this.setState({nr: text})}
                />
                <TextInput style={styles.textInput}
                           placeholder={"PLZ"}
                           value={this.state.zip}
                           textContentType={"postalCode"}
                           onChangeText={text => this.setState({zip: text})}
                />
                <TextInput style={styles.textInput}
                           placeholder={"Ort"}
                           value={this.state.city}
                           textContentType={"addressCity"}
                           onChangeText={text => this.setState({city: text})}
                />
                <TextInput style={styles.textInput}
                           placeholder={"Passwort"}
                           contentType={"password"}
                           onChangeText={text => this.setState({password: text})}
                           secureTextEntry={true}
                />
                <Button
                    onPress={this.save}
                    title="Speichern"
                />
            </SafeAreaView>
        );
    };

    handleResponse = (response) => {
        this.setState({email: response.username});
        this.setState({street: response.addressResponse.street});
        this.setState({nr: response.addressResponse.houseNumber.toString()});
        this.setState({zip: response.addressResponse.postalCode.toString()});
        this.setState({city: response.addressResponse.country});
    };

    save = () => {
        // check is every field was filled
        if (this.state.email.length === 0 ||
            this.state.password.length === 0 ||
            this.state.street.length === 0 ||
            this.state.nr.length === 0 ||
            this.state.zip.length === 0 ||
            this.state.city.length === 0 ||
            this.state.email === "Loading..." ||
            this.state.password === "Loading..." ||
            this.state.street === "Loading..." ||
            this.state.nr === "Loading..." ||
            this.state.zip === "Loading..." ||
            this.state.city === "Loading...") {
            // not every field is filled
            sendAlert("Fehler", "Bitte füllen Sie alle Felder aus");
            return;
        }

        // everything is fine -> save the new information
        ApiHelper.doUpdate(this.state.email, this.state.password, this.state.street, this.state.nr,
            this.state.zip, this.state.city)
            .then(this.props.navigation.pop())
            .catch(sendErrorAlert.bind("Da ist etwas schiefgelaufen"));
    }
}