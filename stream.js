const fs = require('fs');

const rs = fs.createReadStream('./files/file1.txt', {encoding: 'utf-8'});

const ws = fs.createWriteStream('./files/newWriteStreamfile.txt');

// listening to the rs strem
// rs.on('data', (chunk) => {
//     console.log(chunk);
//     ws.write(chunk);
// });

//piping th incoming stream
// rs.pipe(ws);


