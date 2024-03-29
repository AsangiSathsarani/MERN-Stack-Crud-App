import React, { Component } from 'react';
import {BrowserRouter as Router , Route , Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "container">

          <nav className ="navbar navbar-expand-lg navbar-light bg-light">
              <a className ="navbar-brand" href = "https://codingthesmartway.com" target ="_blank">
                  <img src = {logo} width ="30" height = "30" alt ="CodingTheSmartWay.com"/>

              </a>
              
              <Link to = "/" className = "navbar-brand">MERN-Stack Todo App</Link>
              
              <Link to = "/" className ="nav-Link">Todos</Link>
              
              <Link to = "/create" className ="nav-Link">Create Todo</Link>
              
          </nav>
          
          <Route path = "/" exact component = {TodosList} />
          <Route path = "/edit/:id"  component = {EditTodo} />
          <Route path = "/create" component = {CreateTodo} />
        </div>
        
      </Router>
      
    );
  }
}

export default App;
