const { json } = require('express');
const express = require('express');
const app = express();


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get("/", (request, response) => {
    response.end("<h1>Hello World and welcome to the server-side Development</h1>")
})

app.get("/api/notes", (request, response) => {

    response.json(notes)

})

app.get("/api/notes/:id", (req, res) => {

  let {id} = req.params

  const note = notes.find((note) => note.id === Number(id))

  if(note){
    res.json(note)
  } else{
    res.status(404).
      json({
        status: 404,
        message: "Not Found"
      })
    
  }
})


app.delete("/api/notes/:id", (req, res) => {

  let {id} = req.params

  const note = notes.filter((note) => note.id !== Number(id))

  res.status(204).end()
})

const PORT = 5174

app.listen(PORT, () => {
    console.log(`The server listening on ${PORT}`)
})
