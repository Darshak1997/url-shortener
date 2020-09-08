const express = require("express"),
      mongoose = require("mongoose"),
      ShortUrl = require("./models/shortUrl"),
      validUrl = require('valid-url'),
      cache    = require('./services/cache'),
      bodyParser = require('body-parser');
      app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology:true
});
let currentUrl;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/shortUrls", async (req, res) => {
    const {post} = req.body;
    currentUrl = req.body.post
    const queryOptions = { currentUrl };
    if(validUrl.isUri(req.body.post)){
        let urlData;
        try{
            // Find the item in cache
            urlData = await cache.getFromCache('currentUrl', JSON.stringify(queryOptions));
            if (urlData){
                urlData = urlData.short
            }
            if(!urlData){
                // Find the item in DB
                urlData = await ShortUrl.findOne({ full: req.body.post});
            }
            if (urlData){
            } else{
                // Add item to DB
                await ShortUrl.create({ full: req.body.post })
                urlData = await ShortUrl.findOne({ full: currentUrl})
                // Add item to cache
                cache.addToCache('currentUrl', JSON.stringify(queryOptions), { short: urlData });
            }
            res.send({current: urlData})
        } 
        catch(err){
            res.status(401).json("Invalid User ID")
        }
    } else{
        return res.status(401).json("Invalid Full URL")
    }
});

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    // If the Short Url is not valid
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.save()
    console.log("Redirection: ", shortUrl.full)
    res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);