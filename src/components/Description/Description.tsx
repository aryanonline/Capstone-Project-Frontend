import React from "react";
import { DescriptionPage, DescriptionContainer, ParagraphContainer, ParaSpacing } from './DescriptionElem';
import "./Description.scss";

type descriptionProps = {
    title: string,
    description: string
}

const Description = ({ title, description}: descriptionProps) => {
    return (
        <DescriptionPage>
            <DescriptionContainer>
                <h1 id="desc-title">{title}</h1>
                <ParagraphContainer>
                    <ParaSpacing>
                        <p>{description}</p>
                    </ParaSpacing>
                </ParagraphContainer>
            </DescriptionContainer>
        </DescriptionPage>
    );
}

export default Description;