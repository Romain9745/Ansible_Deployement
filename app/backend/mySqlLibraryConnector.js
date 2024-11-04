import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admintest',
  database: 'library_manager',
  waitForConnections: true
})

export function getBooksByUser (id_user) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM Books WHERE id_user = ?',
        [id_user]
      )
      connection.release()
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}

export function addBookToUser (id_user, book) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await pool.getConnection()
      await connection.query(
        'INSERT INTO Books (id_user, title, author, date) VALUES (?, ?, ?, ?)',
        [id_user, book.title, book.author, book.publish_date]
      )
      connection.release()
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

export function deleteBook (id_book) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await pool.getConnection()
      await connection.query('DELETE FROM Books WHERE id = ?', [id_book])
      connection.release()
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
