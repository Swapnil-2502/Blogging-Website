import { ChangeEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { SignupInput } from "@swapnil25/medium-common"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs ] = useState<SignupInput>({
        name:"",
        email: "",
        password:"",
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==='signup' ? 'signup' : 'signin'}`, postInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("Token: ",jwt);
            navigate("/blogs");
        }
        catch{
            alert("Something went wrong");
        }
        
    }

    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-center">
            {/* {JSON.stringify(postInputs)} */}
            <div className="flex justify-center">
                <div>
                    <div className="text-center text-3xl font-bold">
                        {type==="signup" ? "Create an account" : "Signin into your account"}
                       
                    </div>
                    <div className="text-center text-gray-700 pt-3 font-thin">
                        {type==="signup" ? "Already have a account?" : "Dont't have a an account? "}
                        <Link className="hover:text-blue-800 hover:underline pl-2" 
                        to={type==="signup"? "/signin" :"/signup"}>{type==='signup' ? "Signin" : "Signup"}</Link> 
                    </div>
                    <div className="pt-4 space-y-5 flex flex-col items-center justify-center">
                        { type==="signup"?
                            <LabelledInput label="Name (Optional)" placeholder="Enter your name ex: Swapnil Hajare" id="name" onChange={(e) =>{
                           setpostInputs(c => ({
                            ...c, //Give me all the existing keys from here but overwrite name
                            name: e.target.value,
                           }))
                        }} />: null}
                        <LabelledInput label="Email" placeholder="Enter your email" id="email" onChange={(e) =>{
                            setpostInputs(c => ({
                                ...c, //Give me all the existing keys from here but overwrite email
                                email: e.target.value,
                               }))
                        }} />
                        <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e) =>{
                            setpostInputs(c => ({
                                ...c, //Give me all the existing keys from here but overwrite password
                                password: e.target.value,
                               }))
                         }} />
                         <button onClick={sendRequest} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-72">{type==='signup' ? 'Sign up' : 'Sign in'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType{
    label: string,
    placeholder: string,
    id?:string,
    type?: string,
    onChange:(e : ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({label, placeholder, id, type, onChange}: LabelledInputType){
    return (
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
                <input onChange={onChange} type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}
