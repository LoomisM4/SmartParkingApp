import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    view: {
        flex: 1,
    },

    content: {
        padding: 20,
    },

    information: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: -20,
    },

    textInput: {
        width: '80%',
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        alignSelf: 'center'
    },

    listItem: {
        fontSize: 20,
        margin: 5
    },

    centerThis: {
        alignSelf: 'center'
    },

    center: {
        alignContent: 'center',
        justifyContent: 'center'
    },

    centerHorizontally: {
        alignContent: 'center'
    },

    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
    }
});