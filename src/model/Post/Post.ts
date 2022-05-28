import { Sequelize,DataType } from "sequelize-typescript"
export  default {
    Post: (Conection:Sequelize)=>{
        return Conection.define('_posts_ams',{
            id_am:{
                type:DataType.INTEGER,
                primaryKey:true,
                autoIncrement: true
            },
            post_name:{
                type:DataType.STRING
            },
            url_post_am:{
                type:DataType.STRING
            },
            tags:{
                type:DataType.STRING
            },
            cateP:{
                type:DataType.STRING
            },
            descrisao:{
                type:DataType.STRING
            },
            foto_capa:{
                type:DataType.STRING
            },
            datas_post:{
                type: DataType.DATE
            },
            vsH:{
                type:DataType.INTEGER,
                defaultValue: 1
            },
            ideoma:{
                type:DataType.STRING
            }
        });
    }
}