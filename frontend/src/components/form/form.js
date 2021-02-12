import React from 'react'
import styled from 'styled-components'
import { StyledInput } from '../ui/input';
import { StyledSelect } from '../ui/select';
import { FormButton } from '../ui/button';
import EditEvent from '../editEvent/editEvent';

const DivForm = styled.div`
    padding:20px;
    margin-top:20px;
    border-radius:10px;
    background: #8080801f;
`
const Div = styled.div`
    display:flex;
    justify-content: center;
    font-size:18px;
`

const DivColumn = styled.div`
    display:flex;
    flex: 0 0 30%;
    flex-direction: column;
`

const Form = (props) => {
    return (
        <DivForm>
            <Div>{props.heading}</Div>
            <form onSubmit={(e) => props.saveEvent(e)}>
                <Div>
                    <DivColumn>
                        <StyledInput
                            value={props.event.username}
                            name='username'
                            placeholder='username'
                            onChange={(e) => props.onChange(e)}
                        />
                        <StyledInput
                            value={props.event.firstname}
                            name='firstname'
                            placeholder='first name'
                            onChange={(e) => props.onChange(e)}
                        />
                        <StyledInput
                            value={props.event.lastname}
                            name='lastname'
                            placeholder='last name'
                            onChange={(e) => props.onChange(e)}
                        />
                    </DivColumn>
                    <DivColumn>
                        <StyledInput
                            value={props.event.user_id}
                            name='user_id'
                            placeholder='user id'
                            onChange={(e) => props.onChange(e)}
                        />
                        <StyledSelect
                            value={props.event.event_name}
                            name='event_name'
                            id="event_name"
                            onChange={(e) => props.onChange(e)}
                        >
                            <option value="site">Site</option>
                            <option value="app">App</option>
                            <option value="other">Other</option>
                        </StyledSelect>
                        <StyledInput
                            value={props.event.event_time}
                            name='event_time'
                            placeholder='event time'

                            onChange={(e) => props.onChange(e)}
                        />
                    </DivColumn>
                </Div>
                <FormButton>
                    {props.textButton}
                </FormButton>
            </form>
        </DivForm>
    )
}
export default Form