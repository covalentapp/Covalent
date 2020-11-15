import Airtable from "airtable";

export default async (req, res) => {

    var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
        process.env.AIRTABLE_BASE
    );
    
    if (req.query.email) {

        base("Sending List").create(
            [
                {
                    fields: {
                        Email: req.query.email,
                    },
                },
            ],
            { typecast: true },
            function (err, records) {
                if (err) {
                    console.error(err);
                }
                res.statusCode = 200
                res.json({ 
                    success: err ? false : true
                })
            }
            
        );
    } else {
        res.statusCode = 200
        res.json({ 
            success: false
        })
    }

    
}
