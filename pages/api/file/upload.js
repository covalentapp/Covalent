/*

/api/file/upload

Uploads a file to S3.

Requires:
- Name, which is player's ID + extension (name)
- File (file)

Returns:
- Upload success or failure

*/

import Amplify, { Storage } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

export default async (req, res) => {
    try {
        data = await Storage.put(req.query.name, req.query.file);
    } catch (err) {
        console.log("Unable to upload file: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        upload: err ? false : true
    })
}