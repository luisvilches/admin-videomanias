import React, { Component } from 'react';
import {ButtonGroup, Table,Button,Form } from 'reactstrap';
import Moment from 'react-moment';
import {Link} from 'react-router';
import './index.css';

var dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Categoria extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: prod,
      modal:false,
      category: [],
      allcategory:[],
      newCat: false,
    }
  }

  componentWillMount(){
    fetch(`${this.state.api}/transacciones`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        category: response.data,
        allcategory: response.data
      })
    })
  }

  search(name){
    if(this.refs.search.value === ''){
      this.setState({
        category: this.state.allcategory
      })
    }else{
      
      var dd = this.state.category;
      console.log(dd)
      var data = dd.filter(item => {return item.buyOrder.toString().toLowerCase().includes(this.refs.search.value)}) 
      this.setState({
        category: data
      })

    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h3>Transacciones</h3>
        <br/>
        <br/>
        <Form inline>
            <input className="input-responsive" placeholder="Buscar..." type="text" ref="search" onChange={this.search.bind(this)}/>
        </Form>
        <br/>
        <br/> 
        <Table>
            <thead>
              <tr>
                <th>N° de orden</th>
                <th>Cod. autorizacion</th>
                <th>Cod. Cliente</th>
                <th>Fecha</th>
                <th>Monto Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category.map((item,index) => {
                return(
                  <tr key={index}>
                    <th scope="row">{item.buyOrder}</th>
                    <td>{item.authCode}</td>
                    <td>{item.clientId}</td>
                    <td><Moment format="DD/MM/YYYY">{item.date}</Moment></td>
                    <td>{item.amount}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`TransactionsDetails/${item.token}`} className="btn btn-primary" title="Ver mas."><i className="fa fa-ellipsis-h" aria-hidden="true"></i></Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
      </div>
    )
  }
}

export default Categoria;
