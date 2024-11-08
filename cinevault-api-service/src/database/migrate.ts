import { executeQuery } from './database';

const createTables = async () => {
  try {
    const createTableQueries = `
      CREATE TABLE IF NOT EXISTS "user" (
          "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          "photo" VARCHAR(255) NOT NULL,
          "name" VARCHAR(255) NOT NULL,
          "email" VARCHAR(255) NOT NULL,
          "password" VARCHAR(255) NOT NULL,
          "salt" VARCHAR(255) NOT NULL,
          "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "movie" (
          "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          "banner" VARCHAR(255) NOT NULL,
          "photo" VARCHAR(255) NOT NULL,
          "title" VARCHAR(255) NOT NULL UNIQUE,
          "gender" VARCHAR(50) NOT NULL,
          "year_release" SMALLINT NOT NULL,
          "duration" SMALLINT NOT NULL,
          "description" VARCHAR(500) NOT NULL,
          "registration_user" BIGINT NOT NULL,
          "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "movie_registration_user_foreign" FOREIGN KEY("registration_user") REFERENCES "user"("id")
      );

      CREATE TABLE IF NOT EXISTS "avaliation" (
          "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          "id_user" BIGINT NOT NULL,
          "id_movie" BIGINT NOT NULL,
          "rating" DECIMAL(8, 2) NOT NULL,
          "comment" VARCHAR(255),
          "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "avaliation_id_movie_foreign" FOREIGN KEY("id_movie") REFERENCES "movie"("id"),
          CONSTRAINT "avaliation_id_user_foreign" FOREIGN KEY("id_user") REFERENCES "user"("id")
      );
    `;

    await executeQuery(createTableQueries);

    const createTriggers = `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_user'
        ) THEN
          CREATE TRIGGER set_updated_at_user
          BEFORE UPDATE ON "user"
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_movie'
        ) THEN
          CREATE TRIGGER set_updated_at_movie
          BEFORE UPDATE ON "movie"
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_avaliation'
        ) THEN
          CREATE TRIGGER set_updated_at_avaliation
          BEFORE UPDATE ON "avaliation"
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
        END IF;
      END $$;
    `;

    const createFunction = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW.updated_at = CURRENT_TIMESTAMP;
         RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;

    await executeQuery(createFunction);
    await executeQuery(createTriggers);
  } catch (error: any) {
    console.error('Erro ao realizar a migração:', error.message);
  }
};

export default createTables;
