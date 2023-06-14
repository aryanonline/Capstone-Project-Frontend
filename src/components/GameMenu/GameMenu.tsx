import React from "react";
import "./GameMenu.scss"

interface gameMenuProps {
    questionNum: number,
};

const GameMenu = ({ questionNum }: gameMenuProps) => {
    return (
        <div className="questionMenu">
            {
                [...Array(25)].map((_, i) => <div className={`questionLabel ${(questionNum > i) ? "disabled" : (questionNum == i) ? "currentQuestion" : ""}`} key={i}>Question {`${i + 1}`}</div>)
            }
        </div>
    );
}; 

export default GameMenu;