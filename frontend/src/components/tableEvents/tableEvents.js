import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledButton, TableButton } from '../ui/button';

const DivEvents = styled.div`
    padding:20px;
    margin-top:20px;
    border-radius:10px;
    background: #8080801f;
`

const DivButton = styled.div`
    text-align: right;
    margin: 10px 0;
`
const Div = styled.div`
    display:flex;
    justify-content: center;
    margin-bottom:20px;
    font-size:18px;
`

const StyledTable = styled.table`
    border-collapse: collapse;
    width:100%;
    border:2px solid #380088;
    border-radius: 20px;
`
const Th = styled.th`
    border: 1px solid #380088;
    background: #694db4;
    color: #fff;
    padding:5px 10px;
`
const Tr = styled.tr`
    border: 1px solid #380088;
    background: ${props => props.selected ? '#1ec1ea' : '#80808045'};
`
const Td = styled.td`
    border: 1px solid #380088;
    padding:5px 10px;
    cursor: pointer;
`

const TableEvents = ({ ...props }) => {
    const TrTable = props.events.map((event) => {
        return event.logs.map((log,i) => {
            return (
                <Tr
                    key={log.id}
                    selected={log.selected}
                    onClick={() => props.onSelect(log.id)}
                >
                    <Td>
                        {event.username}
                    </Td>
                    <Td>
                        {event.firstname}
                    </Td>
                    <Td>
                        {event.lastname}
                    </Td>
                    <Td>
                        {event.id}
                    </Td>
                    <Td>
                        {log.event.name}
                    </Td>
                    <Td>
                        {log.event_time}
                    </Td>
                </Tr>
            )
        })

    })
    return (
        <DivEvents>
            <Div>Таблица событий</Div>
            <DivButton>
                <TableButton
                    disabled={!props.selectEvent}
                    onClick={() => props.deleteEvent()}
                >
                    Удалить
                </TableButton>
                <TableButton
                    disabled={!props.selectEvent}
                    onClick={() => props.onChangeEvent()}
                >
                    Редактировать
                </TableButton>
            </DivButton>
            <StyledTable>
                <thead>
                <Tr>
                    <Th>Username</Th>
                    <Th>Firstname</Th>
                    <Th>Lastname</Th>
                    <Th>User Id</Th>
                    <Th>Event log</Th>
                    <Th>Event time</Th>
                </Tr>
                </thead>
                <tbody>
                {TrTable}
                </tbody>
            </StyledTable>
        </DivEvents>
    )
}
export default TableEvents