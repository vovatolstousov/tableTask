import React from 'react'

export default class CellDropdown extends React.Component {
    state = {}

    componentDidMount() {
        this.setState({value: this.props.value})
    }
    onChange(e,data){
        this.props.onChange(e,this.state.value,data)
    }

    render() {
        const {value, data} = this.props
        return <select className="form-control"
                       onChange={this.onChange.bind(this, {data, value: this.state.value})}
                       value={value.selected}>
            {value.items.map((item, i) => <option key={i}>{item}</option>)}
        </select>
    }
}