import { Request,response,Response } from "express";
import { TPosts } from "../../Database";


class MeddlewarePost {
    Verify(Req:Request,Res:Response,next:any){
        const {d} = Req.params;
        if(d.length != 0){next();}
        return Res.status(404).send();
    }
    verifyP (Req:Request,Res:Response,next:any){
      var p :any;
      var il:any;
      if(Req.params.p){
        p = parseInt(Req.params.p);
        if( p.toString() === 'NaN' || p ==0){
          return Res.status(404).render('found/404',{
            Title: '404 | Page Not Found',
            Descrisao: ''
          });
        }else{
          next();
        }
      }else if(Req.params.r){
        p = parseInt(Req.params.d);
        il = parseInt(Req.params.r);
        if( p.toString() === 'NaN' || il.toString() === 'NaN' || p == 0 || il == 0
        ){
          return Res.status(404).render('found/404',{
            Title: '404 | Page Not Found',
            Descrisao:''
          });
        }else{
          next();
        }
      }else if(Req.params.d){
        p = parseInt(Req.params.d);
        if( p.toString() === 'NaN'  || p == 0){
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
  static  async  ViewCount (Id:number){
      const T = await TPosts.findByPk(Id);
      let x = parseInt(T['vsH']) + 1;
     await TPosts.update({vsH: x},{where:{id_am: Id}})
  }
    getPagination(page:number,dinamic:number) :{pagina:number,maximo:number}{
        var maximo = dinamic;
        var pagina = (page == 1) ? page : page;
        pagina = maximo * pagina;
        return {pagina,maximo}
    }
      getDataPagination(data:any,page:any,limit:any) :{}{
        const {count: totalItems,rows:Desvendados} = data;
        const currentPage = page ? +page : 1;
        const TotalPage = Math.ceil(totalItems/limit);
        return {totalItems,Desvendados,TotalPage,currentPage}
      }
      static getLingua(l:string) : string{
        switch (l) {
            case 'Portugues':
            return '/images/brazil.png'
                break;
            case 'Inglesh':
            return'/images/inglesh.png'
            break;
            case 'Japan':
            return'/images/japan.png'
            break;
            case 'Chines':
            return'/images/china.png'
            break;
            case 'korea':
            return '/images/south-korea.png'
            break;
        }
    }
    static rankView(v:number): string{
      if( v >= 1000){
          return Math.floor(v)+` K Views`;
      }else if( v >= 1000000){
        return Math.floor(v)+` M Views`;
      }
      return `${Math.floor(v)} Views`
    }
     static helper (values:string){
            let t = values.split(',');
            let f = new Array()
            for (const b of t) {
                let ws = new String(b.trim().replace(/\s+/g,'-'))
                let link = "<a href='/c/"+ws.toLowerCase()+"' style='list-style:none;text-decoration:none;'>"+b+"</a>"
                f.push(link)
            }
          return f
  }
      
}


export  {MeddlewarePost}