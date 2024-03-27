import {useState} from "react";
import{useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedPostRequest } from "../utils/serverHelpers";
const SignupComponent = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [lastName,setLastName] = useState("");
    const [cookie,setCookie] = useCookies(["token"]);
    // const { setIFirstName } = useContext(MyContext);
  const [firstName, setFirstName] = useState('');
    const navigate = useNavigate();
    const signup = async ()=>{
       const data = {email,password,firstName,lastName};
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
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="main bg-white rounded-lg shadow-md p-10 transition-transform w-96 text-center">
        <h1 className="text-blue-600/75 text-3xl">
          SANGEET KAKSHA
        </h1>
        <h3 className="text-lg">
          Create your account
        </h3>
        <form action="">
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-left text-gray-700 font-bold">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e)=>
                  setFirstName(e.target.value)
                }
                name="firstName"
                placeholder="Enter your First Name"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-left text-gray-700 font-bold">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                name="lastName"
                placeholder="Enter your Last Name"
                className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
                required
              />
            </div>
          </div>
          <label htmlFor="email" className="block mb-2 mt-4 text-left text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            placeholder="Enter your Email"
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
            required
          />
          <label htmlFor="password" className="block mb-2 text-left text-gray-700 font-bold">Create Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            placeholder="Create your Password"
            className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-400"
            required
          />
          <div className="flex justify-center items-center">
            <button
                onClick={(e)=>{
                    e.preventDefault();
                    signup();
                }}
              type="submit"
              className="bg-blue-600/50 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-600/75"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a></p>
      </div>
    </div>
  );
};

export default SignupComponent;
