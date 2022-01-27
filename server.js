const express = require('express')

const cors = require('cors');

const PORT=process.env.PORT || 8000;

const app = express();
app.use(express.static("pizzadelivery/build"))
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors())

const postRoutes=require('./routes/postRoutes')

app.use('/api/',postRoutes)

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname.at,"./pizzadelivery/build","index.html"))
})

app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log(`Working on ${PORT}`)
    }
})
