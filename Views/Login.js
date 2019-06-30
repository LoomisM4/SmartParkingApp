import React, {Component} from 'react';
import {Button, SafeAreaView, Text, TextInput} from "react-native";
import {styles} from "../Settings/Style";
import AsyncStorage from "@react-native-community/async-storage";
import {sendAlert, sendErrorAlert} from "../Helper/AlertHelper";
import UserHelper from "../Helper/UserHelper";
import ApiHelper from "../Helper/ApiHelper";

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
                        onPress={() => this.props.navigation.navigate("Register")}> Registrieren
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
            ApiHelper.doLogin(this.state.email, this.state.password)
                .then(response => response.json())
                .then(response => this.handleResponse(response.token))
                .catch(console.log);
        } else {
            // no he did not
            sendAlert("Eingabe überprüfen", "Bitte füllen Sie alle Felder aus.");
        }
    };

    async handleResponse(token) {
        console.log(token);
        if (token !== undefined) {
            // Login was successful -> we have a token that has to be stored
            await AsyncStorage.setItem("token", token);
            UserHelper.token = token;
            this.props.navigation.navigate("Overview");
        } else {
            // Login failed
            sendErrorAlert("Benutzername oder Kennwort falsch");
        }
    }
}