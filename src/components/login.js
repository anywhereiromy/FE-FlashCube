import React, { Component } from 'react';
import '../login.css';
import logo from '../images/image.png';
import PT from "prop-types";
import { Redirect } from "react-router-dom";


class Login extends Component {

    state = {

        name: '',
        email: '',
        password: '',
        user: null,
        hasAccount: true,
        confirmPassword: "",
        photoURL: "",
        passwordsMatch: false

    }

    render() {
        const { name, email, password, confirmPassword, photoURL, hasAccount } = this.state;
        return (
            <div>
                {this.props.dbUser.uid ? 
                <Redirect to={`/home`} /> 
                : 
                <div>
                    <img alt="" className="logo-image" src={logo} />
                <div className="login-field">
                    <form className="login-field">
                        {!hasAccount && <div className="login-field">
                            <div className="input-field">
                            <i className="material-icons prefix">email</i>
                                <input value={name} placeholder="Name" onChange={this.handleChange} type="text" name="name" className="validate" />
                            </div>
                        </div>}
                        <div className="login-field">
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input value={email} placeholder="Email" onChange={this.handleChange} type="email" name="email" className="validate" />
                            </div>
                        </div>
                        <div className="login-field">
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <input value={password} placeholder="Password" onChange={this.handleChange} type="password" name="password" className="validate" />
                            </div>
                        </div>
                        {!hasAccount && <div className="login-field">
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <input value={confirmPassword} placeholder="Retype Password" onChange={this.handleChange} type="password" name="confirmPassword" className="validate" />
                            </div>
                        </div>}
                        {!hasAccount && <div className="login-field">
                            <div className="input-field">
                                <i className="material-icons prefix">picture</i>
                                <input value={photoURL} placeholder="Avatar URL" onChange={this.handleChange} type="text" name="photoURL" className="validate" />
                            </div>
                        </div>}
                        <div className="login-but">
                            <button onClick={hasAccount ? (e) => {this.props.login(e, email, password, this.props.history)} : this.checkPasswordsMatch} className="btn waves-effect waves-light" type="submit" name="action">{hasAccount ? "Login" : "Sign Up"}
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                        {/* why is the button below not rendering properly */}
                        <button onClick={this.toggleHasAccount} className="btn waves-effect waves-light" type="button" name="login signup">{hasAccount ? "Create Account" : "Back to Login"}
                                <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>

                <button className="loginBtn loginBtn--facebook" onClick={/*why is this in it's own callback function?*/this.props.authWithFacebook}>Log In with Facebook</button>

                </div>
            }
                
            </div>
        )
    }

    handleChange = (e) => {
        const { password, confirmPassword, passwordsMatch} = this.state;
        this.setState({ 
            [e.target.name]: e.target.value,
        });
        if(password === confirmPassword) {
            !passwordsMatch &&
            this.setState({ 
                passwordsMatch: true,
            });
        } else {
            passwordsMatch &&
            this.setState({ 
                passwordsMatch: false,
            });
        }
    }

    checkPasswordsMatch = (e) => {
        const { password, confirmPassword, email, name } = this.state;
        if(password !== confirmPassword) {
            this.setState({
                passwordsMatch: false
            })
        } else { 
            this.props.signup(e, email, password, confirmPassword, name, this.props.history);
        }
    }

    toggleHasAccount = () => {
        this.setState({ 
            hasAccount: !this.state.hasAccount 
        });
    }
}

Login.propTypes = {
    history: PT.object.isRequired,
    login: PT.func.isRequired,
    signup: PT.func.isRequired,
    authWithFacebook: PT.func.isRequired,
    dbUser: PT.object.isRequired
 }

export default Login;