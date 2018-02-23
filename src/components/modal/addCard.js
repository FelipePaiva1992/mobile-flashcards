import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Modal,
} from 'react-native';
import { addQuestionForDeck } from '../../util/storageUtil';

class AddCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            question: '',
            answer: '',
        };
    }

    handleDeckCreation() {
        const { deck } = this.props;
        const { question, answer } = this.state;

        const newQuestion = {
            question: question,
            answer: answer,
        };
        console.log(deck.title)
        addQuestionForDeck(newQuestion, deck.title)
            .then(() => {
                this.props.onCardAdd();
            });
    }

    render() {
        const { onCancel, visible } = this.props;
        const { question, answer } = this.state;
        return (
            <Modal
                animationType={'slide'}
                onRequestClose={onCancel}
                transparent
                visible={visible}>
                <View style={{ flex: 1, backgroundColor: 'blue' }}>
                    <TextInput
                        placeholder='Question'
                        onChangeText={(question) => this.setState({ question })}
                        value={question}/>
                    <TextInput
                        placeholder='Answer'
                        onChangeText={(answer) => this.setState({ answer })}
                        value={answer}/>
                    <Button
                        onPress={this.handleDeckCreation.bind(this)}
                        title='Add'/>
                </View>
            </Modal>
        );
    }
}

export default AddCard;
