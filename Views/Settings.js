import React, {Component} from 'react';
import {AsyncStorage, FlatList, SafeAreaView, Text, TouchableHighlight} from "react-native";
import {styles} from "../Settings/Style";

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
                        {key: "Ausloggen"}
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
                this.props.navigation.navigate("ChangeData")
                break;
            case "Zahlungsinformationen bearbeiten":
                this.props.navigation.navigate("BillingInformation")
                break;
            case "Benutzer löschen":
                this.deleteUser();
                break;
            case "Ausloggen":
                this.logout()
                    break;
            default:
                Console.log("Something went wrong");
        }
    }

    deleteUser() {
        // TODO
    }

    async logout() {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login")
    }

    FlatListItemSeparator = () => {
        return (
            <SafeAreaView style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };
}