import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs = () =>{

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div className="flex flex-col justify-center px-80 pt-20 space-y-10">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
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