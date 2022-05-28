import { Request, Response } from "express";
import { Op } from "sequelize";
import { TPosts, TTCategoria } from "../../Database";
import Config from "../../Database/Config";
import { CategorieMiddleware } from "../../middleware/CategoriesMiddleware/CtMiddleware";
import { MeddlewarePost } from "../../middleware/PostMiddleware/PostMiddleware";

const MeddlewarePosts = new MeddlewarePost();
const CategorieM = new CategorieMiddleware();



export default class CategorieController {

    async index (req:Request,res:Response){
        var pages:number = 1;
        var categorie:string
        if(req.params.pc){
            pages = parseInt(req.params.pc);
        }
        const {c} = req.params;
        const {pagina,maximo} =  MeddlewarePosts.getPagination(pages,19);

       
        const Categorie_check = await TTCategoria.findAndCountAll({where:{
            categoria_url: c
        }})

        for (const key in Categorie_check.rows) {
            categorie = Categorie_check.rows[key]['cateName']
        }

        
        const AllPost = await TPosts.findAndCountAll({where:{
            tags:{
                [Op.like]: '%'+c+'%'
            }
        },limit:maximo,offset:pagina,order:[
            ['id_am','DESC']
        ]})
        const LanguageAll = await TPosts.findAndCountAll({where:{
            tags:{
                [Op.like]: '%'+c+'%'
            }}})
        var Data = MeddlewarePosts.getDataPagination(LanguageAll,1,19)
        var Numbers = pages == null  ? 1 : pages;

        console.log(AllPost)
        
        res.render('categorie/index',{
            Title: CategorieM.Help(pages,Numbers)+categorie+' & Porn Comics | Hentaicomics18',
            Posts: AllPost.rows,
            Page: Numbers,
            LanguageName: c,
            Descrisao: '',
            Link: Config.Link,
            Pagination:Data['TotalPage']  
        })
    
    }

   static notFound (request:Request,response:Response){
    response.status(404).render('found/404.ejs',{Title:'404 | Page Not Found',Descrisao:"404 | Page Not Found"})
    }

}