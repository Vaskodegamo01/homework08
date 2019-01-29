const express = require("express");
const router = express.Router();
const nanoid = require("nanoid");

const Url =  require("../models/link");

const createRouter = ()=>{
    router.post("/", async (req, res) => {
        const data = req.body;
        let i = null;
        let UrlSort = null;
        do {
            UrlSort = nanoid(6);
            i = await Url.findOne({'UrlSort': UrlSort});
            console.log(i + " " + UrlSort);
        } while (i);
        data.UrlSort = UrlSort;
        try {
            const url = new Url(data);
            url.save()
                .then(result => res.send(result))
        } catch (e) {
            res.send(e).status(500)
        }
    });
    return router;
};

module.exports = createRouter;