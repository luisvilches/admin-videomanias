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
        category: response.data,
        allcategory: response.data,
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
        <h3>Administrador de categorias</h3>
        <Button color="info" onClick={this.newToggle.bind(this)} className={this.state.newCat ? 'none' : 'block pull-right'}> Nueva categoria </Button>
        <br/>
        <Form inline>
          <input ref="name" type="text" className={this.state.newCat ? 'block form-control' : 'none'} placeholder="Nombre categoria"/>
          <input ref="description" type="text" className={this.state.newCat ? 'block form-control' : 'none'} placeholder="Descripción categoria"/>
          <Button color="success" onClick={this.addCat.bind(this)} className={this.state.newCat ? 'block pull-right' : 'none'}> Crear categoria </Button>
        </Form>
        <br/>
        <br/>
        <Form inline>
            <input className="input-responsive" placeholder="Buscar..." type="text" ref="search" onChange={this.search.bind(this)}/>
        </Form>
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
