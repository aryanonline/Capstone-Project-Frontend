import styled from 'styled-components';

export const ServicesContainer = styled.div`
    margin-bottom: 5%;

    @media screen and (max-width: 599px){
        margin-bottom: 10%;
    }
`

export const Title = styled.div`
    text-align: center;
    margin-left: 10%;
    margin-right: 10%;
`

export const Features = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    text-align: center;
    margin-top: 3vw;
    margin-left: 10%;
    margin-right: 10%;

    @media screen and (max-width: 599px){
        grid-template-columns: repeat(1, 1fr);
    }
`

export const FeaturesDesc = styled.div`
    width: 100%;
`

export const Feature = styled.div`
    h3 {
        text-align: center;
    }
`