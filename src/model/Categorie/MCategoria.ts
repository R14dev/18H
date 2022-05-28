import { Sequelize,DataType } from "sequelize-typescript";

export default {
    TCategoria: (Conection:Sequelize)=>{
        return Conection.define('categoria_s',{
            CateID:{
                type: DataType.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
        cateName:
        {
            type:DataType.STRING,
            allowNull:false
        },
        categoria_url:{
            type:DataType.STRING,
            allowNull:false
        }
        });
    }
}
