import { FullBlog } from "../components/Fullblog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () =>{
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if(loading){
        return <div className="flex items-center justify-center h-screen">
            <Spinner />
        </div>
    }

    return <div>
        <FullBlog blog={blog}/>
    </div>
}