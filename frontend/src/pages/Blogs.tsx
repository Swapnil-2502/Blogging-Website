import { BlogCard } from "../components/BlogCard"

export const Blogs = () =>{
    return (
        <div className="flex justify-center">
            <div className="justify-center">
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
                />
                <BlogCard
                    authorName={"Swapnil Hajare"}
                    title={"Environmental science"}
                    content={"Environmental science studies the interactions between humans and the environment, encompassing topics such as pollution, conservation, biodiversity, and sustainability."}
                    publishedDate={"23/5/24"}            
                />
            </div>
        </div>
    )
}