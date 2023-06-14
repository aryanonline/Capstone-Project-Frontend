import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.div`
    background: white;
    height: 90px;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    box-shadow: rgb(43 83 135 / 8%) 0px 3px 8px 0px;
    padding: 0 4rem;

    @media screen and (max-width: 425px) {
        padding: 0;
        transform: translate(0%, 3.5%);
        width: fit-content;
    }
`

export const NavLogo = styled.div`
    height: 100%;
    padding: 0 1rem;
    
    @media screen and (max-width: 768px) {
        transform: translate(0%, 3.5%);
    }
`

export const NavLink = styled(Link)`
    height: 100%;
    display: flex;
    color: black;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    cursor: pointer;

    &:hover {
        color: black;
        text-decoration: underline;
        text-decoration-color: #033880;
        text-decoration-thickness: 0.2rem;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
`

export const NavBtn = styled.nav`
    align-items: center;
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #033880;
    padding: 10px 22px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 2 rem;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #033880c2;
        color: white;
    }
`