import React, { Component } from 'react';
import {ButtonGroup, Table,Button,Form } from 'reactstrap';
import {Link} from 'react-router';
import './index.css';

var dev = 'http://localhost:4000'

class Categoria extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: dev,
      category: [],
      allcategory:[]
    }
  }

  componentWillMount(){
    fetch(`${this.state.api}/users`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        category: response,
        allcategory: response
      })
    })
  }

  delete(itemId){
    var r = confirm("¿Deseas eliminar este banner?");
    if (r == true) {
      
      fetch(`${this.state.api}/users/${itemId}`,{
        method: 'delete'
      })
      .then(res => res.json())
      .then(response => {
        alert(response.message)
        this.componentWillMount();
      })

    } else {
     
    }    
  }

  search(name){
    if(this.refs.search.value === ''){
      this.setState({
        category: this.state.allcategory
      })
    }else{
      
      var dd = this.state.category;
      console.log(dd)
      var data = dd.filter(item => {return item.name.toString().toLowerCase().includes(this.refs.search.value)}) 
      this.setState({
        category: data
      })

    }
  }

  

  render() {
    return (
      <div className="animated fadeIn">
        <h3>Clientes</h3>
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
                <th>#</th>
                <th>Rut</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Username</th>
                <th>password</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category.map((item,index) => {
                return(
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.rut}</td>
                    <td>{item.name}</td>
                    <td>{item.apellido}</td>
                    <td>{item.mail}</td>
                    <td>{item.phone}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>
                      <ButtonGroup>
                        <Button color="danger" onClick={this.delete.bind(this,item._id)} title="Eliminar"><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
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
