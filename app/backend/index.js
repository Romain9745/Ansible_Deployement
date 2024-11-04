import { retrieveBooksByTitle, retrieveBooksByAuthor } from './libraryApi.js'
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/findBooks', (req, res) => {
  const title = req.query.title
  const author = req.query.author
  if (title) {
    retrieveBooksByTitle(title)
      .then(titles => {
        res.send(titles)
      })
      .catch(e => {
        res.send(e)
      })
  }
  if (author) {
    retrieveBooksByAuthor(author)
      .then(titles => {
        res.send(titles)
      })
      .catch(e => {
        res.send(e)
      })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
