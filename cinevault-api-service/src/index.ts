import express from 'express';
import dotenv from 'dotenv';
import userRoute from '@/routes/user.route';
import createTables from '@/database/migrate';
import movieRoute from '@/routes/movie.route';
import avaliationRoute from '@/routes/avaliation.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await createTables();

    app.use('/api/v1', userRoute, movieRoute, avaliationRoute);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();
