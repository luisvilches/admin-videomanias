import React, { Component } from 'react';
import {Table,Container, Row, Col,Button} from 'reactstrap';
import TinyMCE from 'react-tinymce';
import Switch2 from 'rc-switch'
import {Link} from 'react-router'

var edit;

var dev = 'http://localhost:4000'

class Ficha extends Component {

  constructor(props){
    super(props);

    this.state = {
      api: dev,
      product:[],
      text: ``,
      category: [],
      family: [],
      gender: [],   
      offer: false,
      premiere: false,
      modal: false,
      name: '',
      price:'',
      sku: '',
      pie: '',
      media:''
    }
  }

  toggle(value){
    this.setState({
      offer: !this.state.offer,
    });
    console.log('offer: '+this.state.premiere)
  }

  togglePremiere(value){
    this.setState({
      premiere: !this.state.premiere,
    });
    console.log('premiere: '+this.state.premiere)
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

    
    this.categories();
    this.family();
    this.gender();   
  }

  componentDidMount(){
    fetch(`${this.state.api}/product/${this.props.params.product}`)
    .then(res => res.json())
    .then(response => {
     
      this.setState({
        product: response.data,
        text: response.data.description,
        name: response.data.name,
        price:response.data.price,
        sku: response.data.sku,
        pie: response.data.pie,
        media:response.data.media,
      })
      
    })
    console.log(this.props.params.product)
  }

  editarSave(){
    var formData = new FormData();
      formData.append('name', this.state.name)
      formData.append('pie', this.state.pie)
      formData.append('description', this.state.text)
      formData.append('price', this.state.price)
      formData.append('premiere', this.state.premiere)
      formData.append('offer', this.state.offer)
      formData.append('media', this.state.media)
   
    if(!this.refs.img.files[0]){

     fetch(`${this.state.api}/product/${this.state.product._id}`,
          {
             headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            method: 'PUT',
            body: formData
          }
        )
        .then(res => res.json())
        .then(response => {
          console.log(response)
          console.log(this.state.product._id)
          this.componentWillMount()
        })

    }else{
        formData.append("img", this.refs.img.files[0]);
        fetch(`${this.state.api}/product/image/${this.state.product._id}`,
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              method: 'PUT',
              body: formData
            }
          )
          .then(res => res.json())
          .then(response => {
            console.log(response)
            console.log(this.state.product._id)
            this.componentWillMount()
          })

          console.log('imagen cargadada')
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container>
          <Row>
            <form>
                <Row>
                  <Col xs="12" md="12">
                    <label>
                      Nombre(*):
                    </label>
                    <input ref="nombre" type="text" className="form-control" value={this.state.name} onChange={item => this.setState({name:item.target.value})}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="8">
                    <label>
                      Bajada de titulo:
                    </label>
                    <input ref="pie" type="text" className="form-control" value={this.state.pie} onChange={item => this.setState({pie:item.target.value})}/>
                  </Col>
                  <Col xs="12" md="4">
                    <label>
                      Precio(*):
                    </label>
                    <input ref="price" type="number" className="form-control" value={this.state.price} onChange={item => this.setState({price:item.target.value})}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="12">
                    <label>
                      Descripcion(*):
                    </label>
                    <textarea onChange={(item) => {this.setState({text: item.target.value})}} ref="description" value={this.state.text} rows="10" className="form-control"></textarea>
                  </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                  <Col xs="12" md="6">
                  <label>
                      ¿Producto en Oferta?: 
                    </label>
                  <Switch2
                      onChange={this.toggle.bind(this)}
                      checked={this.state.product.offer}
                      checkedChildren={'Si'}
                      unCheckedChildren={'No'}
                    />
                    <br/>
                    <br/>
                    <label>
                      ¿Producto en Estreno?: 
                    </label>
                    <Switch2
                      onChange={this.togglePremiere.bind(this)}
                       checked={this.state.product.premiere}
                      checkedChildren={'Si'}
                      unCheckedChildren={'No'}
                    />
                    <br/>
                    <br/>
                    <label>
                      Video de Youtube(*):
                    </label>
                    <input ref="media" type="text" className="form-control" value={this.state.media} onChange={item => this.setState({media:item.target.value})}/>
                  </Col>
                  <Col xs="12" md="6">
                    <div className="pd20">
                      <label>
                        Imagen del cover(*):
                      </label>
                      <img src={this.state.product.image} className="img-responsive imgMax" alt=""/>
                      <input ref="img" name="img" id="img" type="file" className="form-control" accept="image/*" />
                    </div>
                  </Col>
                </Row>
            </form>
          </Row>
          <Row>
            <Col xs="12" sm="12">
              <button className="pull-right btn btn-danger" onClick={this.editarSave.bind(this)} >Editar producto</button>
              <Link to="/productos" className="pull-right btn btn-primary">Volver</Link>
            </Col>
          </Row>
          <br/>
        </Container>
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
        <option value={this.props.textOption} selected>{this.props.textOption}</option> 
        {this.props.options.map((item,index)=>{
          return(
            <option key={index} value={item.name} onChange={(name) => {this.setState({value:item.name})}}>{item.name}</option>
          )
        })}
      </select>
    )
  }
}

export default Ficha;
