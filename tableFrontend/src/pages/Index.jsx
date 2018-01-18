import React, {Component} from 'react'
import {getTable, saveTable} from "../actions/table.action";
import {connect} from "react-redux";
import Layout from "../components/Layout";
import DinamicTable from "../components/DinamicTable";

const stubs = {
    columns: ["TEXT", "NUMBER 1", "NUMBER 2", "SUM", "DROPDOWN"],
    data: [
        {
            text: "text",
            number1: 1,
            number2: 3,
            dropdown: {
                "items": [
                    "hello",
                    "rich",
                    23
                ],
                "selected": "hello"
            }
        },
        {
            text: "text",
            number1: 2,
            number2: 2,
            dropdown: {
                "items": [
                    "hello",
                    "rich",
                    23
                ],
                "selected": "hello"
            }
        }
    ]
}

@connect((store) => store.table)
export default class Index extends Component {

    timer = null
    state = {
        table: null
    }

    componentDidMount() {
        this.props.dispatch(getTable())
    }

    getUpdatedTable(dataSource, columns) {

        debugger
        clearTimeout(this.timer)
        const data = dataSource.map(item => ({
            text: item[0],
            number1: item[1],
            number2: item[2],
            dropdown: item[4]
        }))

        const table = {
            data,
            columns
        }

        this.timer = setTimeout(() => {
            this.props.dispatch(saveTable(table))
        }, 1000);
    }

    render() {
        let {data, columns, loading} = this.props

        if (!data) return null

        if (!data.length && !loading) data = stubs.data

        if (!columns.length && !loading) columns = stubs.columns


        return <Layout>
            <DinamicTable
                columns={columns}
                data={data.map(item => [
                    item.text,
                    item.number1,
                    item.number2,
                    item.number1 + item.number2,
                    item.dropdown
                ])}
                onChange={this.getUpdatedTable.bind(this)}

            />
        </Layout>
    }

}
