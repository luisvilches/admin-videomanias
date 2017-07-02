import React, { Component } from 'react';
import './index.css';


export default class Toggle extends Component{

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    setter(){
        this.setState({
            value: this.props.value
        })
    }

    componentWillReceiveProps(){
        this.setter();
    }

    componentDidMount(){
        setTimeout(this.setter(),5000)
    }

    click(){
        this.setState({
            value: !this.props.value
        })
    }
    render(){
        return(
            <div className="">
                <input className="type-checkbox" id={"id-"+this.props.index} type="checkbox" checked={this.state.value} onChange={this.props.change}/>
                <label className="estado" htmlFor={"id-"+this.props.index} onClick={this.click.bind(this)}>
                    <span className="aprobado">APROBADO</span>
                    <span className="desaprobado">DESAPROBADO</span>
                </label>
            </div>
        )
    }
}


/**
 * <div className={"switch-box " + this.props.bgStyle}>
                <input id={"id-"+this.props.index} defaultChecked={this.state.value} onChange={this.props.change} className="switch-box-input" type="checkbox" />
                <label htmlFor={"id-"+this.props.index} className="switch-box-slider"></label>
                {this.state.value ? <label htmlFor={"id-"+this.props.index} className="switch-box-label"></label> : <label htmlFor={"id-"+this.props.index} className="switch-box-label"></label>}
            </div>
 */