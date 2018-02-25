import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
} from 'react-native';
import AddCardModal from './modal/addCard';
import StartQuizModal from './modal/startQuiz';
import autobind from 'autobind-decorator';
import { fetchDecks as fetch } from '../util/storage';

class DeckDetail extends Component {
    constructor(props) {
        super(props);
        const { deck } = this.props.navigation.state.params;

        this.state = {
            loading: false,
            visibleAdd: false,
            visibleQuiz: false,
            deck: deck,
        };
    }

    @autobind
    onCancel() {
        this.setState({ visibleAdd: false, visibleQuiz: false });
    }

    @autobind
    onCardAdd() {
        const { deck } = this.state;
        fetch()
            .then((decks) => {
                this.setState({ deck: decks[deck.title] });
                this.setState({ visibleAdd: false });
            });
    }

    @autobind
    handleAddCard() {
        this.setState({ visibleAdd: true });
    }

    @autobind
    handleQuiz() {
        this.setState({ visibleQuiz: true });
    }

    render() {
        const { visibleAdd, visibleQuiz, deck } = this.state;
        const countQuest = deck.questions.length;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginBottom: 10 }}>
                <AddCardModal
                    deck={deck}
                    onCancel={this.onCancel}
                    onCardAdd={this.onCardAdd}
                    visible={visibleAdd}/>
                <StartQuizModal
                    deck={deck}
                    onCancel={this.onCancel}
                    visible={visibleQuiz}/>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{`${countQuest} cards`}</Text>


                <TouchableOpacity
                    onPress={this.handleAddCard}>
                    <View
                      style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Add Cards</Text>
                    </View>
                </TouchableOpacity>

                {countQuest >= 1 && <TouchableOpacity
                    onPress={this.handleQuiz}>
                    <View
                      style={{ width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', paddingTop: 15, paddingBottom: 15, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Start Quiz</Text>
                    </View>
                </TouchableOpacity>}
            </View>
        );
    }
}

export default DeckDetail;
