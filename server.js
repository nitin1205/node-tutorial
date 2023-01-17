// const fs = require('fs');


// fs.readFile('./files/file2.txt', 'utf-8', (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    //     console.log(data.toString());
    // });
    
// console.log(`hello`);
    
// callback based fs module
    
// const path = require('path');
// fs.readFile(path.join(__dirname, 'files', 'file2.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// fs.writeFile(path.join(__dirname, 'files', 'file3.txt'), 'this is written by node js', (err) => {
//     if (err) throw err;
//     console.log('writing complete');

//     fs.appendFile(path.join(__dirname, 'files', 'file3.txt'), '\n\nthis is written by node js using append file method in fs module', (err) => {
//         if (err) throw err;
//         console.log('append complete1');

//         fs.appendFile(path.join(__dirname, 'files', 'file3.txt'), path.join(__dirname, 'files', 'newfile3.txt'), (err) => {
//             if (err) throw err;
//             console.log('rename complete');
//         });
//     });
// });

// fs.appendFile(path.join(__dirname, 'files', 'file4.txt'), '\n\nthis is written by node js using append file method in fs module', (err) => {
//     if (err) throw err;
//     console.log('append complete2');
// });


// promise based fs-module

// const fsPromises = require('fs').promises;

// const fileOps = async () => {
//     try {
//         const data = await fsPromises.readFile(path.join(__dirname, 'files', 'file2.txt'), 'utf-8');
//         console.log(`reading complete:- ${data}`);

//         await fsPromises.writeFile(path.join(__dirname, 'files', 'Promisefile5.txt'), data);
        
//         await fsPromises.appendFile(path.join(__dirname, 'files', 'Promisefile5.txt'), '\n\nthis is witten by node js promise fs module');
        
//         await fsPromises.rename(path.join(__dirname, 'files', 'Promisefile5.txt'), path.join(__dirname, 'files', 'NewPromisefile5.txt') );
        
//         const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'NewPromisefile5.txt'), 'utf-8' );
//         console.log(`new data:- ${newData}`)
//     } catch (err) {
//         console.log(err);
//     };
// };

// fileOps();



// creating web server

// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;


// const PORT = process.env.PORT || 3000;

// const serveFile = async (filePath, contentType, response) => {
//     try {
//         const rawData = await fsPromises.readFile(
//             filePath, 
//             !contentType.includes('image') ? 'utf8' : ''
//         );
//         const data = contentType === 'application/json'
//             ? JSON.parse(rawData) : rawData;
//         response.writeHead(
//             filePath.includes('404.html') ? 404 : 200,
//             { 'content-Type': contentType }
//         );
//         response.end(
//             contentType === 'application/json' ? JSON.stringify(data) : data
//         );
//     } catch (err) {
//         console.log(err);
//         response.statusCode = 500;
//         response.end();
//     }
// }; 


// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);

//     const extension = path.extname(req.url);

//     let contentType;

//     switch (extension) {
//         case '.css':
//             contentType = 'text/css';
//             break;
//         case '.js':
//             contentType = 'text/javascript';
//             break;
//         case '.json':
//             contentType = 'application/json';
//             break;
//         case '.jpg':
//             contentType = 'image/jpeg';
//             break;
//         case '.png':
//             contentType = 'image/png';
//             break;
//         case '.txt':
//             contentType = 'text/plain';
//             break;
//         default:
//             contentType = 'text/html';
//     }

//     let filePath =
//         contentType === 'text/html' && req.url === '/'
//             ? path.join(__dirname, 'views', 'index.html')
//             : contentType === 'text/html' && req.url.slice(-1) === '/'
//                 ? path.join(__dirname, 'views', req.url, 'index.html')
//                 : contentType === 'text/html'
//                     ? path.join(__dirname, 'views', req.url)
//                     : path.join(__dirname, req.url);
    
//     // makes .html extension not require in the brower
//     if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

//     const fileExists = fs.existsSync(filePath);

//     if(fileExists) {
//         serveFile(filePath, contentType, res);
//     } else{
//         console.log(path.parse(filePath));
//         switch (path,parse(filePath).base ) {
//             case 'old-page.html':
//                 res.writeHead(301, { 'Location': '/new-page.html' });
//                 res.end();
//                 break;
//             case 'www-page.html':
//                 res.writeHead(301, { 'Location': '/' });
//                 res.end();
//                 break;
//             default: 
//                 serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
//         };
//     };
// });


// server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// serveFile(filePath, contentType, res);

// listening to uncaught error
// process.on('uncaughtException', err => {
//     console.log(`error in reading file: ${err}`);
//     process.exit(1);
// });

// creating web server using express
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const connectDB = require('./config/dbConn');

// connect top DB
mongoose.set('strictQuery', false);
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// cutom middleware logger
app.use(logger);

// handle options credentials check - before CORS
// and fetch cookies credential requirement
app.use(credentials)

// cors middleware
app.use(cors(corsOptions));

// in-built express middlewares

// middleware for content-type: applecation/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// middleware to serev static file
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// imported routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/subdir', require('./routes/subdir'));


// route handlers
// app.get('/', (req, res) => {
//     res.send('index');
// });

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// app.get('/*', (req, res) => {
//     res.status(400).send('404 not found')
// });


app.all('*', (req, res) => {
    res.status(400)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not found' });
    } else {
        res.type('txt').send('404 not found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`listening to port:- ${PORT}`));
});







