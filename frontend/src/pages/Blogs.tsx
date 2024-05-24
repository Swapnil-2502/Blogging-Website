import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () =>{

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
                loading...
            </div>
        
    }

    return (
        <div>
            <Appbar />
            <div className=" flex justify-center">
                <div className="justify-center">
                    {blogs.slice().reverse().map(blog =>  <BlogCard
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"23/5/24"}            
                    />)}
                </div>
            </div>
        </div>
    )
}