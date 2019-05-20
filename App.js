import React from 'react';
import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import {Login} from "./Views/Login";
import {Register} from "./Views/Register";
import {Loading} from "./Views/Loading";

const loginOrRegister = createStackNavigator(
    {
    Login: Login,
    Register: Register,
    }
);

const App = createAppContainer(createSwitchNavigator(
    {
        Loading: Loading,
        Authentication: loginOrRegister,
    },
    {
        initialRouteName: "Loading"
    }));

export default App;

