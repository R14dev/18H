import { Request,response,Response } from "express";
class CategorieMiddleware {
    Verify(Req:Request,Res:Response,next:any){
        const {d} = Req.params;
        if(d.length != 0){next();}
        return Res.status(404).send();
    }
    verifyP (Req:Request,Res:Response,next:any){
      var p :any;
      var il:any;

      if(Req.params.page){
        p = parseInt(Req.params.page);
        il = Req.params.l;
        if( p.toString() === 'NaN' || 
        !/^[a-zA-Z]+$/.test(il) || p == 0){
          return Res.status(404).render('found/404',{
            Title: '404 | Page Not Found',
            Descrisao: ''
          });
        }else{
          next();
        }
      
      }else if(Req.params.l){
        p = Req.params.l;
        if(!/^[a-zA-Z]+$/.test(p)){
          return Res.status(404).render('found/404',{
            Title: '404 | Page Not Found',
            Descrisao:''
          });
        }else{
          next();
        }
      }else if(Req.params.pc){
        p = parseInt(Req.params.pc);
        il = Req.params.c;
        if( p.toString() === 'NaN' || !/^[a-zA-Z]+$/.test(il) || p == 0){
          return Res.status(404).render('found/404',{
            Title: '404 | Page Not Found',
            Descrisao:''
          });
        }else{
          next();
        }
      } else if(Req.params.c){
        p = Req.params.c;
        if(!/^[a-zA-Z\-]+$/.test(p)){
          return Res.status(404).render('found/404',{
            Title: '404 | Page Not Found',
            Descrisao: ''
          });
        }else{
          next();
        }
      }else{
        return Res.status(404).render('found/404',{
          Title: '404 | Page Not Found',
          Descrisao: ''
        })
      }
      
    }

    Help(pages:number,Numbers:number):string{
      return  (pages >= 2 ) ? 'Page '+Numbers+'# ' : '';
    }
    
}


export  {CategorieMiddleware}