import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Banner = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(2, 1fr);
    margin: 20px 20px 60px 20px;

    @media screen and (max-width: 768px) {
        display: flex;
        text-align: center;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-around;
        align-items: center;
    }
`

export const BannerText = styled.div`
    grid-column: 1;
    grid-row: 2 / 5;
    font-size: 2vw;
    margin-left: 115px;
    overflow-wrap: break-word;

    @media screen and (max-width: 768px) {
        font-size: inherit;
        margin: 0;
    }
    
`

export const BtnLink = styled(Link)`
    border-radius: 4px;
    border: 2px solid #033880;
    background: white;
    font-size: 20px;
    padding: 10px 30px;
    color: black;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #033880;
        color: white;
    }

    @media screen and (max-width: 768px) {
        font-size: 15px;
        padding: 5px 20px;
    }

    ${props => props.disabled && `
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    `}
`

export const BannerImage = styled.div`
    grid-column: 2;
    grid-row: 1 / 5;
    overflow-x: hidden;
    overflow-y: hidden;
    height: auto;
    max-width: 100%;

    img {
        width: -webkit-fill-available;
    }

    @media screen and (max-width: 768px) {
        margin-right: 80px;
        display: none;
    }
`