import  Express  from "express";
import { Conection } from "./src/Database";
import { CategoriesRouter } from "./src/router/categories/Categorie";
import { RouterPost } from "./src/router/Post/PostRouter";
import cors from 'cors'
const path = require ('path');
const App = Express();
Conection.sync();
App.set('views',path.join(__dirname,'src/views'));
App.set('view engine','ejs');
App.use(Express.static('public'))
App.use(cors())
App.use('/',RouterPost);
App.use('/',CategoriesRouter)
App.listen(5000,()=>{ console.log('running server...')});