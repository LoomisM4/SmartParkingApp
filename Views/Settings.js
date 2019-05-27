import React, {Component} from 'react';
import {FlatList, SafeAreaView, Text, TouchableHighlight} from "react-native";
import {styles} from "../Settings/Style";

export class Settings extends Component {
    static navigationOptions = {
        title: "Einstellungen"
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
                        <TouchableHighlight onPress={_ => itemPressed(item, this.props)}>
                            <Text style={styles.listItem}>{item.key}</Text>
                        </TouchableHighlight>
                    )}
                />
            </SafeAreaView>
        );

        function itemPressed(item, props) {
            switch (item.key) {
                case "Kundendaten ändern":
                    props.navigation.navigate("ChangeData")
                    break;
                case "Zahlungsinformationen bearbeiten":
                    props.navigation.navigate("BillingInformation")
                    break;
                case "Benutzer löschen":
                    deleteUser();
                    break;
                case "Ausloggen":
                    logout(props)
                    break;
                default:
                    Console.log("Something went wrong");
            }
        }
        
        function deleteUser() {
            // TODO
        }

        function logout(props) {
            props.navigation.navigate("Login")
        }
    }

    FlatListItemSeparator = () => {
        return (
            <SafeAreaView style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };
}