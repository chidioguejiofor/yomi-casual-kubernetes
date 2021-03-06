import "dotenv/config";
import server from "./app";
import "./database/models";
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server Started at Port, ${PORT}`);
});
