/*

/api/file/upload

Uploads a file to S3.

Requires:
- Name, which is player's ID + extension (name)
- File (request body)

Returns:
- Upload success or failure

*/

import formidable from 'formidable';
import fs from 'fs';
import AWS from 'aws-sdk';

export const config = {
    api: {
      bodyParser: false,
  },
}

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    maxRetries: 3
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async (req, res) => {

    let error;
    
    const form = new formidable.IncomingForm();
    form.uploadDir = "./";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
        }
        fs.readFile(files?.file.path, function (err, data) {
            if (err) {
                console.error(err);
            }
            let params = {Bucket: 'covalent-user-videos', Key: req.query.name, Body: Buffer.from(data), ContentType: 'video/webm', ContentEncoding: 'base64'};
            s3.upload(params, function(err, data) {
                if (err) {
                    console.log(err);
                    error = err;
                }
            });
            fs.unlink(files?.file.path, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });

    }); 

    res.statusCode = 200
    res.json({ 
        upload: error ? false : true
    })
}
