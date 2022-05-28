import { Sequelize } from "sequelize-typescript"
import MCategoria from "../model/Categorie/MCategoria";
import Galleria from "../model/Galleria/Galleria";
import LanguageM from "../model/Language/LanguageM";
import Post from "../model/Post/Post";
import Config from "./Config"
const Conection = new Sequelize(
    Config.Database,
    Config.username,
    Config.password,
    {
        dialect: "mysql",
        host: Config.localhost,
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    try{
        Conection.authenticate().then(()=>{
            console.log('connected')
        })
    }catch(error){
        console.log(error)
    }

const TPosts = Post.Post(Conection);
const TTCategoria = MCategoria.TCategoria(Conection);
const TTGalleria = Galleria.TGalleria(Conection);
const  TTLanguage = LanguageM.Tlanguage(Conection);
export {
    Conection,
    TTCategoria,
    TTGalleria,
    TPosts,
    TTLanguage
}