const express = require('express');
const router = express.Router();

const Request = require("../models/requestschema");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/addrequest", async (req, res) => {

        try {
            const info = new Request({

                productname: req.body.productname,
                course: req.body.course,
                branch: req.body.branch,
                passingyear: req.body.passingyear,
                rollno: req.body.rollno,
                mobileno: req.body.mobileno

            })

            const added = await info.save();    
            res.render("newreq",{reqst:"Request added"})
            
        } 
         catch (error) {
            res.render("newreq",{reqst:"Invalid request"})
         }

});



router.post('/reqdel/:id', async (req, res) => {

        try {

            const idd = req.params.id;
            const del = await Request.findByIdAndRemove(idd);

            res.redirect('/del');  // res.send("chosen record deleted successffully..");
            
        }
        catch (e)
         {
            res.send("something went wrong !");
         }

})

module.exports = router;