import React, { Component } from 'react';
import {
    ScrollView,
} from 'react-native';
import { fetchDecks as fetch } from '../util/storageUtil';
import Deck from './deck';

class DeckList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            listDecks: [],
        };
    }

    componentWillMount() {
        fetch()
            .then((decks) => {
                this.setState({ listDecks: decks });
            });
    }

    handleDeckDetail(deck) {
        const { navigation } = this.props;
        navigation.navigate('Deck', { deck: deck });
    }

    render() {
        const { loading, listDecks } = this.state;

        return (
            <ScrollView style={{ flex: 1 }}>
                {Object.keys(listDecks).map((key, index) => (
                    <Deck
                        deckCount={listDecks[key].questions.length}
                        deckTitle={listDecks[key].title}
                        handleClick={() => {
                            this.handleDeckDetail(listDecks[key]);
                        }}
                        key={index}/>
                ))}
            </ScrollView>
        );
    }
}

export default DeckList;
