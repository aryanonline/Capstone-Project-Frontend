import React from "react";
import "./GameOption.scss";

interface gameOptionProps {
    option: string,
    className: string,
    onClickFunction: () => void,
    selected?: boolean,
};

const GameOption = ({option, className, onClickFunction, selected = false}: gameOptionProps) => {
    return (
        <div className={`option ${className} ${selected ? "selected" : ""}`} onClick={onClickFunction} tabIndex={0}>
            {option}
        </div>
    );
}; 

export default GameOption;