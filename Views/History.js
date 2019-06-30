import React, {Component} from 'react';
import {FlatList, RefreshControl, ScrollView, SafeAreaView, Text} from "react-native";
import {styles} from "../Settings/Style";
import ApiHelper from "../Helper/ApiHelper";

export class History extends Component {
    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = {
        title: "Historie"
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: false,
            emptyText: "Lade Daten..."
        };

        ApiHelper.getHistory()
            .then(response => response.json())
            .then(response => this.handleResponse(response))
            .catch(() => this.setState({emptyText: "Noch keine Einträge vorhanden"}))
    }

    handleResponse = (response) => {
        this.setState({data: response, refreshing: false});
    };

    refresh = () => {
        this.setState({refreshing: true});
        ApiHelper.getHistory()
            .then(response => response.json())
            .then(response => this.handleResponse(response))
            .catch(() => this.setState({refreshing: false}))
    };

    getFormattedString(string) {
        if (string !== null && string.length > 0) {
            let splitted = string.split('T');
            // date is at #0; time is at #1
            return splitted[0] + " " + splitted[1].substring(0, 5);
        }

        return "";
    }

    render() {
        // noinspection JSUnresolvedVariable,JSUnresolvedVariable
        return (
            <SafeAreaView style={styles.view}>
                <ScrollView>
                    <RefreshControl refreshing={this.state.refreshing}
                                    onRefresh={this.refresh}/>
                    {this.state.data.length > 0 ?
                        <FlatList
                            data={this.state.data}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                                <SafeAreaView>
                                    <Text style={styles.listItem}>Preis: {item.cost}</Text>
                                    <Text style={styles.listItem}>Start: {this.getFormattedString(item.parkingStart)}</Text>
                                    <Text style={styles.listItem}>Ende: {this.getFormattedString(item.parkingEnd)}</Text>
                                </SafeAreaView>
                            )}
                        /> :
                        <Text>{this.state.emptyText}</Text>}
                </ScrollView>
            </SafeAreaView>
        );
    }

    FlatListItemSeparator = () => {
        return (
            <SafeAreaView style={{height: 1, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };
}