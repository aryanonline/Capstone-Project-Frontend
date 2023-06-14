import React from "react";

interface gameQuestionProps {
    question: string
};

const GameQuestion = ({question}: gameQuestionProps) => {
    return (
        <div className="question" tabIndex={0}>
            {question}
        </div>
    );
}; 

export default GameQuestion;