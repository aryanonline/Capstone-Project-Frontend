import React from "react";

interface scoreProps {
    score: number,
}

const Score = ({score}: scoreProps) => {
    return(
        <div className="score" tabIndex={0}>
            <p>{score}/25</p>
        </div>
    );
}
export default Score;