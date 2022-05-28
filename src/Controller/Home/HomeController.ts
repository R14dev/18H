import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { TPosts, TTCategoria, TTGalleria } from "../../Database";
import Config from "../../Database/Config";
import { MeddlewarePost } from "../../middleware/PostMiddleware/PostMiddleware";

export default class HomeController {
    async Index ( req:Request,res:Response) {
       const Post = await TPosts.findAndCountAll({limit:20,offset:0,
        order:[
           ['id_am','DESC']
       ]});
        const Middleware = new MeddlewarePost();
        const Most = await TPosts.findAll({
            order: [
                [Sequelize.col('vsH'),'DESC']
            ],
            limit:5,
            offset:0
        })
        var getDataPagination = Middleware.getDataPagination(Post,1,20);
        res.render('home/index',{
            Title: Config.Title,
            Pagination: getDataPagination,
            Descrisao:'',
            Link: Config.Link,
            Posts: Post.rows,
            Most:Most
        });
    
 }
    async Tags (req:Request,res:Response) {
        const TTCategorias = await TTCategoria.findAll()
        res.render('categorie/tags',
        {
            Title:'All Tags Porn Comics Hentaicomics18',
            Descrisao:'',
            C:TTCategorias
        })
    }
     async Pagination (req:Request,res:Response){
        var pages:number = 1;
        if(req.params.p){
            pages = parseInt(req.params.p)
         }
        const Middlewarez = new MeddlewarePost();
        const {pagina,maximo} =  Middlewarez.getPagination(pages,19);
       try {
        const AllPost = await TPosts.findAndCountAll({
            limit:maximo,
            offset: pagina,
            order:[
                ['id_am','DESC']
            ]
        });
        const Data = Middlewarez.getDataPagination(AllPost,pages,pagina); 
        res.render('home/pagination',{
             Title: 'Page ' + pages + '# '+ Config.Title,
             Posts:AllPost.rows,
             Page:pages,
             Descrisao:'',
             Link: Config.Link,
             Pagination:Data['TotalPage']
         })
       } catch (error) {
           console.log(error)
       }
        
        
     }
     async Reader (req:Request,res:Response) {
         const {d,r} = req.params;
         const Middleware = new MeddlewarePost();
         const {pagina, maximo} = Middleware.getPagination(parseInt(r),1);
         const  gallerieAll = await TTGalleria.findAndCountAll({where:{idPost: d},limit:maximo,offset:pagina})
         const Data = Middleware.getDataPagination(gallerieAll,r,pagina);
    
         if(gallerieAll.rows.length == 0){
            res.redirect(`/d/${d}`)
         }
         res.render('article/read',{
            Title: 'Read '+ r +'# of '+ Data['totalItems']+ ' Pages of gallery',
            gallerieImage: Data['Desvendados'],
            Id:d,
            Descrisao:'',
            Link: Config.Link,
            Page:r,
            Pagination:Data['totalItems']
         })

     }

    static  notFound (req:Request,res:Response) {
         res.status
         (404).render('found/404.ejs',{Title:'404 | Page Not Found',Descrisao:"404 | Page Not Found"})
     }
     async Detalhes (req:Request,res:Response){
        const {d} = req.params;
        const PostDetalhes = await TPosts.findByPk(d);
        const gallerie = await TTGalleria.findAndCountAll({where:{
            idPost: d
        }});
        /**
         * Verificar se ha resultados
         */
        if(!PostDetalhes){
            res.status(404).render('found/404',{
                Title: ' Page Not Found !',
                Descrisao: 'Page Not Found !'
            });
            return;
        }
        /**
         * Contador de visitas
         */
        MeddlewarePost.ViewCount(parseInt(d))
        /** 
         * Relacionados 
         * 
        */
        const RelatedPost = await TPosts.findAndCountAll({where:{
            id_am:{ [Op.not]: d},
            tags:{
                [Op.like]: '%'+PostDetalhes.getDataValue('tags')+'%'
            }
        },limit:5,offset:0,order:[
            ['id_am','DESC']
        ]})
        
       
        res.set('Content-Type','text/html; charset=UTF-8');
        
        res.render('article/index',{
            oldTitle: PostDetalhes.getDataValue('post_name'),
            Title: 'Hentai Comics ' + 'Book #Id ' +d,
            ImagePost: PostDetalhes.getDataValue('foto_capa'),
            Id:d,
            Descrisao: PostDetalhes.getDataValue('descrisao'),
            Tags: MeddlewarePost.helper(PostDetalhes.getDataValue('tags')),
            language: PostDetalhes.getDataValue('ideoma'),
            languageurlimg: MeddlewarePost.getLingua(PostDetalhes.getDataValue('ideoma')),
            Link: Config.Link,
            vsH: MeddlewarePost.rankView(parseInt(PostDetalhes.getDataValue('vsH'))),
            Gallerie: gallerie.rows,
            RelatedPost: RelatedPost.rows
        })
  }



}