import DOMController from "./ui/DOMController.js";


//Las páginas de /pages necesitan subir un nivel para llegar a /assets
const basePath=location.pathname.includes("/pages/") ? "../" : "";

const app=new DOMController(basePath);
app.init();
