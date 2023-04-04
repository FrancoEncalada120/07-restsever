const mongoose = require("mongoose")


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGOGB_CNN);

        console.log('Se conecto a la BD');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion');
    }

}


module.exports = { dbConnection }