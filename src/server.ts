import app from "./app";
import "dotenv/config";
import { startDatabase } from "./database";

const PORT: number = Number(process.env.SV_PORT) || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  startDatabase();
});
