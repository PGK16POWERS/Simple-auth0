const express = require("express");
const path = require("path");
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
require("dotenv").config();

// Server configurations
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
    secret:process.env.SECRET,
};

app.use(auth(config));

// These folders contain all the neccessary frontend files
app.use(express.static("public"));
app.use(express.static("jsfiles"));

app.get("/private", requiresAuth(),(req,res) => {
    res.status(200).sendFile(path.join(__dirname,'public','private.html'));
});

/* Redirects users to the landing page, if you like 
you can redirect users to a dedicated page when they logout */
app.get("/logout",(req,res)=> {
    res.logout();
    res.redirect("/");
})


// Start the server
app.listen(3400, ()=> {
    console.log("Danko Supreme!!!");
});