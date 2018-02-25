import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
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
            showAnswer: false,
            deck,
        };
    }

    onCorrect() {
        this.setState({ current: this.state.current + 1 });
        this.setState({ correct: this.state.correct + 1 });
        this.setState({ showAnswer: false })
    }

    onIncorrect() {
        this.setState({ current: this.state.current + 1 });
        this.setState({ incorrect: this.state.incorrect + 1 });
        this.setState({ showAnswer: false })
    }

    onAnswer() {
        this.setState({ showAnswer: !this.state.showAnswer })
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
        const { current, correct, incorrect, showAnswer } = this.state;

        const labelStatus = <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Question Status {current > deck.questions.length? deck.questions.length : current}/{deck.questions.length}</Text>;
        const finish = current > deck.questions.length;
        return (
            <Modal
                animationType={'slide'}
                onRequestClose={this.goBack.bind(this)}
                transparent
                visible={visible}>
                <View style={{ flex: 1, backgroundColor: 'white'}}>
                    {labelStatus}
                    {!finish && <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{!showAnswer ? deck.questions[current-1].question : deck.questions[current-1].answer}</Text>
                        <TouchableOpacity
                            onPress={this.onAnswer.bind(this)}>
                            <View
                              style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{!showAnswer ? 'Show Answer' : 'Show Question'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onCorrect.bind(this)}>
                            <View
                              style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Correct</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onIncorrect.bind(this)}>
                            <View
                              style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Incorrect</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                    {finish && <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>You answered correctly {correct} of {deck.questions.length}</Text>
                        <TouchableOpacity
                            onPress={this.restartQuiz.bind(this)}>
                            <View
                              style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Restart</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.goBack.bind(this)}>
                            <View
                              style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Go Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                </View>
            </Modal>
        );
    }
}

export default StartQuiz;
