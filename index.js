const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const workersRouter = require("./src/router/workers.router")
const recruitersRouter = require("./src/router/recruiters.router")
const portofolioRouter = require("./src/router/portofolio.router")
const experienceRouter = require("./src/router/experience.router")
const skillRouter = require("./src/router/skill.router")
const port = 3006;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(workersRouter);
app.use(recruitersRouter);
app.use(portofolioRouter);
app.use(experienceRouter);
app.use(skillRouter)

app.listen(port, () => {
  console.log(`Peworld Backend listening on port ${port}`);
});