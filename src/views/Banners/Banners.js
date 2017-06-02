import React, { Component } from 'react';
import {ButtonGroup, Table,Button,Form } from 'reactstrap';
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
      newCat: false,
    }
  }

  componentWillMount(){
    fetch(`${this.state.api}/category`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        category: response.data
      })
    })
  }

  delete(itemId){
    var r = confirm("¿Deseas eliminar esta categoria?");
    if (r == true) {
      
      fetch(`${this.state.api}/category/${itemId}`,{
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

  newToggle(){
    this.setState({
      newCat: !this.state.newCat
    });
  }

  addCat(){
    var formData = new FormData();
    formData.append('name', this.refs.name.value)
    formData.append('description', this.refs.description.value)

    fetch(`${this.state.api}/category`, {
      method:'POST',
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      this.componentWillMount();
      alert(response.message)
      this.newToggle();
    })
    
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h3>Administrador de Banners</h3>
        <br/>
        <br/> 
        <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category.map((item,index) => {
                return(
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`banners/gallery/${item.name}`} className="btn btn-info" title="Galeria"><i className="fa fa-picture-o" aria-hidden="true"></i></Link>
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
