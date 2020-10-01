/*

/api/get/previous

Gets a list of previous connections.

Requires:
- Previous ID (previousId)

Returns:
- Previous connections

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { getPrevious } from "../../../src/graphql/queries";

export default async (req, res) => {
    let data;

    try { 
        data = await API.graphql(graphqlOperation(
            getPrevious,
            {
                id: req.query.previousId
            }
        ));
    } catch (err) {
        console.log("Unable to create new previous connection: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        previous: data ? data : null
    })
}