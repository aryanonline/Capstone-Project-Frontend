import React, { useContext, useState } from "react";
import "./DriverGame.scss";
import GameQuestion from "../../components/GameQuestion/GameQuestion";
import { questions } from "../../game-resources/questions";
import { Button } from "@mui/material";
import GameOption from "../../components/GameOption/GameOption";
import Score from "../../components/Score/Score";
import GameMenu from "../../components/GameMenu/GameMenu";
import { SignupContext } from "../../context/SignupContext";

const DriverGame = () => {
    // TODO: randomize question display
    // const displayedQuestions = [];
    // function selectQuestion () {
    //     const qNum = Math.floor(Math.random()*24);
    //     if (displayedQuestions.indexOf[qNum] <= -1){
    //         displayedQuestions.concat(qNum)
    //         return qNum
    //     }
    //     else{
    //         selectQuestion()
    //     }
    // } 
    const {state, dispatch} = useContext(SignupContext);
    const [question, setQuestion] = useState<number>(0); 
    const [disableNext, setDisableNext] = useState<boolean>(true);
    const [selectedAnswer, setSelectedAnswer] = useState<number>();
    const [score, setScore] = useState<number>(0);

    const nextQuestion = () => {
        if (questions[question].answers[selectedAnswer].correct) {
            setScore(score + 1);
        }

        setQuestion(question + 1);
        setSelectedAnswer(undefined);
        setDisableNext(true);
    };

    const submit = () => {
        // the user has passed the module if they've gotten a 75% and above
        if (score >= 19){
            alert("You've Passed!");
            dispatch({isModuleComplete: true});
        } else {
            alert("Sorry, you've failed :(");
        }
        dispatch({quizVisability: false});
    };

    return (
        <div id="game-container" style={{"display": state.quizVisability ? 'grid' : 'none'}}>
            <Score score={score}/>
            <GameQuestion question={`${questions[question].question}`}/>
            <GameMenu questionNum={question}/>
            {
                [...Array(questions[question].answers.length)].map((_, i) => 
                    <GameOption className={`option${i + 1}`} key={i} option={`${questions[question].answers[i].text}`} onClickFunction={() => {setSelectedAnswer(i); setDisableNext(false);}} selected={(selectedAnswer == i) ? true : false} />
                )
            }
            <Button className="button" variant="outlined" disabled={disableNext} onClick={() => {(question < questions.length - 1) ? nextQuestion() : submit() }}> {(question < questions.length - 1) ? "Next Question" : "Submit"}</Button>
        </div>
    );
}; 

export default DriverGame;