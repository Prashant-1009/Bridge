require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8000;

require("./db/conn.js");
const user = require("./models/schem");
const Request = require("./models/requestschema");
const Product = require("./models/productshema");

console.log("node is running ");

const s = path.join(__dirname, "../public");
app.use('/public', express.static(s));
app.use("/bootstrap", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
hbs.registerHelper('plus', function (value, options) {
    return parseInt(value) + 1;

});
hbs.registerHelper('ifEquals', function (arg1, arg2, option) {
    return (arg1 === arg2) ? option.fn(this) : option.inverse(this);
});

const partialpath = path.join(__dirname, "../partials");
hbs.registerPartials(partialpath);



const ph = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(ph));




app.get("/", (req, res) => {
    res.render("login",{logst:''});
})

app.get("/Register", (req, res) => {
    res.render("Register",{regst:''});
})

app.get("/login", (req, res) => {
    res.render("login",{logst:''});
})

app.get("/home", (req, res) => {
    res.render("index");
})

app.get("/newreq", (req, res) => {
    res.render("newreq",{reqst:''});
})

app.get("/del", (req, res) => {
    res.render("del");
})

app.get("/newpro", (req, res) => {
    res.render("newpro",{prost:''});
})

app.get('/delac', (req, res) => {
    res.render('delac');
})





app.get("/api/yourreqdata", async (req, res) => {

    let rn = req.query.rollno;

    try {
        const reqdata = await Request.find({ rollno: rn });
        res.send(reqdata);
    }
    catch (e) {
        res.send(e);
    }

})

app.get("/api/matchedreqdata", async (req, res) => {

    let rn = req.query.rollno;
    let co = req.query.course;
    let br = req.query.branch;
    let py = req.query.passingyear;

    try {
        const mrd = await Request.find({

            $and: [

                { rollno: { $ne: rn } },
                { course: co },
                { branch: br },
                { passingyear: py }

            ]
        });
        res.send(mrd);
    }
    catch (e) {
        res.send(e);
    }

})

app.get("/api/matchedprodata", async (req, res) => {

    let rn = req.query.rollno;
    let co = req.query.course;
    let br = req.query.branch;
    let py = req.query.passingyear;

    try {
        const mrd = await Product.find({

            $and: [

                { rollno: { $ne: rn } },
                { course: co },
                { branch: br },
                { passingyear: py }

            ]
        });
        res.send(mrd);
    }
    catch (e) {
        res.send(e);
    }

})

app.get("/api/yourproductdata", async (req, res) => {

    let rn = req.query.rollno;
    try {
        const prodata = await Product.find({ rollno: rn });
        res.send(prodata);
    }
    catch (e) {
        res.send(e);
    }

})

app.get("/api/formaildata", async (req, res) => {

    let rn = req.query.rollno;
    let co = req.query.course;
    let br = req.query.branch;
    let py = req.query.passingyear;

    try {
        const maildata = await user.find({

            $and: [

                { rollno: { $ne: rn } },
                { course: co },
                { branch: br },
                { passingyear: py }

            ]
        });

        res.send(maildata);

    }
    catch (e) {
        res.send(e);
    }

})

app.post("/delmyac", async (req, res) => {

    try {
        var roll = req.body.roll;
        const proinfo = await Product.find({ rollno: roll });
        const usdel = await user.deleteOne({ rollno: roll });
        const reqde = await Request.deleteMany({ rollno: roll });

        for (var i = 0; i < proinfo.length; i++) {
            const ip = path.join(__dirname, '../uploads/' + proinfo[i].image)
            fs.unlink(ip, (err) => {
            });
        }

        const prode = await Product.deleteMany({ rollno: roll });
        res.redirect('/Register');

    }
    catch (e) {
        res.send("error!");
    }
})


app.get('*', (req, res) => {
    res.render('page404');
})

const usersec = require('./router/usersec');
const reqsec = require('./router/reqsec');
const prosec = require('./router/prosec');

app.use('/user', usersec);
app.use('/requ', reqsec);
app.use('/prod', prosec);


app.listen(port, () => {
    console.log('server is listning');
});
