const app = require("./app")

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1"

app.listen(PORT, HOST, () => {
    console.log(`Server listening at http://${HOST}:${PORT}/`);
})