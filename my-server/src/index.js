
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const PORT = 3001
const cors = require('cors');
const { check, validationResult } = require('express-validator');
let app = express();
const mysql = require('mysql');
const apiErrorHandler = require('./Api-error-handler')


const { encrypt, decrypt } = require("./EncryptionHandler")


// const email = []

var path = require('path');
var Router = require('router');
var router = new Router(path.join(__dirname,'routes'));
// const { nextTick } = require('process');

var connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password:"",
        database: "cruddatabase"

});

connection.connect(function(error) {
    if(!error) {
        console.log('connected');
    } else {
        console.log(error);    
    }
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view-engine', 'ejs');
// app.use(apiErrorHandler);



validate =(body) => {
    console.log(body)
    const {firstName, lastName, password, email, confirmPassword} = body
    console.log(firstName)
    /*let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";*/

    if (!firstName) {
        return false 
    }
        
   /* if (!lastName) {
        lastName = "error";
    }  

    if (!password) {
        password = "error";
       }

    if (!email) {
        email = "error";
    }

    if (!confirmPassword) {
        confirmPassword = "error"
    }

    if (password != confirmPassword) {
        password = "error"
    }*/

    /*if (emailError || firstNameError || lastNameError || passwordError || confimrPasswordError) {
        this.setState({ emailError, firstNameError, lastNameError, confirmPasswordError, passwordError });
        return false;
    }

    return true; */
    return true;
 
}; 

//Get informtion from User Form.
app.get('/api/get', (req, res) => {
       const sqlSelect = "SELECT * FROM users";
    connection.query(sqlSelect, (err, results) => {
        if (err) {
            return err.status(500).json('something broke!')
        } else {
        return res.status(200).json(results)
        } 
    });

    // const firstName = req.query.firstName
    // const lastName = req.query.lastName
   //  const {firstName, lastName, email, password, confirmPassword } = req.query
//     console.log('working')

//     // return res.status(200).json({message: "success"})
//     return res.status(200).json(results)
});


app.get('/api/posts', (req, res) => {
    connection.query('SELECT * FROM userpost;',(err, results, fields) => {
    if (err) {
        console.error(err)
        return res.status(500).send({message:'Something broke!'})  
    } else {
            console.log(results)
            // res.send(results);
            return res.status(200).json(results)
        }

    })

});

// display post from data to front-end.
// app.get('/posts', (req, res) => {
//     connection.query("SELECT * FROM userpost;", (err, results, fields) => {
//     if (results > 0) {
//         console.log(err);
//     }
//       if(err) {
//           console.log(err);
//       } else {
//           console.log(results)
//       res.send(results);
//       }
//     });
//   });

//post info into database
app.post("/api/insert",(req, res) => {
   if  (!validate(req.body)) {
       return res.status(400).json({message: 'invalid parameter'});
   } 
   return res.status(201).json({message: 'success'});
});



app.post("/api/userPost", (req, res) => { [
        check('title').isLength({ min: 3 }),
        check('post').isLength({ min: 3 }),
        
    ]
    console.log(req.body)

    const {title, post} = req.body

    const sqlInsert = "INSERT INTO userpost (title, post) VALUES (?,?)";
    // const {email} = req.body
    connection.query(sqlInsert, [title, post], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(400).json({message:'Something Broke!'})
        } else {
            res.send('Values Inserted');
            return res.status(200).json({message:'posted inserted!'})
        }
    });
});

// display post from data to front-end.
// app.get('/posts', (req, res) => {
//     connection.query("SELECT * FROM userpost;", (err, results, fields) => {
//     if (results > 0) {
//         console.log(err);
//     }
//       if(err) {
//           console.log(err);
//       } else {
//           console.log(results)
//       res.send(results);
//       }
//     });
//   });




app.listen(PORT, () => {
    console.log(`Node server running on port: ${PORT}`);
});
