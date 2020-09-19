import React, { useState, useEffect } from "react";
import "./users.css";
import fireb from '../fireb';
let fireRef = fireb.database().ref("Users");

export default function Users(props) {

  const [us, setUs] = useState([])
 
  const [k, setK] = useState(null)

  //get users data from firebase
  useEffect(() => {

    fireRef.on("value", (snapshot) => {
      let user = snapshot.val();
      let users = [];
      for (let key in user) {
        users.push({ key, ...user[key] });
      }
      setUs(users)
    })
    
  },[k]);
 
  const passKey = key => {
   
      // props from react-router-dom
      props.history.push(`/user/${key}`);
  } 

  return (
    <div className="user-container">
        <div className="model">
     {
       us.map(item => <div key={item.key}>
         <ul className="users">
         <li>
          {item.name}
          <button onClick={() => {
            setK(item.key)
            passKey(item.key)           
          }}>Edit</button>
           </li>
         </ul>
         </div>)
     }
     </div>
    </div>
  );
}

