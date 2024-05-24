import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () =>{
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'}>
                <div className="text-2xl cursor-pointer">
                    Blog Site
                </div>
            </Link>
            <div className="flex">
                <Link to={'/publish'}>
                    <button type="button" className="mr-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2">New</button>
                </Link>
                <div className="mr-10">
                    <Avatar name="Swapnil" />
                </div>
                
            </div>
        </div>
    )
}