import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { userRoute } from './route/user'
import { blogRoute } from './route/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_TOKEN: string
  }
}>()

app.route("/api/v1/user",userRoute);
app.route("/api/v1/blog",blogRoute);

//Middleware
app.use('/api/v1/blog/*', async (c, next) => {
    // get the header
    // verify the header
    // if the header is correct, we can proceed,
    // if not, we return the user with a 403 status code
    const header = c.req.header("authorization") || "";

    const token = header.split(" ")[1];

    const response = await verify(token , c.env.JWT_TOKEN) 
    if(response.id){
      next()
    }else{
      c.status(403);
      return c.json({error: "unauthorized"});
    }
})

export default app
