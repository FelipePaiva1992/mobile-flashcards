import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';
import { createDeck } from '../util/storage';

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

        if(text.length <= 0) {
            return;
        }

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
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    placeholder='New Deck Title'
                    onChangeText={(text) => this.setState({ text })}
                    value={text}
                    style={{ width: 300, fontSize: 16, padding: 20 }}/>
                <Button
                    onPress={this.handleDeckCreation.bind(this)}
                    title='Add New Deck'/>
            </View>
        );
    }
}

export default AddDeck;
