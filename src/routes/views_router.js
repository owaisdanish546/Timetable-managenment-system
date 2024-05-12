import express from "express"
import { fileURLToPath } from 'url';
import path from "path";

const views_router = express.Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

views_router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup/signup.html'));
});

views_router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard/dashboard.html'));
});
views_router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/home.html'));
});
views_router.get('/teachers', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/teachers/teachers.html'));
});
views_router.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/courses/courses.html'));
});
views_router.get('/venues', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/venues/venues.html'));
});
views_router.get('/lectures', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/lectures/lectures.html'));
});

export default views_router;