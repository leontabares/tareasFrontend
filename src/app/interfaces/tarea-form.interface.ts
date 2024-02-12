import { Categoria } from "../models/categoria.model";

export interface TareaForm {
    idTarea: string;
    descripcion?: string;
    fecha?: string;
    finalizada: boolean;
    idcategoria?: string;
}

