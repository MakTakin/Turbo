import styled from 'styled-components'

export const StyledButton = styled.button`
    padding:15px 30px;
    color: white;
    background: #f53f8a;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    &:hover {
        background:#03a9f4;
    }
`

export const FormButton = styled(StyledButton)`
    display: block;
    margin: 0 auto;
    padding:15px 50px;
    border-radius: 15px;
`
export const TableButton = styled(StyledButton)`
    margin: 0 10px;
    background: ${props => props.disabled ? '#80808085' : '#f53f8a'};
    color: ${props => props.disabled ? 'grey' : 'white'};
    &:hover {
        background:${props => props.disabled ? '#80808085' : '#03a9f4'};
    }
    
`