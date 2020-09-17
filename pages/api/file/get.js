/*

/api/file/get

Gets a file from S3.

Requires:
- Name, which is player's ID + extension (name)

Returns:
- File link

*/

import Amplify, { Storage } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

export default async (req, res) => {
    let data;
    try {
        data = await Storage.get(req.query.name);
    } catch (err) {
        console.log("Unable to get file: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        file: data ? data : null
    })
}