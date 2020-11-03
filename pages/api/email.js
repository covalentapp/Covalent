var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyvjhy7kLPSm8jUE" }).base(
    "appnQXxRfZPOnmFYz"
);

base("Sending List").create(
    [
        {
            fields: {
                Email: "",
            },
        },
    ],
    { typecast: true },
    function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    }
);
