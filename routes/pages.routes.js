import express from 'express';

const router = express.Router();

// login page
router.get('/login', (req, res)=>{
    res.render('body/login');
});

// dashboard page
router.get('/', (req, res)=>{
    res.render('body/dashboard');
});

// user manipulation pages
router.get('/add-user', (req,res)=>{
    res.render('body/add-users');
});

// view users page
router.get('/view-users', (req,res)=>{
    res.redirect('/users/view-users');
});

export default router;