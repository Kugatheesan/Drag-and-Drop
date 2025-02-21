import { addCategory, addService, deleteCategory, deleteService, getAllCategories, getAllService } from "../Controller/serviceController";
import express from 'express';


const routers = express.Router();

routers.get('/service',getAllService)
routers.get('/categories', getAllCategories);
routers.post('/addservice',addService);
routers.post('/addcategories',addCategory)
routers.delete('/categories/:id', deleteCategory);
routers.delete('/services/:id',deleteService);

export default routers;