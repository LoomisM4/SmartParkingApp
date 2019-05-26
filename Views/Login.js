import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput, Text, TouchableHighlight} from "react-native";
import {styles} from "../Settings/Style";

export class Login extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <SafeAreaView style={[styles.view, {marginTop: '70%'}]}>
                <TextInput style={styles.textInput}
                    placeholder={"E-Mail"}
                    textContentType={"emailAddress"}
                />
                <TextInput style={styles.textInput}
                    placeholder={"Password"}
                    textContentType={"password"}
                    secureTextEntry={true}
                />
                <Button style={styles.content}
                    onPress={_ => this.props.navigation.navigate("Overview")}
                    title={"Login"}
                />
                <Text style={[styles.center, {marginTop: 5}]}>oder
                    <Text
                        style={{color: 'blue'}}
                        onPress={_ => this.props.navigation.navigate("Register")}> Registrieren
                    </Text>
                </Text>
            </SafeAreaView>
        );

        function login() {
            // TODO
        }
    }
}