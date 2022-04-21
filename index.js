const mongoConnect = require("./config/dbConnection.js");
const app = require("./server.js");

const port = process.env.PORT || 3001;

mongoConnect(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
