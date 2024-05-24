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
                    {blogs.map(blog =>  <BlogCard
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"23/5/24"}            
                    />)}
                   
                    {/* <BlogCard
                        authorName={"Swapnil Hajare"}
                        title={"Environmental science"}
                        content={"Environmental science studies the interactions between humans and the environment, encompassing topics such as pollution, conservation, biodiversity, and sustainability."}
                        publishedDate={"23/5/24"}            
                    />
                    <BlogCard
                        authorName={"Swapnil Hajare"}
                        title={"Environmental science"}
                        content={"Environmental science studies the interactions between humans and the environment, encompassing topics such as pollution, conservation, biodiversity, and sustainability."}
                        publishedDate={"23/5/24"}            
                    />
                    <BlogCard
                        authorName={"Swapnil Hajare"}
                        title={"Environmental science"}
                        content={"Environmental science studies the interactions between humans and the environment, encompassing topics such as pollution, conservation, biodiversity, and sustainability."}
                        publishedDate={"23/5/24"}            
                    /> */}
                </div>
            </div>
        </div>
    )
}