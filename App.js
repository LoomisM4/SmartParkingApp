import React from 'react';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import {Login} from "./Views/Login";
import {Register} from "./Views/Register";
import {Loading} from "./Views/Loading";
import {History} from "./Views/History";
import {Overview} from "./Views/Overview";
import {Settings} from "./Views/Settings";
import {ChangeData} from "./Views/ChangeData";
import {BillingInformation} from "./Views/BillingInformation";

const authenticationStack = createStackNavigator(
    {
        Login: Login,
        Register: Register,
    }
);

const settingsStack = createStackNavigator(
    {
        Settings: Settings,
        ChangeData: ChangeData,
        BillingInformation: BillingInformation
    }
);

const historyStack = createStackNavigator(
    {
        History: History
    }
);

const mainApp = createBottomTabNavigator(
    {
        Overview: Overview,
        History: {
            navigationOptions: {
                title: "Historie"
            },
            screen: historyStack
        },
        Settings: {
            navigationOptions: {
                title: "Einstellungen"
            },
            screen: settingsStack
        }
    }
);

const App = createAppContainer(createSwitchNavigator(
    {
        Loading: Loading,
        Authentication: authenticationStack,
        Main: mainApp,
    },
    {
        initialRouteName: "Loading"
    })
);

export default App;

