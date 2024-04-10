// import mysql from 'mysql2'

if (process.env.NODE_ENV === 'development') process.loadEnvFile()

const config = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS
}

console.log(config)

export class MovieModel {
  static async getAll ({ genre }) {
  }

  static async getById ({ id }) {
  }

  static async create ({ input }) {
  }

  static async delete ({ id }) {
  }

  static async update ({ id, input }) {

  }
}
