import React, {Component} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, Text, View} from "react-native";
import {styles} from "../Settings/Style";
import ApiHelper from "../Helper/ApiHelper";

export class Overview extends Component {
    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = {
        title: "Übersicht",
    };

    constructor(props) {
        super(props);

        this.state = {
            circleColor: 'yellow',
            circleText: "nicht geparkt",
            parkingDuration: "min",
            cost: "0,00",
            refreshing: false,
        };

        ApiHelper.getOverview()
            .then(response => response.json())
            .then(response => this.updateOverview(response))
            .catch(() => this.updateOverview(null));
    }

    updateOverview = (response) => {
        if (response != null &&
            response.bookingId !== null &&
            response.bookingId !== undefined &&
            Number.isInteger(response.bookingId)) {
            let now = Date.now();
            let start = Date.parse(response.parkingStart.substring(0, 19));
            let difference = (now - start) / 60000 + 120;
            let duration = Math.round(difference);
            this.setState({
                circleColor: 'green',
                circleText: "Geparkt",
                cost: response.cost,
                parkingDuration: duration + " min"
            });
        } else
            this.setState({
                circleColor: 'yellow',
                circleText: "nicht geparkt",
                cost: "0,00",
                parkingDuration: "0 min"
        });

        this.setState({refreshing: false})
    };

    refresh = () => {
        this.setState({refreshing: true});
        ApiHelper.getOverview()
            .then(response => response.json())
            .then(response => this.updateOverview(response))
            .catch(() => this.updateOverview(null));
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