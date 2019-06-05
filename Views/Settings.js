import React, {Component} from 'react';
import {Alert, FlatList, SafeAreaView, Text, TouchableHighlight} from "react-native";
import {styles} from "../Settings/Style";
import AsyncStorage from "@react-native-community/async-storage";
import {getRoute} from "../Settings/Application";

export class Settings extends Component {
    static navigationOptions = {
        title: "Einstellungen",
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <FlatList
                    data={[
                        {key: "Kundendaten ändern"},
                        {key: "Zahlungsinformationen bearbeiten"},
                        {key: "Benutzer löschen"},
                        {key: "Ausloggen"},
                        {key: "App zurücksetzen"}
                    ]}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <TouchableHighlight onPress={_ => this.itemPressed(item)}>
                            <Text style={styles.listItem}>{item.key}</Text>
                        </TouchableHighlight>
                    )}
                />
            </SafeAreaView>
        );
    }

    itemPressed(item) {
        switch (item.key) {
            case "Kundendaten ändern":
                this.props.navigation.navigate("ChangeData");
                break;
            case "Zahlungsinformationen bearbeiten":
                this.props.navigation.navigate("BillingInformation");
                break;
            case "Benutzer löschen":
                this.deleteUser();
                break;
            case "Ausloggen":
                this.logout();
                break;
            case "App zurücksetzen":
                this.resetApp();
                break;
            default:
                Alert.alert("Fehler", "Ups, da ist etwas schiefgelaufen");
        }
    }

    deleteUser() {
        // TODO
        fetch(getRoute("TODO"), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bearer: "TODO",
            }),
        })
            .then(response => response.json())
            .catch(error => Alert.alert("Fehler", error));

        // User is deleted -> to remove the token from the storage do a logout
        this.logout().then(Alert.alert("Auf wiedersehen", "Ihr Account wurde erfolgreich gelöscht."));
    }

    async logout() {
        await AsyncStorage.removeItem("token");
        this.props.navigation.navigate("Login")
    }

    async resetApp() {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login")
    }

    FlatListItemSeparator = () => {
        return (
            <SafeAreaView style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };
}