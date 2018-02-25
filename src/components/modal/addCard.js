import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Modal,
} from 'react-native';
import { addQuestionForDeck } from '../../util/storage';

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

        if(question.length <= 0 || answer.length <= 0) {
            return;
        }

        const newQuestion = {
            question: question,
            answer: answer,
        };
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
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Question'
                        onChangeText={(question) => this.setState({ question })}
                        value={question}
                        style={{ width: 300, fontSize: 16, padding: 20 }}/>
                    <TextInput
                        placeholder='Answer'
                        onChangeText={(answer) => this.setState({ answer })}
                        value={answer}
                        style={{ width: 300, fontSize: 16, padding: 20 }}/>
                    <Button
                        onPress={this.handleDeckCreation.bind(this)}
                        title='Add New Card'/>
                </View>
            </Modal>
        );
    }
}

export default AddCard;
