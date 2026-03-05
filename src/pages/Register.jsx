import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration successful");

      navigate("/");

    }catch(err){

      alert("Registration failed");

    }

  };

  return(

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-80"
      >

        <h2 className="text-xl font-bold mb-4">
          Register
        </h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded">
          Register
        </button>

      </form>

    </div>

  );

}