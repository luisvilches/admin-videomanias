import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

var dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

var API =  prod;

class InitSession extends Component {

  constructor(props){
    super(props);

  }

  login(){
        //console.log(this.refs)

        let user = this.refs.user.value;
        let pass = this.refs.pass.value;

        const formData = new FormData()
        formData.append('mail',user)
        formData.append('password',pass)

        fetch(API + '/login', {
        method: 'POST',
        body: formData
        })
        .then(r => r.json())
        .then(data => {
            if(data.success === false){
                alert('Usuario o contraseña incorrectos!!')
            } else{
                console.log(data)
                if(data.user.admin === true){
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('success', data.success);
                  localStorage.setItem('user', data.user._id)
                  this.setState({
                      session: true,
                  })
                  location.reload();
                } else {
                  alert('usuario invalido')
                }
                
            }
        })

    }

    render(){
      return(
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-md-4 push-md-4 top"> 
              <img src="img/logo.png" alt="" className="img-responsive lgo"/>
              <h2 className="text-center">Inicio de sesion</h2>
                <br/>
                <input ref="user" type="text" placeholder="Nombre de usuario" className="form-control"/>
                <br/>
                <input ref="pass" type="password" placeholder="Contraseña" className="form-control"/>
                <br/>
                <input type="button" onClick={this.login.bind(this)} value="Iniciar session" className="form-control btn-primary"/>
            </div>
          </div>
        </div>
      )
    }

}


class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      session: false
    }
  }

  validationSession(){
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null || localStorage.getItem("success") === ''){
            this.setState({
                session:false
            })
        } else {
            this.setState({
                session:true
            })
        }
    }

  componentWillMount(){
    this.validationSession();
  }

  render(){
     return(
       <div>
         { this.state.session ? <Router routes={routes} history={hashHistory} /> : <InitSession handler={this.componentWillMount.bind(this)} />}
       </div>
     )
  }
}

ReactDOM.render(
  <Login />, document.getElementById('root')
);
