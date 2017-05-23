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
        <h3>Administrador de banners publicitarios</h3>
        <Button color="info" onClick={this.newToggle.bind(this)} className={this.state.newCat ? 'none' : 'block pull-right'}> Nuevo Banner </Button>
        <br/>
        <Form inline>
          <input ref="image" type="file" className={this.state.newCat ? 'block form-control' : 'none'} />
          <Button color="success" onClick={this.addCat.bind(this)} className={this.state.newCat ? 'block pull-right' : 'none'}> Agregar nuevo banner </Button>
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

export default Categoria;
