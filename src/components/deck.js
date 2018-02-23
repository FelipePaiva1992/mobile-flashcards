import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class Deck extends Component {
    render() {
        const { deckTitle, deckCount, handleClick } = this.props;
        return (
            <TouchableOpacity onPress={handleClick}>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 100, backgroundColor: 'green', marginBottom: 10 }}>
                    <Text>{deckTitle}</Text>
                    <Text>{deckCount} cards</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Deck;
