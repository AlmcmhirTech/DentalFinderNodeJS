const path = require('path'); 
const { access_router } = require('./routes/accessRouter');
const { admin_router } = require('./routes/adminRoutes');
const { clinic_router } = require('./routes/clinicRoutes');
const {express, router} = require('./routes/patientRoutes');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('vendor'));
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(session({
    secret: 'pookey',
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(cors());
app.use('/access', access_router);
app.use('/patient', router);
app.use('/clinic', clinic_router);
app.use('/admin', admin_router);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;