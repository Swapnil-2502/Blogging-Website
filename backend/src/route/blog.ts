import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@swapnil25/medium-common";

export const blogRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_TOKEN: string
    },
    Variables:{
        userId: string;
    }
}>()

//Middleware
// get the header
//     // verify the header
//     // if the header is correct, we can proceed,
//     // if not, we return the user with a 403 status code
blogRoute.use("/*",async (c,next)=>{
    //Extract the userId
    //Pass down to the route handler 
    const authHeader = c.req.header("Authorization") || ""; //get the authorization header from user.
    try {
        const user = await verify(authHeader,c.env.JWT_TOKEN); // check if the token send by user is correct.
   
        if(user){
            c.set("userId",user.id); 
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    
    
})


blogRoute.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body)

    if(!success){
      c.status(411);
      return c.json({
        message :"Inputs are not correct CREATE BLOG"
      })
    }

    const AuthorId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
        const blog = await prisma.blog.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: AuthorId
            }
        })
          
        return c.json({
            id: blog.id,
            message: "Your blog was posted"
        })

    }catch(e){
        c.status(411);
        return c.text("Error while posting the blog");
    }
    
})
  
blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)

    if(!success){
      c.status(411);
      return c.json({
        message :"Inputs are not correct UPDATE BLOG"
      })
    }

    try{
        const blog = await prisma.blog.update({
            where:{
                id: body.id
            },
            data:{
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            id: blog.id,
            message: "Your blog was updated"
        })
    }catch(e){
        c.status(411);
        return c.text("Error while updating the blog");
    }

})

//TODO add pagination
blogRoute.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blogs = await prisma.blog.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        blogs
    })
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: id
            },
            select:{
                id:true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            } 
        })
        return c.json({
            blog,
        });

    }catch(e){
        c.status(411);
        return c.text(`Error while getting the blog post with the given ${id}`);
    }
})