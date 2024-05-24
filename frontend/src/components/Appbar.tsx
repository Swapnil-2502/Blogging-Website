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
            <div className="">
                <Avatar name="Swapnil" />
            </div>
        </div>
    )
}