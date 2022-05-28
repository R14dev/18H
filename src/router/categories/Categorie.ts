import { Router } from "express";
import CategorieController from "../../Controller/Categorie/CategorieController";
import HomeController from "../../Controller/Home/HomeController";
import LanguageController from "../../Controller/Language/LanguageController";
import { CategorieMiddleware } from "../../middleware/CategoriesMiddleware/CtMiddleware";
const CategoriesRouter = Router();
const LanguageControllers = new LanguageController();
const CategorieControllers = new CategorieController();
const CategorieMiddlewares = new CategorieMiddleware()
CategoriesRouter.get('/l/:l/:page', CategorieMiddlewares.verifyP ,LanguageControllers.index);
CategoriesRouter.get('/c/:c/:pc', CategorieMiddlewares.verifyP,CategorieControllers.index);
CategoriesRouter.get('/l/:l', CategorieMiddlewares.verifyP ,LanguageControllers.index);
CategoriesRouter.get('/c/:c', CategorieMiddlewares.verifyP,CategorieControllers.index);
CategoriesRouter.get('*',CategorieController.notFound);
export {CategoriesRouter}