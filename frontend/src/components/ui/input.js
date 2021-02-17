import styled from 'styled-components'

export const StyledInput = styled.input`
    border-radius: 5px;
    border: 2px solid #694db4;
    padding:10px;
    margin:10px;
    outline: none;
    &:focus {
        border: 2px solid #1ec1ea;
    }
`

export const StyledInputId = styled(StyledInput)`
    border-color: ${props => props.error ? 'red' : '#694db4'}
`