import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login",{
        email,
        password
      });

      login(res.data);

      navigate("/dashboard");

    } catch(err) {

      alert("Login failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-80"
      >

        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <input
          type="email"
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

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>

        <p className="text-sm mt-3 text-center">

          Don't have an account?

          <span
            onClick={()=>navigate("/register")}
            className="text-blue-600 cursor-pointer ml-1"
          >
            Register
          </span>

        </p>

      </form>

    </div>

  );

}