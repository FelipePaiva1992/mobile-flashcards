import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';
import { createDeck } from '../util/storageUtil';

class AddDeck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            text: '',
        };
    }

    handleDeckCreation() {
        const { text } = this.state;
        const { navigation } = this.props;

        const newDeck = { [text]: { title: text, questions: [] }};
        createDeck(newDeck)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((e) => {
                console.debug(e)
            });
    }

    render() {
        const { loading, text } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder='Deck Title'
                    onChangeText={(text) => this.setState({ text })}
                    value={text}/>
                <Button
                    onPress={this.handleDeckCreation.bind(this)}
                    title='Add'/>
            </View>
        );
    }
}

export default AddDeck;
