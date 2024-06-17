// Importar mongo

const mongoose = require('mongoose');
//Listar Usuarios Creados
const getConnection = async () => {
    try {
        const URL = 'mongodb://admin:admin@ac-9h9oxmp-shard-00-00.htu6ihz.mongodb.net:27017,ac-9h9oxmp-shard-00-01.htu6ihz.mongodb.net:27017,ac-9h9oxmp-shard-00-02.htu6ihz.mongodb.net:27017/db-2024-1?ssl=true&replicaSet=atlas-homjbc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ingeweb'

        await mongoose.connect(URL);
        console.log('conexion exitosa a Mongo')
    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    getConnection
}

