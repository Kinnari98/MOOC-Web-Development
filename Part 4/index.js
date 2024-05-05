// Päämoduuli, käynnistää sovelluksen
const app = require("./app");
const http = require("http");
console.log("hello from index");

const PORT = process.env.PORT || 3003;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
