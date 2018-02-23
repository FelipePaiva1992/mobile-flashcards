import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import AddCardModal from './modal/addCard';
import StartQuizModal from './modal/startQuiz';
import autobind from 'autobind-decorator';
import { fetchDecks as fetch } from '../util/storageUtil';

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
                this.setState({ visible: false });
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
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'green', marginBottom: 10 }}>
                <AddCardModal
                    deck={deck}
                    onCancel={this.onCancel}
                    onCardAdd={this.onCardAdd}
                    visible={visibleAdd}/>
                <StartQuizModal
                    deck={deck}
                    onCancel={this.onCancel}
                    visible={visibleQuiz}/>
                <Text>{`${countQuest} cards`}</Text>

                <Button
                    onPress={this.handleAddCard}
                    title='Add Cards'/>

                <Button
                    onPress={this.handleQuiz}
                    title='Start Quiz'/>
            </View>
        );
    }
}

export default DeckDetail;
