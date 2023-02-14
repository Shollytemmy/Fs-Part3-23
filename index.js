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

app.use(express.json())

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

   notes = notes.filter((note) => note.id !== Number(id))

  res.status(204).end()
})

const generateId = () => {

  const maxId = notes.length > 0 
  ? Math.max(...notes.map((note) => note.id)) : 0

  return maxId + 1
}


app.post("/api/notes", (req, res) => {

  // const maxId = notes.length > 0 
  // ? Math.max(...notes.map((note) => note.id)) : 0


  const body = req.body

  if(!body.content){
    return res.status(400).json({
      message: "No content",
      status: 400
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  res.json(note)

  
} )



const PORT = 5174

app.listen(PORT, () => {
    console.log(`The server listening on ${PORT}`)
})
