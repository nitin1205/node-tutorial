const fs = require('fs');


// fs.readFile('./files/file2.txt', 'utf-8', (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    //     console.log(data.toString());
    // });
    
// console.log(`hello`);
    
// callback based fs module
    
const path = require('path');
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

const fsPromises = require('fs').promises;

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'file2.txt'), 'utf-8');
        console.log(`reading complete:- ${data}`);

        await fsPromises.writeFile(path.join(__dirname, 'files', 'Promisefile5.txt'), data);
        
        await fsPromises.appendFile(path.join(__dirname, 'files', 'Promisefile5.txt'), '\n\nthis is witten by node js promise fs module');
        
        await fsPromises.rename(path.join(__dirname, 'files', 'Promisefile5.txt'), path.join(__dirname, 'files', 'NewPromisefile5.txt') );
        
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'NewPromisefile5.txt'), 'utf-8' );
        console.log(`new data:- ${newData}`)
    } catch (err) {
        console.log(err);
    };
};

fileOps();






















// listening to uncaught error
// process.on('uncaughtException', err => {
//     console.log(`error in reading file: ${err}`);
//     process.exit(1);
// });