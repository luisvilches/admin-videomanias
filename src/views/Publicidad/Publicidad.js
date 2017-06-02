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
      categoryName: [],
      category: [],
      newCat: false,
    }
  }
  categories(){
      fetch(`${this.state.api}/category`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          categoryName: response.data
        })
      })
    }

  componentWillMount(){
    this.categories();
    fetch(`${this.state.api}/bannersPublicidad`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        category: response.data
      })
    })
  }

  delete(itemId){
    var r = confirm("¿Deseas eliminar este banner?");
    if (r == true) {
      
      fetch(`${this.state.api}/bannersPublicidad/${itemId}`,{
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
    if(!this.refs.image.files[0]){
      alert('inserte una imagen')
    }else{
      var formData = new FormData();
      formData.append('img', this.refs.image.files[0])
      formData.append('name', this.refs.categoria.state.value)

      fetch(`${this.state.api}/bannersPublicidad`, {
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
    
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h3>Administrador de banners publicitarios</h3>
        <br/>
        <Form inline>
          <input ref="image" type="file" />
          <SelectList ref="categoria" textOption="--seleccionar categoria" options={this.state.categoryName}/>
          <Button color="success" onClick={this.addCat.bind(this)}> Agregar nuevo banner </Button>
        </Form>
        <br/>
        <br/>
        <br/> 
        <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category.map((item,index) => {
                return(
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td><img src={item.img} className="img-responsive ban" alt=""/></td>
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

class SelectList extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: ''
    }
  }

  render(){
    return(
      <select name="selectList" onChange={item => {this.setState({value: item.target.value})}} className="form-control">
        <option value={this.props.textOption}>{this.props.textOption}</option> 
        {this.props.options.map((item,index)=>{
          return(
            <option key={index} value={item.name} onChange={(name) => {this.setState({value:item.name})}}>{item.name}</option>
          )
        })}
      </select>
    )
  }
}


export default Categoria;
