const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
const connectionDB = require ("./config/connectionDB");
connectionDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin:"*",
}))
app.use('/',require("./Routes/userRoutes"))
app.use('/',require("./Routes/noteRoutes"))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});