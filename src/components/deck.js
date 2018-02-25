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
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 100, backgroundColor: 'blue', marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{deckTitle}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{deckCount} cards</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Deck;
