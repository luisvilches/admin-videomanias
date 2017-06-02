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
      formData.append('category', 'bannersPublicitarios')

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
        <h3>Administrador de usuarios</h3>
      </div>
    )
  }
}

export default Categoria;
