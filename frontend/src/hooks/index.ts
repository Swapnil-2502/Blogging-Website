import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    "content" :  string,
    "title" : string,
    "id" : string,
    "author" : {
        "name" : string
    }
}

export const useBlog = ({id}: {id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response)
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false); // make sure to handle errors by setting loading state to false
            });
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response)
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false); // make sure to handle errors by setting loading state to false
            });
    }, [])

    return {
        loading,
        blogs
    }
}
