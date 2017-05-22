import React, { Component } from 'react';
import {ButtonGroup, Table,Button } from 'reactstrap';
import {Link} from 'react-router'

var dev = 'http://localhost:4000'

class Categoria extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: dev,
      modal:false,
      category: []
    }
  }

  componentWillMount(){
    fetch(`${this.state.api}/category`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        category: response.data
      })
      console.log(this.state.category)
    })
  }

  delete(itemId){
    var r = confirm("¿Deseas eliminar esta categoria?");
    if (r == true) {
      
      fetch(`${this.state.api}/admin/category/${itemId}`,{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h3>Administrador de categorias</h3>
        <Button color="info" className="pull-right"> Nueva categoria </Button>
        <br/>
        <br/> 
        <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category.map((item,index) => {
                return(
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
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
