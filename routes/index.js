const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index', {projects});
});

router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/projects/:id', (req, res, next) => {
    let id = req.params.id;
    const maxId = projects.length - 1;
    id = parseFloat(id);

    if (maxId < id || isNaN(id)) {
        next();
    } else {
        const project = projects[id];
        res.render('project', { projects, project, id });
    }    
});

module.exports = router;