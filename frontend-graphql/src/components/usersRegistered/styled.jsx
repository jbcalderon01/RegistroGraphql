import styled, { css, keyframes } from 'styled-components'



export const Table = styled.table`

    text-align: left;
    width: 100%;
    /* border-collapse:collapse; */
    background-color: white;
    border: 1px solid #cdcdcd;
    box-shadow: 10px 10px 18px -3px rgba(0,0,0,0.31);
    
    `
export const TableHead = styled.thead`
    background-color: #2C3E50;
    color: white;
    font-weight: bold;
    font-size: 19px;

`
export const TableHeadItems = styled.th`
    padding:15px;
`
export const TableDataContainer = styled.tr`

}
`
export const TableData = styled.td`
    border-bottom: 1px solid #CDCDCD;
    padding: 15px;
    
`
export const Circle = styled.div`

    border-radius: 50px 50px 50px 50px;
    width: 30px;
    margin-right: 10px;
    ${({ background }) => background && css`background-color: ${background}`};

`

export const EditUserContainer = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 48px 48px 48px 48px;
    text-align:center;
   
    `

const bounceIn = keyframes`

    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }     
    bounceIn
    0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
}

    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
    transform: scale3d(0.97, 0.97, 0.97);
    }}

    to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    }
`
export const EditUserForm = styled.div`
    display: flex;  
    justify-content: center;
    position: absolute;
    width: 450px;
    background-color: #E8E8E7;
    z-index: 10;
    border-radius: 48px 48px 48px 48px;
    padding: 50px;
    box-shadow: 10px 10px 18px -3px rgba(0,0,0,0.31);
    ${({ active }) => active ? css`animation-name: ${ bounceIn };animation-duration: calc(1s * 0.75);display:flex`:css`display:none` };
`

export const ItemsContainerEditForm = styled.div`
    display: flex;
    justify-content: space-between;
    
`
export const ButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

`


export const Loading = styled.div`
    position: absolute;
    top: 50%;  left: 50%;
    width: 200px;   height: 200px;
    background: transparent;
    border: 13px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top: 13px solid black;
    animation: animate 2s infinite linear;

    @keyframes animate{
    0%{
        transform: translate(-50%,-50%) rotate(0deg);
    }
    100%{
        transform: translate(-50%,-50%) rotate(360deg);
    }
}
`