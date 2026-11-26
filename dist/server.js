import express from "express";
import { error } from "node:console";
const app = express();
const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log("Couldn't start server", error);
        return;
    }
    console.log(`Server is running in localhost : ${port}`);
});
//# sourceMappingURL=server.js.map