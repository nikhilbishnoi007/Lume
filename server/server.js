import app from "./src/app.js";
import config from "./src/config/config.js";
import conectDb from "./src/config/db.js";

const port=config.port
conectDb()

app.listen(port,()=>{
    console.log(`server is running at port:${port}`)
})
