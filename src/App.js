import React from "react";
import "./styles.css";
import {Route} from 'react-router-dom'
import Form from './Components/Form'
import User from './Components/User'
import Users from './Components/Users'
export default function App() {
  return (
    <div className="container">
     <Route path="/" exact component={Form} />
     <Route path="/users" component={Users}  />
     <Route path="/user/:id" exact component={User}  />
    </div>
  );
}
