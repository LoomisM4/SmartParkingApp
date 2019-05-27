import React, {Component} from 'react';
import {SafeAreaView} from "react-native";

export class Loading extends Component {
    render() {
        return (
            <SafeAreaView onLayout={this.props.navigation.navigate("Login")}/>
        );
    }
}