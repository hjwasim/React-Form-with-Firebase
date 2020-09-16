import React from "react";
import "./styles.css";
import {Route} from 'react-router-dom'
import Form from './Components/Form'
import User from './Components/User'

export default function App() {
  return (
    <div className="container">
     <Route path="/" exact component={Form} />
     <Route path="/user/:key" exact component={User}  />
    </div>
  );
}
