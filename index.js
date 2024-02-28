
const express = require('express')
const app = express();
const {v4:uuidv4} = require("uuid")
const cors = require('cors')

const PORT = 8888;

app.use(cors())

app.use(express.json())

// const vinyl = [
//   { id: '1',
//     title: 'Poker Face',
//     artist: 'Lady Gaga',
//     album: 'Fame Monster'},
//   { id: '2',
//     title: 'Ohio (Come back to Texas)',
//     artist: 'Bowling for Soup',
//     artist: 'A Hangover You Dont Deserve'},
//   { id: '3',
//     title: '22',
//     artist: 'Taylor Swift',
//     album: 'Red'}
// ];

const users = [
  { id: '1',
    email: 'example@gmail.com',
    password: 'Lady Gaga',
  },
  { id: '2',
    email: 'person@yahoo.com',
    password: 'Bowling for Soup',
  }
];

app.get("/", (req,res) => {
  res.json({
    message: "welcome to the jungle"
  })
})

app.get("/users", (req,res)=>{
  res.json({
  users
  })
});

app.get("/users/:id", (req,res)=>{
  const RecordId = req.params.id;
  const foundItem = users.find((record) => {
    return record.id == RecordId
  })

  console.log(foundItem)

  res.json(foundItem)
});

app.post('/users', (req,res)=>{

  const newRecord = {
    ...req.body,
    id: uuidv4(),
  }


  users.push(newRecord);

  res.json({
    users
  })
})

app.put('/users/:id', (req,res) => {
  const {id} = req.params
  const foundItem = users.find((record) =>{
    return record.id === id
  })

  const foundIndex = users.findIndex((record) =>{
    return record.id === id
  })

  const updatedRecord = {
    ... foundItem,
    ... req.body
  }

  console.log({foundItem})
  console.log({updatedRecord})

  users.splice(foundIndex, 1, updatedRecord)

  console.log(users);

  res.json({
    users
  })

})

app.delete('/users/:id', (req,res) => {
  const {id} = req.paramsusers
  const foundIndex = users.findIndex((record) =>{
    return record.id === id
  })

  users.splice(foundIndex, 1);

  console.log(vinyl);

  res.json({
    users
  });

});

app.listen(PORT,function (){
  console.log( `The server is listening on PORT ${PORT}`)
});