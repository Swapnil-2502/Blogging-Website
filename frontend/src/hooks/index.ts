import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    // console.log(localStorage.getItem("token"))

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
