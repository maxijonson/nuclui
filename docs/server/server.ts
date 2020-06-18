import express from "express";
import enforce from "express-sslify";
import path from "path";

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Redirect HTTP to HTTPS
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get("*", (_req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
    console.info(`server is up on port ${port}`);
});
