"use strict";

/* Imports */
const snoowrap = require('snoowrap');
const fs = require('fs');


class RedditContactor {

    constructor(EP_CREDENTIALS_PATH){
        this.establish_reddit_connection(EP_CREDENTIALS_PATH);
    }

    /* Setup a connection to reddit */
    establish_reddit_connection(EP_CREDENTIALS_PATH) {
        try{
            // Load credentials from file
            var credentials = JSON.parse(fs.readFileSync(EP_CREDENTIALS_PATH));
        } 
        catch(err){
            console.log("ERROR: Failed to read ep_credential.json file - " + err);
        }

        try{
            // Make a connection to reddit using snoowrap package
            this.reddit = new snoowrap({
                clientId: credentials.clientId,
                userAgent: credentials.userAgent,
                clientSecret: "",
                refreshToken: credentials.refreshToken // Genrate new refresh token here: https://not-an-aardvark.github.io/reddit-oauth-helper/
            });
            this.reddit.getHot().map(post => post.title).then(console.log);
        }
        catch(err){
            console.log("ERROR: Failed to establish a connection with reddit - " + err);
        }
    }
}

/* Exports */
module.exports = RedditContactor;