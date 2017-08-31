// Loads environment settings from '.env' into process.env
// This is for local development
require('dotenv').config();

const fs = require('fs');
const async = require('async');
const path = require('path');
const S3 = require('aws-sdk/clients/s3');

// Create an S3 client
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});
const directoryPath = path.join(__dirname, './json-data');
const files = fs.readdirSync(directoryPath);

console.log('files', files); // eslint-disable-line no-console

function getContentTypeByFile(fileName) {
    let rc = 'application/octet-stream';
    const fileNameLowerCase = fileName.toLowerCase();

    if (fileNameLowerCase.indexOf('.html') >= 0) rc = 'text/html';
    else if (fileNameLowerCase.indexOf('.css') >= 0) rc = 'text/css';
    else if (fileNameLowerCase.indexOf('.json') >= 0) rc = 'application/json';
    else if (fileNameLowerCase.indexOf('.js') >= 0) rc = 'application/x-javascript';
    else if (fileNameLowerCase.indexOf('.png') >= 0) rc = 'image/png';
    else if (fileNameLowerCase.indexOf('.jpg') >= 0) rc = 'image/jpg';

    return rc;
}

function uploadFiles() {
    async.map(files, (file, cb) => {
        console.log('Uploading File:', file); // eslint-disable-line no-console

        const filePath = path.join(directoryPath, file);

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: file,
            Body: fs.readFileSync(filePath),
            ContentType: getContentTypeByFile(file),
            ACL: 'public-read'
        };

        s3.putObject(params, cb);
    }, (err, results) => {
        if (err) {
            console.error('---- Errors Uploading ----');
            console.error(err);
        }
        console.log('---- Object Upload Results ----');
        console.log(results);
    });
}

uploadFiles();
