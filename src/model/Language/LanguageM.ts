import { Sequelize,DataType } from "sequelize-typescript";
export default {
    Tlanguage: (Conection:Sequelize)=>{
        return Conection.define('',{
            id:{
                type:DataType.INTEGER,
                primaryKey:true,
                autoIncrement:true
            }
        })
    }
}