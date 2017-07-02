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
      cliente: [],
      commerce:[],
      items:[],
      newCat: false,
    }
  }

  componentWillMount(){
    fetch(`${this.state.api}/datoscomercio/${this.props.params.token}`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        commerce: response.commerce,
        cliente: response.client,
        items: response.commerce.items
      })
      console.log(this.props.params.token)
      console.log(response)
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
        <Link to="/transactions" className="btn btn-primary">Volver</Link>
        <br/>
        <br/>
        <h3>Datos del cliente:</h3>
        <br/>
        <p>Rut: {this.state.cliente.rut}</p>
        <br/>
        <p>Nombre: {this.state.cliente.name} {this.state.cliente.apillido}</p>
        <br/>
        <p>Correo: {this.state.cliente.mail}</p>
        <br/>
        <p>Telefono: {this.state.cliente.phone}</p>
        <br/>
        <br/>
        <h3>Datos de la transaccion:</h3>
        <br/>
        <p>Numero de orden: {this.state.commerce.buyOrder}</p>
        <br/>
        <p>Numero de autorización: {this.state.commerce.authCode}</p>
        <br/>
        <p>Token: {this.state.commerce.token}</p>
        <br/>
        <p>Total: <b>${this.state.commerce.amount}</b></p>
        <br/>
        <br/>
        <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((item,index) => {
                return(
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.cant}</td>
                    <td>{item.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        <br/>
        <br/> 
        
      </div>
    )
  }
}

export default Categoria;
/*
  
 */