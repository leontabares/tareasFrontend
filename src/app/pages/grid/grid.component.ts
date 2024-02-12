import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TareaForm } from '../../interfaces/tarea-form.interface';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

    
  public tareaSelection: Tarea;
  public listTareas: Tarea[] = [];
  public data: string;
  public filaSeleccionada: string | null = null;


  constructor(private tareasService: TareasService, private router: Router) { 
    this.obtenerTareas();
  }

  obtenerTareas()
  {
    this.tareasService.obtenerTareas().subscribe( resp => {
      this.data = JSON.stringify(resp);
      this.listTareas = JSON.parse(this.data);
    });
  }

  mySelection(tareaSeleccionada: Tarea) {
    console.log(tareaSeleccionada);
    this.tareaSelection = tareaSeleccionada;
  }

  redireccionarCrearTarea(): void {
    this.router.navigate(['/creartarea']);
  }

  redireccionarFinalizarTarea(): void {

    if(this.tareaSelection != null)
    {
      Swal.fire({
        title: "Desea finalizar (" + this.tareaSelection.descripcion + ") ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.tareaSelection.finalizada)
          {
            Swal.fire('Error', 'Ya esta tarea se encuentra finalizada.', 'error');
          }
          else
          {
            this.actualizarTarea();
          }
          
        } else if (result.isDenied) {
          Swal.fire("Tarea no finalizada", "", "info");
        }
      });
  
    }
    else
    {
      Swal.fire('Error', 'Debe seleccionar una tarea para finalizar', 'error');
    }
  }

  actualizarTarea()
  {    
    const tareaModel: TareaForm = {
      idTarea: this.tareaSelection.idTarea,
      descripcion: this.tareaSelection.descripcion,
      fecha: this.tareaSelection.fecha,
      finalizada: true,
      idcategoria: this.tareaSelection.categoria.idCategoria.toString()
    };    
    
    this.tareasService.actualizarTarea(tareaModel).subscribe( resp => {
      console.log(resp);
      Swal.fire('Exitoso', 'Tarea finalizada.');
      this.obtenerTareas();
      this.router.navigate(['']);
    }, (err)=> {
      Swal.fire('Error', err.error.msg, 'error');
      console.log(err);
    });
  }  

  redireccionarEliminarTarea()
  {    
    if(this.tareaSelection != null)
    {
      Swal.fire({
        title: "Desea finalizar (" + this.tareaSelection.descripcion + ") ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
            this.EliminarTarea();
        } else if (result.isDenied) {
          Swal.fire("Tarea no eliminada", "", "info");
        }
      });
  
    }
    else
    {
      Swal.fire('Error', 'Debe seleccionar una tarea para eliminar', 'error');
    }   

  }

  EliminarTarea()
  {    

  const tareaModel: TareaForm = {
    idTarea: this.tareaSelection.idTarea,
    descripcion: this.tareaSelection.descripcion,
    fecha: this.tareaSelection.fecha,
    finalizada: true,
    idcategoria: this.tareaSelection.categoria.idCategoria.toString()
  };  

  this.tareasService.eliminarTarea(tareaModel).subscribe( resp => {
    console.log(resp);
    Swal.fire('Exitoso', 'Tarea Eliminada.');
    this.obtenerTareas();
    this.router.navigate(['']);
  }, (err)=> {
    Swal.fire('Error', err.error.msg, 'error');
    console.log(err);
  });
} 

}
