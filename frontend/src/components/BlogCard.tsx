import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id:string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return ( <Link to={`/blog/${id}`}>
    <div className="pb-4 p-10 cursor-pointer">
        <div className="flex">
            <Avatar name={authorName} /> 
            <div className="flex flex-col justify-center pl-2">
                <div className="font-thin">{authorName}</div>   
            </div>   
            <div className="flex flex-col justify-center px-2" style={{ fontSize: '5px' }}>
                &#9679;
            </div>
            <div className="flex flex-col justify-center font-thin text-slate-800">
                {publishedDate}
            </div>   
            
           
        </div>
        <div className="text-2xl font-bold pt-4">
            {title}
        </div>
        <div className="text-md font-thin pt-1">
            {content.slice(0,100)} {"..."}
        </div>
        <div className="text-sm text-slate-500 font-thin pt-4">
            { `${Math.ceil(content.length / 100)} min read`}
        </div>
        <div className="bg-gray-200 my-2" style={{height: '1px'}}>

        </div>
    </div>
    </Link>
    )
}

export function Avatar({name}:{name:string}){
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-800">{name[0]}</span>
        </div>
    )
}