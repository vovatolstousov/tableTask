import React from "react"
import {Table} from "reactstrap"
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";

export default class DinamicTable extends React.Component {
    state = {
        columns: [],
        dataSource: []
    }

    componentDidMount() {
        const dataSource = this.props.data
        const columns = this.props.columns
        dataSource.forEach((item) => {
            while (item.length < columns.length) {
                item.push("")
            }
        })
        this.setState({dataSource, columns})
    }

    editCell({target}) {

        const rowIndex = target.dataset.row
        const columnIndex = target.dataset.column
        const fieldValue = target.value

        const {dataSource} = this.state

        if (target.dataset.select) {
            dataSource[rowIndex][columnIndex] = {
                selected: fieldValue,
                items: JSON.parse(target.dataset.select)
            }
        } else {
            if (!isNaN(parseFloat(fieldValue)) && isFinite(fieldValue)) {
                dataSource[rowIndex][columnIndex] = parseFloat(fieldValue);

            } else {
                dataSource[rowIndex][columnIndex] = fieldValue;
            }
        }

        this.props.onChange(this.state.dataSource, this.state.columns)
        this.setState({dataSource})
    }

    editColumn({target}) {

        const rowIndex = target.dataset.key
        const fieldValue = target.value

        const {columns} = this.state

        columns[rowIndex] = fieldValue;
        this.props.onChange(this.state.dataSource, this.state.columns)
        this.setState({columns})
    }

    handleAddColumn() {
        const {columns, dataSource} = this.state

        columns.push('column name')

        dataSource.forEach((item) => {
            item.push("")
            return item
        })

        this.props.onChange(this.state.dataSource, this.state.columns)
        this.setState({columns, dataSource})
    }

    handleAddRow() {
        const {columns, dataSource} = this.state
        dataSource.push(Array(columns.length).fill(""))
        this.props.onChange(this.state.dataSource, this.state.columns)
        this.setState({dataSource})
    }

    render() {
        const {dataSource, columns} = this.state

        return <Table>
            <thead>
            <tr>
                {columns.map((column, key) =>
                    <HeaderCell value={column} onEdit={this.editColumn.bind(this)} key={key} data={{key}}/>
                )}
                <th>
                    <i className='fa fa-plus' onClick={this.handleAddColumn.bind(this)}/>
                </th>
            </tr>
            </thead>
            <tbody>
            {dataSource.map((item, rowIndex) =>
                <tr key={rowIndex}>
                    {item.map((value, columnIndex) =>
                        <Cell key={columnIndex} value={value} onEdit={this.editCell.bind(this)}
                              data={{rowIndex, columnIndex}}/>
                    )}
                </tr>)}
            <tr>
                <td><i className='fa fa-plus' onClick={this.handleAddRow.bind(this)}/></td>
            </tr>
            </tbody>
        </Table>
    }
}
