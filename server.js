
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import pages from './routes/pages.routes.js';
import multer from 'multer';
import setUpDatabase from './setUpDB/dbSetup.js';

const app = express();
const port = 3000;
const upload = multer();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

setUpDatabase();

// server pages routes
app.use('/', pages);

// user modification routes
app.use('/users',upload.none(), userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port: http://localhost:${port}/`);
});
