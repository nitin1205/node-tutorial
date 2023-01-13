const fs = require('fs');

// fs.mkdir('./new', (err) => {
//     if (err) throw err;
//     console.log('creating directory');
// });


if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('creating directory');
    });
};

if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('removing directory');
    });
};