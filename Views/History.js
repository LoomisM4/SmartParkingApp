import React, {Component} from 'react';
import {FlatList, SafeAreaView, Text, TouchableHighlight} from "react-native";
import {styles} from "../Settings/Style";

export class History extends Component {
    static navigationOptions = {
        title: "Historie"
    };

    render() {
        return (
            <SafeAreaView style={styles.view}>
                <FlatList
                    data={[]}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <TouchableHighlight onPress={_ => itemPressed(item, this.props)}>
                            <Text style={styles.listItem}>{item.key}</Text>
                        </TouchableHighlight>
                    )}
                />
            </SafeAreaView>
        );
    }
}