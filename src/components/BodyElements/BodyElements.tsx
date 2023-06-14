import styled from 'styled-components';
export const Panel_container = styled.div`
    display: flex;
    box-sizing: border-box;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 5%;
    padding-bottom: 5%;

    @media screen and (min-width: 576px){
        height: 100%;
        -webkit-box-align: center;
        align-items: center;
    }
`
export const Panel = styled.div`
    width: 100%;
    padding: 24px;
    background: white;
    position: relative;
    box-sizing: inherit;
    display: block;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    box-shadow: 5px 5px 50px #888888;

    @media screen and (min-width: 577px){
        max-width: 400px;
        background-image: linear-gradient(var(--core-ui-elevation-panel-overlay),var(--core-ui-elevation-panel-overlay));
        border-radius: 8px;
    }

`
export const Layout_Notch = styled.div`
    padding-top: env(safe-area-inset-top);
    box-sizing: inherit;
    display: block;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;

`
export const Spacer = styled.div`
    flex: 0 0 auto;
    visibility: hidden;
    height: 24px;
    box-sizing: inherit;
    display: block;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;

    @media screen and (min-width: 1024px){
        height:24px;

    }
    @media screen and (min-width: 768px){
        height: 24px;
    }
    @media screen and (min-width: 576px){
        height: 24px;
    }
`
