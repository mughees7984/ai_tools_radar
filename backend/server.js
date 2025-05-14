const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000


//Middleware
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const toolRoutes = require('./routes/toolRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
app.use('/api', toolRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/admin', adminRoutes);


app.use("/uploads", express.static("uploads"));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB connection failed:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});