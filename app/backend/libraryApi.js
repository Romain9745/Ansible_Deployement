import http from 'http'

export function retrieveBooksByTitle (title) {
  return new Promise((resolve, reject) => {
    http
      .get('http://openlibrary.org/search.json?title=' + title, res => {
        let data = []
        let titles = []
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          try {
            for (let book of JSON.parse(data).docs) {
              titles.push(book.title_suggest)
            }
            resolve(titles)
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
      let titles = []
      res.on('data', chunk => {
        data += chunk
      })
      res
        .on('end', () => {
          try {
            for (let book of JSON.parse(data).docs) {
              titles.push(book.title_suggest)
            }
            resolve(titles)
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
