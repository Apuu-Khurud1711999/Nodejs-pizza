import React, { useState, useEffect } from "react";
// import json from '../cred.json';
import { useHistory, Link } from "react-router-dom";
import { verify } from "../config/MyService";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [proData, setProData] = useState([]);
  // const [userData, setUserData] = useState([])
  const History = useHistory();

  useEffect(() => {
    verify().then((res) => {
      console.log(res.data);
      setProData(res.data.data);
      // if(res.data.err==0){
      //     setPostdata(res.data.a);
      // }
    });
    console.log(proData);
  }, []);
  console.log(proData);
  const handler = (e) => {
    e.preventDefault();

    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        console.log("Nothing Matches");
        break;
    }
  };

  const formsubmit = (e) => {
    e.preventDefault();
    let formdata = {
      email: email,

      password: password,
    };
    console.log(formdata);
    let flag = 0;
    for (var i = 0; i < proData.length; i++) {
      if (
        proData[i].email === formdata.email &&
        proData[i].password === formdata.password
      ) {
        alert("Login Successful");
        localStorage.setItem("userdetails", formdata.email);
        flag = 1;
        History.push("/Dash");
      }
    }
    if (flag === 0) {
      alert("Enter valid credentials");
    }
  };

  return (
    <div>
      <div className="container row card" >
        <h1 className="text-center">Login</h1>
        <h5>Email:</h5>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Email"
          name="email"
          aria-label="default input example"
          onChange={handler}
        /><br/>
        <h5>Password:</h5>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          name="password"
          placeholder="Enter Password"
          onChange={handler}
        /><br/>
        <div className="text-center">
        <button
          type="button"
          class="btn btn-success"
          onClick={formsubmit}
        >
          Submit
        </button></div><br />
        <p className="text-center">
        Click here to <Link to="/Reg">Register</Link>
      </p>
      </div>
     
    </div>
  );
}
