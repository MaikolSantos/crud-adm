import { client } from "./";

const startDatabase = () => {
  client.connect();
  console.log("Connected Database");
};

export default startDatabase;
