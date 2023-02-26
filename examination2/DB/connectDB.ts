import { Sequelize } from 'sequelize'

export function getConnection() {
    const sequelize = new Sequelize({
            database: 'electronic_store_managment',
            dialect: 'postgres',
            password: 'post200', 
            username: 'student', 
            host: 'localhost', 
            port: 5432,
            logging: (sql) => {
                console.log("Query: %s", sql)
            }
        }
    )
    return sequelize;
}