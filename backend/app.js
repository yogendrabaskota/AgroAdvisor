const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cropRoutes = require('./routes/cropRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/crops', cropRoutes);

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "I am here"
    })

})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
