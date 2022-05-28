import { Sequelize, DataType } from "sequelize-typescript";

export default {
    TGalleria: (Conection:Sequelize)=>{
        return Conection.define('galleria',{
            id:{type: DataType.INTEGER,primaryKey: true,autoIncrement: true},
            fotos_gale: {type: DataType.STRING,allowNull:false},
            idPost:{type: DataType.INTEGER}
        });
    }
}