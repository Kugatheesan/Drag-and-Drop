import express from "express";
import { getAllServices, getServicesByServiceId, getServiceById, createService, createCategory, getAllCategories, editCategory, editService, deleteService, deleteCategory,  } from "../conrollers/serviceController";

const routers = express.Router();

routers.get("/", getAllServices); // Get all services
routers.get("/categories", getAllCategories);
routers.get("/:id", getServiceById);
routers.get("/service/:serviceId", getServicesByServiceId); // Get services by category ID
routers.post("/services", createService)
routers.post("/addcatgeocary", createCategory)  // change to array multiple add

routers.put("/catedit/:id", editCategory )  // change to arry
routers.put("/seredit", editService)
routers.delete("/serdelete", deleteService)
routers.delete("/catdelete",deleteCategory)


export default routers;
