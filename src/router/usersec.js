require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const user = require("../models/schem");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/Register", async (req, res) => {

    try {

                const info = new user({

                    rollno: req.body.rollno,
                    clgname: req.body.clgname,
                    course: req.body.course,
                    branch: req.body.branch,
                    passingyear: req.body.passingyear,
                    mobileno: req.body.mobileno,
                    email: req.body.email,
                    password: req.body.password
                })

                const added = await info.save();

                res.redirect('/login');

    }
    catch (error) {

        res.render("Register",{regst:"Invalid registration"})
    }

});


router.post("/login", async (req, res) => {

    try {

        const interedrollno = req.body.rollno;
        const interedpassword = req.body.password;
        const details = await user.findOne({ rollno: interedrollno });
        const mobile = details.mobileno;

            if (details.password === interedpassword) 
            {

                        const reqdata = await axios.get('/api/yourreqdata', {
                            params: {
                                rollno: interedrollno
                            }
                        })
                  
                        const matchedreq = await axios.get('/api/matchedreqdata', {
                            params: {
                                rollno: interedrollno,
                                course: details.course,
                                branch: details.branch,
                                passingyear: details.passingyear

                            }
                        })


                        const prodata = await axios.get('/api/yourproductdata', {
                            params: {
                                rollno: interedrollno
                            }
                        })


                        const matchedpro = await axios.get('/api/matchedprodata', {
                            params: {
                                rollno: interedrollno,
                                course: details.course,
                                branch: details.branch,
                                passingyear: details.passingyear

                            }
                        })


                        res.status(201).render("index", {
                            myinfo: details, rno: interedrollno, mno: mobile, yreqd: reqdata.data, mreqd: matchedreq.data, yproductd: prodata.data, mpd: matchedpro.data
                        });


                    
            }

            else 
            {
                res.render("login",{logst:"Invalid login"})
            }
            

    }
     catch (error)
      {
        res.render("login",{logst:"Invalid login"})
      }


});



module.exports = router;
