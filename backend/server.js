const app = require("./src/app");
const { initDatabase, dbConfig } = require("./src/config/database");

const port = 5000;

async function startServer() {
  await initDatabase();

  app.listen(port, "0.0.0.0", () => {
    console.log("=".repeat(60));
    console.log("😊 Mood Tracker Backend démarré!");
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(
      `🗄️  Base de données: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    );
    console.log("=".repeat(60));
  });
}

startServer();
