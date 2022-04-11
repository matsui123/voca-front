import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div<{toggle: boolean}>`
    display: ${({toggle}) => toggle ? '' : 'none'}
`;

export const WrapperInitial = styled.div<{toggle: boolean}>`
    display: inline;
    margin-right: auto;
    margin-left: auto;
    max-width: 800px;
    text-align: center;
    display: ${({toggle}) => toggle ? '' : 'none'}
`;

export const FirstTitle = styled.div`
    background: linear-gradient(transparent 50%,  blanchedalmond 50%);
    font-size: 40px;
    margin: 20px;
`;

export const FirstChoices = styled.div`
    margin: 20px;
    font-size: 36px;
    height: 380px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
`;

export const WrapperEn = styled.div`
    text-align: left;
    background: linear-gradient(transparent 70%,  rgb(108, 235, 108) 30%);
`;

export const WrapperJp = styled(WrapperEn)`
    background: linear-gradient(transparent 70%,  rgb(107, 161, 197) 30%);
`;

export const WrapperMm = styled(WrapperEn)`
    background: linear-gradient(transparent 70%,  rgb(221, 92, 92) 30%);
`;

export const FirstButton = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`;

//2枚目
export const SecondTitle = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`;

export const SecondChoices = styled(FirstChoices)`
    text-align: center;
`;

export const SecondEn = styled(WrapperEn)<{toggle: boolean}>`
    text-align: center;
    display: ${({toggle}) => toggle ? '' : 'none'}
`;

export const SecondJp = styled(WrapperJp)<{toggle: boolean}>`
    text-align: center;
    display: ${({toggle}) => toggle ? '' : 'none'}
`;

export const SecondMm = styled(WrapperMm)<{toggle: boolean}>`
    text-align: center;
    display: ${({toggle}) => toggle ? '' : 'none'}
`;

export const Answer = styled.div`
    margin: 140px 20px 60px;
    text-align: center;
    font-size: 30px;
    display: flex;
    justify-content: space-between;
`;

export const WrapperAnswerButton = styled.div`
    margin-top: 60px;
    margin-right: 20px;
    margin-left: 20px;
`;

export const UpButton = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100px;
    margin: 40px 0;
`;