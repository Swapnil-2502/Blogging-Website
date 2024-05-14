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

export default app
