require("dotenv").config();
const express = require("express");
// const favicon = require("serve-favicon");
const engine = require("ejs-locals");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { rateLimiter } = require("./utils/ratelimiter.js");
const { PORT, API_VERSION } = process.env;
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public/img", "favicon.ico")));

app.use(cors());

app.engine("ejs", engine);
app.set("views", "./server/views");
app.set("view engine", "ejs");

app.use(rateLimiter);
// Route
app.use([
    require("./server/routes/job_route"),
    require("./server/routes/company_route"),
    require("./server/routes/user_route"),
    require("./server/routes/profile_route"),
    require("./server/routes/application_route"),
    require("./server/routes/manage_route"),
]);

app.use("/api/" + API_VERSION, [
    require("./server/routes/api/employee_action_api"),
    require("./server/routes/api/employer_manage_api"),
    require("./server/routes/api/edit_resume_api"),
    require("./server/routes/api/auth_api"),
]);

app.get("/", (req, res) => {
    res.redirect("/jobs");
});

// page not found
app.use((req, res, next) => {
    res.status(404).render("404", { header: {} });
});

// internal error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).render("500", { header: {} });
});

app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
});

module.exports = app;
