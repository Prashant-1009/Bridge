require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const nodemailer = require('nodemailer');

const Product = require("../models/productshema");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'bridgesrmgpc@outlook.com',
        pass: "19012201000@"
    }
});

const phh = path.join(__dirname, "../../uploads");

var imstore = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, phh);
    },
    filename: function (req, file, cb) {

        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },

});

var upload = multer({
    storage: imstore,
}).single('image');



router.post("/addproduct", upload, async (req, res) => {

    try {
        const newpro = new Product({

            product: req.body.product,
            course: req.body.course,
            branch: req.body.branch,
            passingyear: req.body.passingyear,
            rollno: req.body.rollno,
            mobileno: req.body.mobileno,
            price: req.body.price,
            image: req.file.filename


        })

        const added = await newpro.save();


                                            const usersdata=await axios.get('http://localhost:8000/api/formaildata',{
                                                params:{
                                                        rollno:req.body.rollno,
                                                        course:req.body.course,
                                                        branch:req.body.branch,
                                                        passingyear:req.body.passingyear

                                                    }
                                                })

                                            const users=usersdata.data;
                                            var listofemails=[];

                                            for(var i=0;i<users.length;i++)
                                                {
                                                        listofemails.push((users[i].email));
                                                }


                                            if(listofemails.length>0)
                                            {
                                                    try{

                                                            var mailOptions = {
                                                            from:'Bridge<bridgesrmgpc@outlook.com>',
                                                            bcc: listofemails,
                                                            subject: 'Product Matched',
                                                            text:  'Hi ! There is new recummendation for you at Bridge please check it out.'
                                                            };


                                                            await transporter.sendMail(mailOptions);

                                                        }
                                                        catch(e)
                                                        {
                                                            console.log(e);
                                                            res.redirect('back');
                                                            // res.send("oops!");
                                                        }
                                            }


        
        // // Email code ends here              

        res.render("newpro",{prost:"Product added"})

    }
    catch (error) {
        res.render("newpro",{prost:"Invalid product"})
    }

});


router.post('/prodel/:id', async (req, res) => {

        try {

            const idd = req.params.id;
            const del = await Product.findByIdAndRemove(idd);   // console.log(del.image);

            const p = path.join(__dirname, '../../uploads/' + del.image)
            fs.unlink(p, (err) => {
                // if(err) throw err;
                // console.log(err);
            });

            res.redirect('/del');  // res.send("chosen record deleted successffully..");
            
        }
        catch (e)
         {
            res.send("something went wrong !");
            //res.send(e);
        }

});

module.exports = router;