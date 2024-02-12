import { Categoria } from "./categoria.model";

export class Tarea {
    constructor(public idTarea: string, public descripcion: string, public fecha: string, public finalizada: boolean,  public categoria: Categoria) {

    }
  
  }
