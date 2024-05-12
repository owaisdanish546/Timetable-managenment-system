import express from "express";
import { fileURLToPath } from 'url';
import path from "path";

import views_router from "./src/routes/views_router.js";
import users_router from "./src/routes/users_router.js";
import teachers_router from "./src/routes/teacher_router.js";
import courses_router from "./src/routes/courses_router.js";
import venues_router from "./src/routes/venues_router.js";
import lectures_router from "./src/routes/lectures_router.js";
import validate_login_router from "./src/routes/validate_login_router.js";
import generate_timetable_router from "./src/routes/generate_timetable_router.js";

const app = express(); // Create the Express app instance
const port = 3000;


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set up middleware to serve Bootstrap CSS
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/script', express.static(path.join(__dirname, 'src/views')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/users", users_router);
app.use('/teachers', teachers_router)
app.use('/courses', courses_router)
app.use('/venues',venues_router)
app.use("/lectures",lectures_router)
app.use("/validateLogin", validate_login_router);
app.use('/view', views_router)
app.use('/generateTimetable',generate_timetable_router)

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'src/views/login/login.html'));
});
// app.get('/generateTimetable', );

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.use((req, res, next) => {
    res.status(404).json({
        error: "404",
        message: "Not Found!"
    });
});
