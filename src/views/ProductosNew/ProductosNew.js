import React, { Component,PropTypes } from 'react';
import { Table,Button, Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router'
import TinyMCE from 'react-tinymce';
import Switch from 'rc-switch'
import Toogle from '../Toggle/index';
import './index.css'

var dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class ProductosNew extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: prod,
      products: [],
      category:[],
      family:[],
      gender:[],
      text: '',
      offer: false,
      premiere: false,
      sku: '',
      name: '',
      price: '',
      categoria: '',
      familia: '',
      genero: '', 
    }
  }

  

  handleEditorChange = (e) => {
    this.setState({
      text: e.target.getContent()
    })

     console.log(this.state.text);
  }

  toggle(value){
    this.setState({
      offer: !this.state.offer,
    });
  }

  togglePremiere(value){
    this.setState({
      premiere: !this.state.premiere,
    });
    console.log('premiere: '+this.state.premiere)
  }

  products(){
    fetch(`${this.state.api}/product`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        products: response.data
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

  componentDidMount(){
    this.products();
    this.categories();
    this.family();
    this.gender();
  }

  createProduct(e){
    e.preventDefault();

   var formData = new FormData();
      formData.append("sku", this.refs.sku.value);
      formData.append("category", this.refs.categoria.state.value);
      formData.append("family", this.refs.familia.state.value);
      formData.append("gender", this.refs.genero.state.value);
      formData.append("img", this.refs.img.files[0]);
      formData.append('name', this.refs.nombre.value);
      formData.append('pie', this.refs.pie.value);
      formData.append('price', this.refs.price.value);
      formData.append('description', this.state.text);
      formData.append('offer', this.state.offer);
      formData.append('premiere', this.state.premiere);
      formData.append('media', this.refs.media.value);
   
    console.log(formData)

    var data = {
      img:this.refs.img.files[0]
    }

  fetch(`${this.state.api}/product`,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(response => {
        alert('Producto creado con exito!')
      })
  }
  
  render() {
    let editorConfig={
        //simditor configure 
    }
    return (
      <div className="animated fadeIn">
        <form ref="formulario" action="">
          <Container>
            <Row>
              <Col xs="12" md="3">
                <label>
                  sku(*):
                </label>
                <input ref="sku" type="text" className="form-control" onChange={(item) => {this.setState({sku: item.target.value})}}/>
              </Col>
              <Col xs="12" md="3">
                <label>
                  Categoria(*):
                </label>
                <SelectList ref="categoria" textOption="--seleccionar categoria" options={this.state.category} />
              </Col>
              <Col xs="12" md="3">
                <label>
                  Familia(*):
                </label>
                <SelectList ref="familia" textOption="--seleccionar familia" options={this.state.family} />
              </Col>
              <Col xs="12" md="3">
                <label>
                  Genero(*):
                </label>
                <SelectList ref="genero" textOption="--seleccionar genero" options={this.state.gender} />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <label>
                  Nombre(*):
                </label>
                <input ref="nombre" type="text" className="form-control"/>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                <label>
                  Bajada de titulo:
                </label>
                <input ref="pie" type="text" className="form-control"/>
              </Col>
              <Col xs="12" md="4">
                <label>
                  Precio(*):
                </label>
                <input ref="price" type="number" className="form-control"/>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <label>
                  Descripcion(*):
                </label>
              <TinyMCE
                  content=""
                  config={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  onChange={this.handleEditorChange}
                />
              </Col>
            </Row>
            <br/>
            <br/>
            <Row>
              <Col xs="12" md="3">
                <label>
                  ¿Producto en Oferta?: 
                </label>
              {/*<Switch
                  onChange={this.toggle.bind(this)}
                  checkedChildren={'Si'}
                  unCheckedChildren={'No'}
                />*/}
                <Toogle
                  change={this.toggle.bind(this)}
                  value={!false}
                />
                <label>
                  ¿Producto en Estreno?: 
                </label>
                {/*<Switch
                  onChange={this.togglePremiere.bind(this)}
                  checkedChildren={'Si'}
                  unCheckedChildren={'No'}
                />*/}
                <Toogle
                  change={this.togglePremiere.bind(this)}
                  value={!false}
                />
              </Col>
              <Col xs="12" md="4">
                <label>
                  Imagen del cover(*):
                </label>
                <input ref="img" name="img" id="img" type="file" className="form-control" accept="image/*" />
              </Col>
              <Col xs="12" md="5">
                <label>
                  Video de Youtube(*):
                </label>
                <input ref="media" type="text" className="form-control"/>
              </Col>
            </Row>
            <br/> 
            <button className="pull-right btn btn-danger" onClick={this.createProduct.bind(this)}>Crear producto</button>
            <Link to="/productos" className="pull-right btn btn-primary">Volver</Link>
          </Container>
        </form>
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

export default ProductosNew;
