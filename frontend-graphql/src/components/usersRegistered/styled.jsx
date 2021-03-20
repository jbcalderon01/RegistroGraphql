import styled, { css } from 'styled-components'



export const Table = styled.table`

    text-align: left;
    width: 100%;
    border-collapse:collapse;
    background-color: white;
    border: 1px solid #cdcdcd;
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
${({background})=>background &&css `background-color: ${background}`}
`
