const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET="secret";
const app = express()
app.use(express.json());

const users = [];


// generateToken function generates the token of 32char long

// function generateToken() {
//   let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//   let token = "";
//   for (let i = 0; i < 32; i++) {
      // use a simple function here
//       token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }




app.post('/signup', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password
  })



  // if(users.find(u => u.username === username)){
  //   res.json({
  //     message:"you are already Signed up"
  //     })
  //   return
  // } 


  res.json({
    message:"you are Signed up"
  })

  console.log(users);

})


// signin route


app.post('/signin', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
// function to find user is already signup or not
  const foundUser = users.find(function(u){
    if(u.username == username && u.password == password){
      return true;
    }
    else{
      return false
    }
  })

  // foundUser then generateToken and assigned it to the particular username and password
  if(foundUser){
    const token = jwt.sign({
      username:username,
    },JWT_SECRET);
    // foundUser.token = token;
    res.json({
      message:"you are signed in",
      token: token
      
    })
  }
  else{
    res.status(403).send({
      message:"invalid username or password"
    })
  }


  console.log(users);
})

app.get("/me",function(req,res){
  const token =req.headers.authorization;
  const decodedInformation = jwt.verify(token,JWT_SECRET);
  const username = decodedInformation.username;
  const user = users.find(u => u.username === username);
  if(username){
    res.json({
      username:user.username,
      password:user.password
    })
  }
  else{
    res.status(403).send({
      message:"invalid token"
    })
  }

})



app.listen(3000)