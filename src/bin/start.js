import express from 'express';
import { join } from 'path';
import { authenDatabaseConnection } from '../database';
const PORT = 3000;
const ROOT_DIR = './';
const PUBLIC_PATH = join(ROOT_DIR, 'public');

const app = express();

app.set('view engine', 'pug');
app.set('views', join(ROOT_DIR, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));
authenDatabaseConnection()
app.get('/', (req, res) => {
    res.render('pages/auth/login.pug');
});
app.get('/home', (req, res) => {
    res.render('home.pug');
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});