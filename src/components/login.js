import React, { Component } from 'react';
import '../login.css';
import { fire, facebookProvider } from '../config/Fire';
import Signup from './signup';
import logo from '../images/image.png';

class Login extends Component {

    state = {

        email: '',
        password: '',
        user: null

    }

    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                this.props.history.push('/home')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    signup = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                return <Signup />
            })
            .catch((error) => {
                console.log(error)
            })

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    authWithFacebook = () => {
        fire.auth().signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    console.log(error)
                } else {

                    this.setState({
                        user: true
                    }, () => {
                        this.props.history.push('/home')

                    })
                }
            })
    }

    render() {
        return (
            <div>

                <img alt="" className="logo-image" src={logo} />

                <div className="login-field">
                    <form className="login-field">
                        <div className="login-field">
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input value={this.state.email} placeholder="Email" onChange={this.handleChange} type="email" name="email" className="validate" />
                            </div>
                        </div>
                        <div className="login-field">
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <input value={this.state.password} placeholder="Password" onChange={this.handleChange} type="password" name="password" className="validate" />
                            </div>
                        </div>
                        <div className="login-but">
                            <button onClick={this.login} className="btn waves-effect waves-light" type="submit" name="action">Login
                                <i className="material-icons right">send</i>
                            </button>
                        </div>

                        <button onClick={this.signup} className="btn waves-effect waves-light" type="submit" name="action">Signup
                                <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>

                <button className="loginBtn loginBtn--facebook" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>

            </div>
        )
    }
}


export default Login;