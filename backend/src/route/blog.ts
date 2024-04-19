import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

export const blogRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_TOKEN: string
    }
}>()

//Middleware
// blogRoute.use("./*", (c,next)=>{
//     //Extract the userId
//     //Pass down to the route handler 
//     next();
// })


blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();

    try{
        const blog = await prisma.blog.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: '9b5fdd84-2f4a-4b7b-9b42-4a611d09ec3a'
            }
        })
          
        return c.json({
            id: blog.id
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

    try{
        const blog = await prisma.blog.update({
            where:{
                id: body.id
            },
            data:{
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            id: blog.id
        })
    }catch(e){
        c.status(411);
        return c.text("Error while posting the blog");
    }

})

blogRoute.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: body.id
            } 
        })
        return c.json({
            blog
        })

    }catch(e){
        c.status(411);
        return c.text("Error while getting the blog post with the given id");
    }

})


//TODO add pagination
blogRoute.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();

    try{
        const blogs = await prisma.blog.findMany({})

        return c.json({
            blogs
        })
        
    }
})