import express from 'express';
const router = express.Router();
import {fork} from 'child_process';


router.get("/:cant", (req, res) => {
  const cantidad = parseInt(req.params.cant) || 1e6;
  const forkeado = fork("./server/configuracion/forkeado.js");
  forkeado.send(cantidad);
  forkeado.on("message", (msg) => {
   res.send(msg) 
  })
});

export { router as RandomRouter };