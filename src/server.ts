import { createApp } from "./app";

const app = createApp();
const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT) || 3000;

app.listen(port, host, () => {
  console.log(`🚀 Server running at http://${host}:${port}`);
});
