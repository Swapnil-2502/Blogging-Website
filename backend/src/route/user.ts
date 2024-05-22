import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput} from "@swapnil25/medium-common";

export const userRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_TOKEN: string
    }
  }>()

userRoute.post('/signup',async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)

    if(!success){
      c.status(411);
      return c.json({
        message :"Inputs are not correct for SIGNUP"
      })
    }
  
    //IF duplicate email comes in
    try{
      const user = await prisma.user.create({
        data:{
          name:body.name,
          email:body.email,
          password:body.password
        }
      });
      const jwt_token = await sign({id: user.id},c.env.JWT_TOKEN)
      return c.json({
        jwt: jwt_token
      })
    }
    catch(e){
      c.status(411);
      return c.text("User already exists with this email");
    }
})
  
userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)

    if(!success){
      c.status(411);
      return c.json({
        message :"Inputs are not correct SINGIN"
      })
    }

    const user = await prisma.user.findUnique({
    where: {
        email: body.email,
        password: body.password
        }
    });

    if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_TOKEN);
    return c.json({ 
      jwt,
      message: "You are sucessfully logged in"
     });
})