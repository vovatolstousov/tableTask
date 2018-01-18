import React from 'react'
import {Button, Input} from "reactstrap";

export default class Cell extends React.Component {
    state = {
        editable: false
    }

    render() {
        const {value, onEdit, data} = this.props

        return <th>
            <Input type='text'
                   data-key={data.key}
                   onChange={onEdit}
                   value={value}/>
        </th>

    }

}