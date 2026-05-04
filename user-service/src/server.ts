import { app } from "@/app.ts"
import { env } from "@/lib/env.ts"

app.get('/health', async () => {
  return {
    status: 'ok',
    service: "User Service",
    timeStamp: new Date().toISOString(),
  }
})

const start = () => {
  try {
    app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    })
    console.log(`HTTP Server running`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
