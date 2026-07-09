import 'dotenv/config';

import { app } from './src/app.js';
import { connectDb } from './src/config/db.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await connectDb();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
