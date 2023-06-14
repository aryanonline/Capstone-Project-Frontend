import React from "react";
import {Description} from './SummaryElements';

const Summary = () => {
    return(
        <Description>
            <h2 style={{color: '#fa488a'}} tabIndex={0}>SCOOP</h2>
            <p style={{fontWeight: 300}} tabIndex={0}>
                Carpooling is a cheap, sociable, environment-friendly and practical solution to getting to your intended destination. <br /><br />
                Scoop aims to provide a platform for all users to match with others going to the same location. It is designed with the 
                utmost importance given to users with impairments and disabilities. We prioritize your needs and always operate with
        
                <span style={{fontWeight: 300, color: '#007a78'}}> integrity</span>
                <span style={{fontWeight: 300}}>, </span>
                <span style={{fontWeight: 300, color: '#d3273e'}}>honesty</span>
                <span style={{fontWeight: 300}}> and </span> 
                <span style={{fontWeight: 300, color: '#1d4289'}}>transparency</span>
                <span style={{fontWeight: 300}}>.</span>
            </p>
        </Description>
    )
}

export default Summary;