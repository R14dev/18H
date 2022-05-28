import { Request, Response } from "express";
import { TPosts, TTCategoria } from "../../Database";
import { MeddlewarePost } from "../../middleware/PostMiddleware/PostMiddleware";
import Config from "../../Database/Config";
import { CategorieMiddleware } from "../../middleware/CategoriesMiddleware/CtMiddleware";
const MeddlewarePosts = new MeddlewarePost();
const CategorieMiddlewares = new CategorieMiddleware();
export default class LanguageController {
    async index (req:Request,res:Response) {
        var pages:number = 1;
        if(req.params.page){
            pages = parseInt(req.params.page);
        }
        const {l} = req.params;
        const {pagina,maximo} =  MeddlewarePosts.getPagination(pages,19);
        const Language = await TPosts.findAndCountAll(
            {
                where:
                {
                    ideoma: `${l}`
                },
            limit:maximo,
            offset:pagina,
            order:[
                ['id_am','DESC']
            ]})

          //  console.log(Language.rows)
        const LanguageAll = await TPosts.findAndCountAll({where:{ideoma: l}})
        var Data = MeddlewarePosts.getDataPagination(LanguageAll,1,19)
        var Numbers = pages == null  ? 1 : pages;
        
        res.render('language/index',{
            Title: CategorieMiddlewares.Help(pages,Numbers)+' Porn Comics in '+ l + ' | Hentai Comics Porn',
            Posts: Language.rows,
            Page: Numbers,
            Descrisao:'',
            Link: Config.Link,
            LanguageName: l,
            Pagination:Data['TotalPage']  
        })
    }
}