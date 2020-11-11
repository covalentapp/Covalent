import Airtable from "airtable";

export default async (req, res) => {

    var base = new Airtable({ apiKey: "keyvjhy7kLPSm8jUE" }).base(
        "appnQXxRfZPOnmFYz"
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
                    return;
                }
            }
        );
    }

    res.statusCode = 200
    res.json({ 
        success: req.query.email ? true : false
    })
}
