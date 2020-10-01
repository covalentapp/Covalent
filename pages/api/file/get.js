/*

/api/file/get

Gets a file from S3.

Requires:
- Name, which is player's ID + extension (name)

Returns:
- File link

*/

import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    maxRetries: 3
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async (req, res) => {

    let params = {Bucket: 'covalent-user-videos', Key: req.query.name};

    let error, response;
    await s3.getObject(params)
    .promise()
    .then(data => {
        response = data;
    })
    .catch(err => {
        console.log(err);
        error = err;
    }); 

    res.statusCode = 200
    await res.json({ 
        video: error ? null : response.Body
    })
}
