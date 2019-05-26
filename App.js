import React from 'react';
import {createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Login} from "./Views/Login";
import {Register} from "./Views/Register";
import {Loading} from "./Views/Loading";
import {History} from "./Views/History";
import {Overview} from "./Views/Overview";
import {Settings} from "./Views/Settings";

const loginOrRegister = createStackNavigator(
    {
    Login: Login,
    Register: Register,
    }
);

const mainApp = createBottomTabNavigator(
    {
        Overview: Overview,
        History: History,
        Settings: Settings,
    }
)

const App = createAppContainer(createSwitchNavigator(
    {
        Loading: Loading,
        Authentication: loginOrRegister,
        Main: mainApp
    },
    {
        initialRouteName: "Loading"
    }));

export default App;

