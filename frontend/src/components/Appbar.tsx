import { Avatar } from "./BlogCard"

export const Appbar = () =>{
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <div className="text-2xl">
                Blog Site
            </div>
            <div className="">
                <Avatar name="Swapnil" />
            </div>
        </div>
    )
}