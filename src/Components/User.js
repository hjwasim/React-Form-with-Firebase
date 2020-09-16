import React, { useState, useEffect } from "react";
import "./user.css";
import { useForm } from "react-hook-form";
import fireb from '../fireb';

export default function User({ location }) {
    
  //react-hook-form
  const { handleSubmit, register } = useForm();

  //key - destructured from url-query
  const { pathname } = location;
  let querykey = pathname.split("/user/");
  let key = querykey[1].toString();

  const [isUpdate, setIsUpdate] = useState(false);
  const [Data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    skills: "",
    description: "",
  });

  //get users data from firebase
  useEffect(() => {
     const getUsers = async () => {
    let fireRef = fireb.database().ref("Users").child(key);
    fireRef.on("value", (snapshot) => {
      let user = snapshot.val();
      setData(user);
    });
  };
    getUsers();
  },[key]);

 

  //update fields
  const handleUpdate = (e, key) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  //save updated fields to firebase
  const submitUpdate = (values) => {
    let fireRef = fireb.database().ref("Users").child(key);
    fireRef.update(Data);
    setIsUpdate(false);
  };

  return (
    <div className="user-container">
      <div className="user-details-model">
      
          {/* Name Field */}
         <div>
            <span>Name</span>
            {isUpdate ? (
              <input
                ref={register({required:true})}
                type="text"
                value={Data.name}
                name="name"
                onChange={(e) => handleUpdate(e, key)}
              />
            ) : (
              <span>{Data.name}</span>
            )}
          </div>

          {/* email field */}
        <div>
          <span>Email</span>
          {isUpdate ? (
            <input
              ref={register({
                required:true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
              value={Data.email}
              name="email"
              onChange={(e) => handleUpdate(e, key)}
              required
            />
          ):(
            <span>{Data.email}</span>
          )}
        </div>

        {/* phone number field */}
        <div>
          <span>Phone</span>
          {isUpdate ? (
            <input
              ref={register({
                required: true,
                pattern: {
                  value: /^\d{10}$/,
                },
              })}
              value={Data.phone}
              name="phone"
              onChange={(e) => handleUpdate(e, key)}
            />
          ) : (
            <span>{Data.phone}</span>
          )}
        </div>

        {/* gender field */}
        <div className="gender">
          <span>Gender</span>
          {isUpdate ? (
            <ul>
              <label>Gender</label>
              <li>
                <input
                  ref={register}
                  onChange={(e) => handleUpdate(e, key)}
                  required
                  type="radio"
                  value="Male"
                  name="gender"
                />
                <label>Male</label>
              </li>
              <li>
                <input
                  ref={register}
                  onChange={(e) => handleUpdate(e, key)}
                  required
                  type="radio"
                  value="Female"
                  name="gender"
                />
                <label>Female</label>
              </li>
            </ul>
          ) : (
            <span>{Data.gender}</span>
          )}
        </div>

        {/* skills field */}
        <div>
          <span>Skills</span>
          {isUpdate ? (
           <select onChange={(e) => handleUpdate(e, key)} name="skills">
               <option value="0">Please Choose Skills...</option>
               <option value="UI">UI</option>
               <option value="UX">UX</option>
               <option value="Backend">Backend</option>
               <option value="CSS">CSS</option>   
            </select>
          ) : (
            <span>{Data.skills}</span>
          )}
        </div>

        {/* Description field */}
        <div>
          <span>Description</span>
          {isUpdate ? (
            <textarea
              value={Data.description}
              name="description"
              onChange={(e) => handleUpdate(e, key)}
            />
          ) : (
            <span>{Data.description}</span>
          )}
        </div>
      </div>
      
      {/* Button Fields */}
      <div className="btn">
        <button onClick={() => setIsUpdate(true)}>Edit</button>
        <button onClick={handleSubmit(submitUpdate)}>Update</button>
      </div>
    </div>
  );
}
