import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="mx-40 space-y-5 mt-20">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Title</label>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " placeholder="Title" />
            </div>
            <div className="mx-40 space-y-5  mt-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Blog</label>
                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                
            </div>
            <div className="mx-40 mt-5">
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content: description
                    },{
                        headers:{
                            Authorization : localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
                        Publish post
                </button>
            </div>
            
        </div>
    )
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}){
    return <form>
       <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
           <div className=" bg-white rounded-b-lg ">
               <label  className="sr-only">Publish post</label>
               <textarea onChange={onChange} rows={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Write an Blog..." required ></textarea>
           </div>
       </div>
    </form>
    
}