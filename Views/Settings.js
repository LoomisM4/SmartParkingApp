import React, {Component} from 'react';
import {FlatList, SafeAreaView, Text, TouchableHighlight} from "react-native";
import {styles} from "../Settings/Style";
import AsyncStorage from "@react-native-community/async-storage";
import {sendAlert, sendErrorAlert} from "../Helper/AlertHelper";
import ApiHelper from "../Helper/ApiHelper";

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
                        <TouchableHighlight onPress={() => this.itemPressed(item)}>
                            <Text style={styles.listItem}>{item.key}</Text>
                        </TouchableHighlight>
                    )}
                />
            </SafeAreaView>
        );
    }

    itemPressed = (item) => {
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
                this.logout().then(console.log.bind(this, "Der Benutzer hat sich ausgeloggt"));
                break;
            case "App zurücksetzen":
                this.resetApp().then(console.log.bind(this, "App wurde durch den Benutzer zurückgesetzt"));
                break;
            default:
                sendErrorAlert("Ups, da ist etwas schiefgelaufen");
        }
    };

    deleteUser = () => {
        ApiHelper.doDelete()
            .then(this.handlePostDeleteStuff)
            .catch(console.log);
    };

    handlePostDeleteStuff = () => {
        // User is deleted -> to remove the token from the storage do a logout
        this.logout().then(sendAlert.bind(this, "Auf wiedersehen", "Ihr Account wurde erfolgreich gelöscht."));
    };

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
            <SafeAreaView style={{height: 1, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };
}