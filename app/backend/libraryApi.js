import http from 'http'

export function retrieveBooksByTitle (title) {
  return new Promise((resolve, reject) => {
    http
      .get('http://openlibrary.org/search.json?title=' + title, res => {
        let data = []
        let books = []
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          try {
            for (let book of JSON.parse(data).docs) {
              let bookToAdd = {
                title: book.title,
                author: book.author_name[0],
                publish_date: book.first_publish_year
              }
              books.push(bookToAdd)
            }
            resolve(books)
          } catch (e) {
            reject(e)
          }
        })
      })
      .on('error', e => {
        reject(e)
      })
  })
}

export function retrieveBooksByAuthor (author) {
  return new Promise((resolve, reject) => {
    http.get('http://openlibrary.org/search.json?author=' + author, res => {
      let data = []
      let books = []
      res.on('data', chunk => {
        data += chunk
      })
      res
        .on('end', () => {
          try {
            for (let book of JSON.parse(data).docs) {
              let bookToAdd = {
                title: book.title,
                author: book.author_name[0],
                publish_date: book.first_publish_year
              }
              books.push(bookToAdd)
            }
            resolve(books)
          } catch (e) {
            reject(e)
          }
        })
        .on('error', e => {
          reject(e)
        })
    })
  })
}
