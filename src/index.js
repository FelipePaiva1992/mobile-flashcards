import React, { Component } from 'react';
import { View } from 'react-native';
import { setNotification } from './util/notificationUtil';
import { StackNavigator as stackNavigator, TabNavigator as tabNavigator } from 'react-navigation';
import DeckList from './components/deckList';
import AddDeck from './components/addDeck';
import DeckDetail from './components/deckDetail';

const tabNav = tabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'My Decks',
        },
    },
    NewDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
        },
    },
}
);

const RootStack = stackNavigator({
    Home: {
        screen: tabNav,
        navigationOptions: {
            title: 'FlackCards',
        },
    },
    Deck: {
        screen: DeckDetail,
        navigationOptions: {
            title: 'My Deck',
        },
    },
},
{
    initialRouteName: 'Home',
});

export default class Index extends Component {
    componentDidMount() {
        setNotification();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RootStack />
            </View>
        );
    }
}
