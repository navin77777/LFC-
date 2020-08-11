const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express()

//app.use(express.static('/Public'));
console.log(__dirname);
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const phoneNumber = req.body.phone;
    const donateItem = req.body.donate;
    const address = req.body.address;
    const email = req.body.email;
 
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                    MMERGE5: address,
                    PHONE: phoneNumber,
                    MMERGE6: donateItem,
                    
                }
            }
        ]
    };
 
    var jsonData = JSON.stringify(data);
 
    const url = "https://us17.api.mailchimp.com/3.0/lists/4365a9dff3"
 
    const options = {
        method: "POST",
        auth: "navin1:eddb9c2e812335f38add10040f340521-us17"
    }
 
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
            //res.send("sucessful");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
 
    request.write(jsonData);
    request.end();
});

app.post("/failure" , function(req , res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port:3000.");
});
//API key
//eddb9c2e812335f38add10040f340521-us17

//audiance id/list id
//4365a9dff3