import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return (<div>
        <Appbar />
            <div className="grid grid-cols-3 mx-10 my-28">
                <div className="col-span-2">
                    <div className="text-4xl font-bold pt-4 px-5">
                        {blog.title}
                    </div>
                    <div className="flex flex-col justify-center font-thin text-slate-800 px-5 py-2">
                        Posted on: 2nd Dec 2023
                    </div> 
                    <div className="text-xl font-thin pt-1 px-5">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-1 pt-4">
                    <div className="px-5 text-slate-500">
                        Author Name:
                    </div>
                    
                    <div className="flex px-5 pt-5">
                        <Avatar name={blog.author.name || "Anonymous"} />
                        <div className="px-5 py-2 font-bold text-xl">
                            {blog.author.name || "Anonymous"}
                        </div>
                        
                    </div>
                    <div className="font-thin px-5 py-3">
                            Go confidently in the direction of your dreams! Live the life you've imagined.
                    </div>
                    
                </div>
            </div>
    </div>
    )
}