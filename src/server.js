require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
// const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require ("./configs/upload");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  // origin: ["http://localhost:5173", "http://127.0.0.1:5173/", "https://stately-florentine-a13244.netlify.app"],
  origin: ["*", "https://visionary-maamoul-16218e.netlify.app", "http://localhost:5173"],
  credentials: true
}));

app.use(routes);
// migrationsRun();
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) =>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

const PORT = process.env.PORT ||  9999;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))

