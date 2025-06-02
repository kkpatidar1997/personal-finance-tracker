
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({ origin: 'https://personal-finance-tracker-nu-dusky.vercel.app', credentials: true }));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/transactions", transactionRoutes);



app.get('/', (req, res) => {
  res.send('Personal Finance Tracker API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
