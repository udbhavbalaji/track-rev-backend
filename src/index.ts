import "tsconfig-paths/register";
import express from "express";
import cors from "cors";
import ergastRoutes from "@routes/ergastRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use("/api", ergastRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
