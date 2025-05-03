import express from "express";
import cors from 'cors';
import sequelize from "./config/db";
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes'

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', adminRoutes);

  sequelize.sync({ force:true })
.then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      })

  }).catch(err => {
    console.error('Database sync failed:', err);
  });

 
