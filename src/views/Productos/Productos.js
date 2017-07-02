import React, { Component } from 'react';
import {ButtonGroup, Table,Button, Form} from 'reactstrap';
import {Link} from 'react-router'

var dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Productos extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: prod,
      products: [],
      allproducts:[],
      category:[],
      family:[],
      gender:[],
      textSearch:'',
      modal: false,
    }
  }
  products(){
    fetch(`${this.state.api}/product`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        products: response.data,
        allproducts: response.data
      })
    })
  }

  categories(){
      fetch(`${this.state.api}/category`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          category: response.data
        })
      })
    }

    family(){
      fetch(`${this.state.api}/family`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          family: response.data
        })
      })
    }

    gender(){
      fetch(`${this.state.api}/gender`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          gender: response.data
        })
      })
    }

  componentWillMount(){
    this.products();
    this.categories();
    this.family();
    this.gender();

  }
  componentWillReceiveProps(){
    this.search(this.state.textSearch)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  delete(itemId){

    var r = confirm("Press a button!");
    if (r == true) {
      
      fetch(`${this.state.api}/product/${itemId}`,{
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


  search(name){
    if(this.refs.search.value === ''){
      this.setState({
        products: this.state.allproducts
      })
    }else{
      
      var dd = this.state.products;
      console.log(dd)
      var data = dd.filter(item => {return item.name.toString().toLowerCase().includes(this.refs.search.value)}) 
      this.setState({
        products: data
      })

    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="col-md-12">
          <h4>PRODUCTOS</h4>
          <Link to="/productos/new" className="pull-right btn btn-danger">Agregar nuevo producto</Link>
          <br/>
          <br/>
          <br/>
          <Form inline>
            <input className="input-responsive" placeholder="Buscar..." type="text" ref="search" onChange={this.search.bind(this)}/>
          </Form>
          <br/> 
        </div>
        <div className="col-md-12">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>sku</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((item,index) => {
                return(
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`product/gallery/${item.nameUrl}`} className="btn btn-info" title="Galeria"><i className="fa fa-picture-o" aria-hidden="true"></i></Link>
                        <Link to={`product/${item.nameUrl}`} className="btn btn-primary" title="Editar"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                        <Button color="danger" onClick={this.delete.bind(this,item._id)} title="Eliminar"><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

class SelectList extends Component {
  render(){
    return(
      <select name="select" className="form-control">
        <option value={this.props.textOption} selected>{this.props.textOption}</option> 
        {this.props.options.map((item,index)=>{
          return(
            <option value={item.name} >{item.name}</option>
          )
        })}
      </select>
    )
  }
}

export default Productos;
