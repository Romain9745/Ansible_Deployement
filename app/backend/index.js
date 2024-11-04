import { retrieveBooksByTitle, retrieveBooksByAuthor } from './libraryApi.js'
import {
  getBooksByUser,
  addBookToUser,
  deleteBook
} from './mySqlLibraryConnector.js'
import express from 'express'
const app = express()
const port = 3000

app.use(express.json())

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

app.get('/books', (req, res) => {
  const user_id = req.query.user_id
  getBooksByUser(user_id)
    .then(books => {
      res.send(books)
    })
    .catch(e => {
      res.send(e)
    })
})

app.post('/books', (req, res) => {
  const user_id = req.query.user_id
  const book = req.body
  addBookToUser(user_id, book)
    .then(() => {
      res.send('Book added')
    })
    .catch(e => {
      res.send(e)
    })
})

app.delete('/books', (req, res) => {
  const book_id = req.query.book_id
  deleteBook(book_id)
    .then(() => {
      res.send('Book deleted')
    })
    .catch(e => {
      res.send(e)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
