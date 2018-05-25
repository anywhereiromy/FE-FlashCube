import React from 'react';
import PT from 'prop-types';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import FlashCard from './flash-card';
import ExitCard from './exit-card';
import RefreshCard from './refresh-card';
import QuestionCard from './question-card';
import AnswerCard from './answer-card';

class Cube extends React.Component {

    state = {
        iteration: 0,
        currentCard: "",
        quizQuestions: this.props.topic.terms,
        questionsAsked: 0,
        correctAnswers: 0,
        currentQuestion: Math.floor(Math.random() * this.props.topic.terms.length),
        rand : Math.random()
    }

    componentDidMount () {
        document.addEventListener('keydown', this.pressSpace);
    }

    componentWillUnmount () {
        document.removeEventListener('keydown', this.pressSpace);
    }

    updateCurrentCard = e => {
        this.setState({currentCard: e});
    }

    exitCube = () => {
        this.props.history.push('/home');
        document.location.reload();
    }

    refreshCards = () => {
        console.log('refreshing cards');
        this.setState({iteration: this.state.iteration + 1});
        document.querySelectorAll('.flashCard').forEach(e => {
            if (!e.getAttribute('text')) e.setAttribute('rotation', {x: 0, y: 0, z: 0});
            if (!e.getAttribute('text')) e.emit('spin');
        });
        console.log('refreshing cards');      
    }

    nextQuestion = (correct) => {
        let quizQuestions = this.state.quizQuestions;
        quizQuestions.splice(this.state.currentQuestion, 1);
        const currentQuestion = Math.floor(Math.random() * quizQuestions.length);
        const correctAnswers = correct ? this.state.correctAnswers + 1 : this.state.correctAnswers;
        this.setState({quizQuestions, currentQuestion, correctAnswers, questionsAsked: this.state.questionsAsked + 1, rand: Math.random()});
    }

    pressSpace = e => {
        console.log("cube", e.keyCode);
        if (e.keyCode === 32) {
            console.log("cube", this.state.currentCard.className);
            console.log("cube", this.state.currentCard.id);
            console.log("cube", this.state.currentCard.getAttribute('rotation'));
            if (this.state.currentCard.className === 'refreshCard') {
                this.state.currentCard.emit('spin');
                this.refreshCards();
            } else if (this.state.currentCard.className === 'flashCard') {
                this.state.currentCard.getAttribute('rotation').y % 360 === 0 ? this.state.currentCard.emit('flipOver') : this.state.currentCard.emit('flipBack');
            } else if (this.state.currentCard.className === 'exitCard') {
                this.state.currentCard.getAttribute('rotation').y % 360 === 0 ? this.state.currentCard.emit('flipOver') : this.state.currentCard.emit('flipBack');       
            } else if (this.state.currentCard.className === 'exitConfirm') {
                this.exitCube();
            } else if (this.state.currentCard.className === 'answerCard') {
                const correct = this.state.currentCard.id === 'correctAnswer';
                document.querySelectorAll('.answerCard').forEach(e => {
                    if (!e.getAttribute('text')) {
                        e.getAttribute('rotation').y % 360 === 0 ? e.emit('flipOver') : e.emit('flipBack');
                    }
                })
                setTimeout(() => {
                    document.querySelectorAll('.answerCard').forEach(e => {
                        if (!e.getAttribute('text')) {
                            e.getAttribute('rotation').y % 360 === 0 ? e.emit('flipOver') : e.emit('flipBack');
                        }
                    })
                    setTimeout(() => {
                        this.nextQuestion(correct)}, 1000);
                }, 3000)
            }
        }
    }

    render () {
        const posArr = [
            {x: -1.5, y: 1.5, z: 2.02}, {x: 0, y: 1.5, z: 2.02}, {x: 1.5, y: 1.5, z: 2.02},
            {x: -1.5, y: 0, z: 2.02}, {x: 1.5, y: 0, z: 2.02},
            {x: -1.5, y: -1.5, z: 2.02}, {x: 0, y: -1.5, z: 2.02}, {x: 1.5, y: -1.5, z: 2.02},
        ];
        const {
            iteration,
            quizQuestions,
            questionsAsked,
            correctAnswers,
            currentQuestion,
            rand
        } = this.state;        
        const { topic } = this.props;

        // const question = {term: 'hello'}
        const question = quizQuestions[currentQuestion];
        let questionIndex = 0;

        topic.terms.forEach((ele, index) => {
            if (ele.definition === question.definition) questionIndex = index;
        })

        let wrongAnswerOne = (questionIndex + 1) % topic.terms.length;
        let wrongAnswerTwo = (questionIndex - 1 + topic.terms.length) % topic.terms.length;

        
        // const answers = [question, topic.terms[wrongAnswerOne], topic.terms[wrongAnswerTwo]]
        const answers = [question];
        let correctArr;
        
        if (rand < (1/3)) {
            answers.push(topic.terms[wrongAnswerOne]);
            answers.push(topic.terms[wrongAnswerTwo]);
            correctArr = [true, false, false];
        } else if (rand < (2/3)) {
            answers.push(topic.terms[wrongAnswerOne]);
            answers.unshift(topic.terms[wrongAnswerTwo]);
            correctArr = [false, true, false];
        } else {
            answers.unshift(topic.terms[wrongAnswerOne]);
            answers.unshift(topic.terms[wrongAnswerTwo]);
            correctArr = [false, false, true];
        }

        // document.addEventListener('keydown', function(event) {
        //     document.querySelectorAll('.listenonkey').forEach(function(obj){
        //       obj.setAttribute('position', '0 0 0');
        //     });
        //   });

        return (
            <Scene>
                <a-assets>
                    <img alt="FlashCube logo" id="logo" src="flashcubelogo.png"/>
                    <img alt="metal" id="metal" src="metal.jpg"/>
                    <img alt="raw beef" id="rawbeef" src="rawbeef.jpg"/>
                    <img alt="cardboard" id="cardboard" src="cardboard.jpg"/>
                    <img alt="cube cursor" id="cubecursor" src="cubecursor.png"/>
                    <img alt="Sean" id="sean" src="sean.jpeg"/>
                    <img alt="Romy" id="romy" src="romy.jpeg"/>
                    <img alt="Nathan" id="nath" src="nath.jpeg"/>
                    <img alt="Dan" id="dan" src="dan.jpg"/>
                    <img alt="Paper" id="paper" src="paper.jpg"/>
                </a-assets>
                <a-entity camera look-controls>
                    <Entity cursor="fuse: true; fuseTimeout: 1"
                        geometry={{primitive: 'ring', "radiusInner": 0.001, 'radiusOuter': 0.002}}
                        material={{color: 'black'}}
                        position={{x: 0, y: 0, z: -0.2}}>
                    </Entity>
                </a-entity>
                <Entity
                    geometry={{primitive: 'plane', width: 4, height: 4, transparent: false}}
                    material={{src: "#logo"}}
                    position={{x: 0, y: 7, z: -2}}>
                    <a-animation attribute="position"
                        dur="3000"
                        begin="0"
                        fill="forwards"
                        from="0 -1 -2"
                        to="0 7 -2"
                        easing="ease-in-cubic"
                        repeat="0"></a-animation>
                </Entity>
                <Entity
                    geometry={{primitive: 'box', width: 8.2, height: 8.2, depth: 8.2}}
                    material={{src: '#metal', color: 'cyan', side: 'back'}}
                    position={{x: 0, y: 0, z: 0}}
                >
                </Entity>
                <Entity geometry={{primitive: 'plane', width: 6, height: 6}}
                    material={{color: 'yellow', opacity: 0}}
                    position={{x: 0, y: 0, z: -5.08}}
                    text={{value: 'Revision'}}
                >
                    <Entity
                        geometry={{primitive: 'plane', width: 5.8, height: 0.5}}
                        material={{src: '#cardboard'}}
                        position={{x: 0, y: 2.65, z: 2.02}}
                        text={{value: this.props.topic.title, height: 0.2, align: 'center', color: 'black', baseline: 'bottom', wrapCount: '40', font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt'}}
                        >
                    </Entity>
                    <Entity
                        geometry={{primitive: 'plane', width: 5.8, height: 0.5}}
                        material={{src: '#cardboard'}}
                        position={{x: 0, y: -2.65, z: 2.02}}
                        text={{value: 'Revision', align: 'center', color: 'black', baseline: 'bottom', wrapCount: '40', font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt'}}                        
                        >
                    </Entity>
                    {/*expected return error here*/}
                    {posArr.map((pos, index) => {
                        if (topic.terms[index + iteration * 8]) return <FlashCard updateCurrentCard={this.updateCurrentCard} term={topic.terms[index + iteration * 8].term} definition={topic.terms[index + iteration * 8].definition} img={topic.terms[index + iteration * 8].img} pos={pos}/>
                    })}
                    <RefreshCard updateCurrentCard={this.updateCurrentCard} refreshCards={this.refreshCards} pos={{x: 0, y: 0, z: 2.02}}/>
                </Entity>
                <Entity geometry={{primitive: 'plane', width: 6, height: 6}}
                    material={{color: 'yellow', opacity: 0}}
                    position={{x: -5.08, y: 0, z: 0}}
                    rotation="0 90 0"
                >
                    <ExitCard exitCube={this.exitCube} pos={{x: 0, y: 0, z: 2.02}} updateCurrentCard={this.updateCurrentCard}/>
                </Entity>
                <Entity geometry={{primitive: 'plane', width: 6, height: 6}}
                    material={{color: 'yellow', opacity: 0}}
                    position={{x: 0, y: 0, z: 5.08}}
                    rotation="0 180 0"
                >
                    <Entity
                        geometry={{primitive: 'plane', width: 5.8, height: 0.5}}
                        material={{src: '#cardboard'}}
                        position={{x: 0, y: 2.65, z: 2.02}}
                        text={{value: this.props.topic.title, height: 0.2, align: 'center', color: 'black', baseline: 'bottom', wrapCount: '40', font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt'}}
                        >
                    </Entity>
                    <Entity
                        geometry={{primitive: 'plane', width: 5.8, height: 0.5}}
                        material={{src: '#cardboard'}}
                        position={{x: 0, y: -2.65, z: 2.02}}
                        text={{value: `Quiz - ${correctAnswers} / ${questionsAsked} Correct Answers`, align: 'center', color: 'black', baseline: 'bottom', wrapCount: '40', font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt'}}                        
                        >
                    </Entity>
                    {posArr.slice(5).map((pos, index) => {
                        return <AnswerCard updateCurrentCard={this.updateCurrentCard} term={answers[index].term} definition={answers[index].definition} img={answers[index].img} pos={pos} correct={correctArr[index]}/>
                    })}
                    <QuestionCard updateCurrentCard={this.updateCurrentCard} definition={question.definition} term={question.term} refreshCards={this.refreshCards} pos={{x: 0, y: 0, z: 2.02}}/>
                </Entity>
            </Scene>
        );
    }

    static propTypes = {
        topic: PT.object.isRequired
    }
}

export default Cube;