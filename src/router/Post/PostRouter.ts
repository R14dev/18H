import { Router } from "express";
import { check } from "express-validator";
import HomeController from "../../Controller/Home/HomeController";

import { MeddlewarePost } from "../../middleware/PostMiddleware/PostMiddleware";
const RouterPost = Router();
const HomeControllers = new HomeController();
const MeddlewarePosts = new MeddlewarePost();
RouterPost.get('/d/:d/',MeddlewarePosts.verifyP,HomeControllers.Detalhes);
RouterPost.get('/d/:d/:r',MeddlewarePosts.verifyP,HomeControllers.Reader);
RouterPost.get('/tags',HomeControllers.Tags)
RouterPost.get('/:p',MeddlewarePosts.verifyP,HomeControllers.Pagination);
RouterPost.get('/',HomeControllers.Index)
export {RouterPost}