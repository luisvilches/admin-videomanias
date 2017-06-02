import React, { Component } from 'react';
import {Table,Container, Row, Col,Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from 'react-router'

var dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Ficha extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: prod,
      product:[],
      modal: false,
      gallery:[]
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  addImage(e){
    e.preventDefault();

    var formData = new FormData();
    formData.append("image", this.refs.img.files[0]);

    if(!this.refs.img.files[0]){
      alert('Debes cargar una imagen antes de continuar!')
    }else {
    

      fetch(`${this.state.api}/product/gallery/${this.state.product._id}`,{
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(response => {
            alert('Imagen agregada con exito!')
            this.componentWillMount();
            this.toggle();
          })
      }
  }

  delete(itemId){

    console.log(itemId)

    var r = confirm("¿Desea eliminar esta imagen?");
    if (r == true) {
      
      fetch(`${this.state.api}/product/gallery/one/${itemId}`,{
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

  componentWillMount(){
    fetch(`${this.state.api}/product/${this.props.params.product}`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        product: response.data,
        gallery: response.data.gallery
      })
      //console.log(this.state.product._id)
    })
    
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container>
          <Row>
            <Col xs="12" sm="12">
              <h3>Imagenes de la galeria {this.state.product.name}</h3>
              <br/>
              <br/>
              <Button onClick={this.toggle.bind(this)}>Agregar nueva imagen</Button>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              
              <Row>
                <Col xs="12" sm="12" className="pd20">
                  <Table id="imgGaleria">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.gallery.map((item,index) => {
                        return(
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td><img src={item.original} alt="" className="img-responsive"/></td>
                            <td><Button color="danger" onClick={this.delete.bind(this,item._id)}>Eliminar</Button></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
            <Col xs="12" md="6">
              <h5>Cover:</h5>
              <div className="pd20">
                <img src={this.state.product.image} className="img-responsive imgMax" alt=""/>
              </div>
            </Col>
            <Link to="/productos" className="pull-right btn btn-primary">Volver</Link>
          </Row>
           <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Agregar nueva imagen</ModalHeader>
              <ModalBody>
                <input type="file" ref="img"/>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.addImage.bind(this)}>Agregar imagen</Button>{' '}
                <Button color="secondary" onClick={this.toggle.bind(this)}>Cancelar</Button>
              </ModalFooter>
            </Modal>
        </Container>
    </div>
    )
  }
}

export default Ficha;
