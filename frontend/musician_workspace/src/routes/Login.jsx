import {useState} from "react";
import { makeUnauthenticatedPostRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const LoginComponent = () => {
     
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[cookie,setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async ()=>{
    const data = {email,password};
    console.log(JSON.stringify(data));
    const response = await makeUnauthenticatedPostRequest("/auth/register",data);
    if(response){
        const token =response.token;
        const date = new Date();
        date.setDate(date.getDate()+30);
        setCookie("token",token,{path:"/",expires:date});
        alert("Successfully registered!");
        navigate("/home");
    }
    else{
        alert("failure");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="main bg-white rounded-lg shadow-md p-10 transition-transform w-96 text-center">
        <h1 className="	font-weight:500 text-blue-600/75 text-3xl">
           SANGEET KAKSHA
        </h1>
        <h3 className="text-lg">
          Enter your login credentials
        </h3>
        <form action="">
          <label htmlFor="first" className="block mt-4 mb-2 text-left text-gray-700 font-bold">Email:</label>
          <input
            type="text"
            id="first"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="first"
            placeholder="Enter your Email"
            className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
            required
          />
          <label htmlFor="password" className="block mb-2 text-left text-gray-700 font-bold">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            placeholder="Enter your Password"
            className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
            required
          />
          <div className="flex justify-center items-center">
            <button onClick={(e)=>{
                e.preventDefault();
                login();}
            }
              type="submit"
              className="bg-blue-600/50 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-600/75"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="mt-4">Not registered? <a href="/signup" className="text-blue-500 hover:underline">Create an account</a></p>
      </div>
    </div>
  );
};

export default LoginComponent;
