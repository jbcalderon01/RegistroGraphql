import styled, { css  } from 'styled-components'

export const Container1 = styled.div`
    display:flex;
    justify-content: center;
    padding: 50px;

`
export const Form_Container = styled.div `
    background-color: #EDEDED;
    box-shadow: 9px 22px 23px -7px rgba(0,0,0,0.28);
    border-radius: 58px 58px 58px 58px;
    padding: 50px;
    margin-top: 50px;
`

export const Form = styled.div`
    display: flex;
    justify-content: center;
`
export const Form_Radio = styled.div`
    display:flex;
    margin-top: 10px;
    padding: 10px;
    ${({border}) => border &&css`border: ${border};`}
`
export const Form_Date = styled.div`
    display:flex;
    flex-direction: column;
`
export const Titulo = styled.h1`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
`
export const Button_Container = styled.div`
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    justify-content: center;
`
