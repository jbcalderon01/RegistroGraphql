import styled, { css, keyframes } from 'styled-components'



export const Table = styled.table`

    text-align: left;
    width: 100%;
    /* border-collapse:collapse; */
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
${({ background }) => background && css`background-color: ${background}`}
`
const fadeInUp = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
`
export const EditUserContainer = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 48px 48px 48px 48px;
    display: ${({ active }) => active ? 'flex' : 'none'};
`
export const EditUserForm = styled.div`
   position: absolute;
   width: 800px;
   height: 500px;
   background-color: #E8E8E7;
   z-index: 10;
   border-radius: 48px 48px 48px 48px;
   padding: 50px;

`