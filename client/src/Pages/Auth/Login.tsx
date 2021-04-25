import React, { useState } from "react";

interface LoginProps {
    updateToken: Function;
  }
  interface LoginState {
    email: string;
    password: string;
    errors: {
      email: string;
      password: string;
    };
  }

export default class Login extends React.Component <LoginProps, LoginState>  {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
          email: "",
          password: "",
          errors: {
            email: "",
            password: "",
          },
        };
      }


    handleSubmit =(e: React.SyntheticEvent) => {
        e.preventDefault();
        fetch('http://localhost:3000/user/user/login',{
            method: 'POST',
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })}).then(response => {
              
            });
          }
        render() {
return(
    <div>
        <h1>Login</h1>
    </div>
)
   }
}
