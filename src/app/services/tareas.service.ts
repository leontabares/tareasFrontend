import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TareaForm } from '../interfaces/tarea-form.interface';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor( private http: HttpClient) { }

  api = 'http://localhost:5274';

  obtenerCategorias() {
    return this.http.get(this.api + '/Categoria');
  }

  obtenerTareas() {
    return this.http.get(this.api + '/Tarea');
  }

  obtenerTarea(idTarea: string) {
    return this.http.get(this.api + '/Tarea/' + idTarea);
  }

  crearTarea( formData: TareaForm) {
    return this.http.post(this.api + '/Tarea', formData);    
  }

  actualizarTarea(tarea: TareaForm) {
    return this.http.put(this.api + '/Tarea', tarea );
  }

  eliminarTarea(tarea: TareaForm) {
    return this.http.put(this.api + '/Tarea/Eliminar', tarea);
  }

}



