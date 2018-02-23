import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
} from 'react-native';

class StartQuiz extends Component {
    constructor(props) {
        super(props);

        const { deck } = this.props;

        this.state = {
            loading: false,
            question: '',
            answer: '',
            current: 1,
            correct: 0,
            incorrect: 0,
            deck,
        };
    }

    onCorrect() {
        this.setState({ current: this.state.current + 1 });
        this.setState({ correct: this.state.correct + 1 });
    }

    onIncorrect() {
        this.setState({ current: this.state.current + 1 });
        this.setState({ incorrect: this.state.incorrect + 1 });
    }

    restartQuiz() {
        this.setState({ current: 1, correct: 0, incorrect: 0 });
    }

    goBack() {
        this.restartQuiz();
        const { onCancel } = this.props;
        onCancel();
    }

    render() {
        const { onCancel, visible, deck } = this.props;
        const { current, correct, incorrect } = this.state;

        const labelStatus = <Text>{current}/{deck.questions.length}</Text>;
        const finish = current > deck.questions.length;
        return (
            <Modal
                animationType={'slide'}
                onRequestClose={this.goBack.bind(this)}
                transparent
                visible={visible}>
                <View style={{ flex: 1, backgroundColor: 'blue' }}>
                    {!finish && <View>
                        {labelStatus}
                        <Text>{deck.questions[current-1].question}</Text>
                        <Button
                            onPress={this.onCorrect.bind(this)}
                            title='Correct'/>
                        <Button
                            onPress={this.onIncorrect.bind(this)}
                            title='Incorrect'/>
                    </View>}
                    {finish && <View>

                        <Text>Você acertou {correct} de {deck.questions.length}</Text>
                        <Button
                            onPress={this.restartQuiz.bind(this)}
                            title='Reiniciar'/>
                        <Button
                            onPress={this.goBack.bind(this)}
                            title='Voltar'/>
                    </View>}
                </View>
            </Modal>
        );
    }
}

export default StartQuiz;
