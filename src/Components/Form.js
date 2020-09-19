import React from "react";
import "../styles.css";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import fireb from '../fireb'
const FIREBASE = fireb.database().ref("Users")

function Form(props) {

    // react-hook-form
  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    //Add user data to Firebase
    FIREBASE.push(values);
   // props from react-router-dom
    props.history.push('/users');
  };

  return (

    // Form 
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>Form</span>

      {/* Name */}
      <input ref={register} name="name" placeholder="Name" required />

      {/* Email */}
      <input
        ref={register({
               required:true,
               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
        name="email"
        placeholder="Email"
        type="email"
      />

      {/* Phone Number */}
      <input required
        ref={register({
          pattern: {
            value: /^\d{10}$/,
          },
        })}
        name="phone"
        placeholder="Phone"
      />

  {/* Radio Button - Gender */}
      <ul className="radio">
        <label>Gender</label>
        <li>
          <input
            ref={register}
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
            required
            type="radio"
            value="Female"
            name="gender"
          />
          <label>Female</label>
        </li>
      </ul>

      {/* Dropdown - Skills */}
      <select required
        ref={register({
          pattern: {
            value: /^[A-Z]{2,}$/i,
          },
        })}
        name="skills"
      >
        <option value="0">Please Choose Skills...</option>
        <option value="UI">UI</option>
        <option value="UX">UX</option>
        <option value="Backend">Backend</option>
        <option value="CSS">CSS</option>
      </select>

      {/* Description  */}
      <textarea ref={register} name="description" placeholder="Description" />

      {/* Submit Button  */}
      <button>Submit</button>
    </form>
  );
}

// withRouter(HOC) - Routing to the User Component
export default withRouter(Form);
