import React, {Component} from 'react';
import {Button, RefreshControl, ScrollView, SafeAreaView, Text, View} from "react-native";
import {styles} from "../Settings/Style";
import ApiHelper from "../Helper/ApiHelper";

export class Overview extends Component {
    static navigationOptions = {
        title: "Übersicht",
    };

    constructor(props) {
        super(props);

        this.state = {
            circleColor: 'yellow',
            circleText: "nicht geparkt",
            parkingDuration: "H:mm",
            cost: "0,00",
            refreshing: false,
        };

        ApiHelper.getOverview()
            .then(response => response.json())
            .then(response => this.updateOverview(response.bookingId))
            .catch(() => this.updateOverview(false));
    }

    updateOverview = (bookingId) => {
        if (bookingId !== null && bookingId !== undefined && Number.isInteger(bookingId))
            this.setState({
                circleColor: 'green',
                circleText: "Geparkt"
            });
        else
            this.setState({
            circleColor: 'yellow',
            circleText: "nicht geparkt"
        });

        this.setState({refreshing: false})
    };

    refresh = () => {
        this.setState({refreshing: true});
        ApiHelper.getOverview()
            .then(response => response.json())
            .then(() => this.updateOverview(true))
            .catch(() => this.updateOverview(false));
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <ScrollView>
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>
                    <View style={[styles.circle,
                        styles.centerThis,
                        styles.center,
                        {marginTop: 20, marginBottom: 50, backgroundColor: this.state.circleColor}]}>
                        <Text style={[styles.centerThis, {fontSize: 40}]}>{this.state.circleText}</Text>
                    </View>
                    <Text style={styles.content}>Parkdauer</Text>
                    <Text style={[styles.content, styles.information]}>{this.state.parkingDuration}</Text>
                    <Text style={styles.content}>Kosten</Text>
                    <Text style={[styles.content, styles.information]}>{this.state.cost} €</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
}