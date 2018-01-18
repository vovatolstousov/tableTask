import React from 'react'
import {Input} from "reactstrap";

export default class Cell extends React.Component {
    state = {
        editable: false,
    }

    render() {
        const {value, onEdit, data} = this.props

        if (value instanceof Object) {
            return <td>
                <select className="form-control"
                        data-column={data.columnIndex}
                        data-row={data.rowIndex}
                        data-select={JSON.stringify(value.items)}
                        onChange={onEdit}
                        value={value.selected}>
                    {value.items.map((item, i) => <option key={i}>{item}</option>)}
                </select>
            </td>
        }


        return <td>
            <div className='d-flex'>
                <Input type='text'
                       placeholder="empty"
                       data-column={data.columnIndex}
                       data-row={data.rowIndex}
                       onChange={onEdit}
                       value={value}/>
                {/*{!value ? <div className='mt-2 text-muted'><i className='fa fa-plus'/></div> : null}*/}


            </div>
        </td>

    }

}