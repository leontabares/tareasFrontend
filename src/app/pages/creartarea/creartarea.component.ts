import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { TareasService } from '../../services/tareas.service';
import { TareaForm } from '../../interfaces/tarea-form.interface';
import Swal from 'sweetalert2';
import { Categoria } from '../../models/categoria.model';


@Component({
  selector: 'app-creartarea',
  templateUrl: './creartarea.component.html',
  styleUrl: './creartarea.component.css'
})
export class CreartareaComponent {

  public formSubmitted = false;
  public listCategorias: Categoria[] = [];
  public data: string;

  public createTareaForm = this.fb.group({
    idtarea: [Guid.create().toString()],
    descripcion: ['', Validators.required],
    categoria:['', Validators.required],
    fecha:['', Validators.required],
    finalizada:[false]
  });

  constructor(private router: Router, private fb: FormBuilder, private tareaService: TareasService) {
    this.obtenerCategorias();
   }

  volver(): void {
    this.router.navigate(['']);
  }

  obtenerCategorias(): void
  {
    this.tareaService.obtenerCategorias().subscribe( resp => {
      this.data = JSON.stringify(resp);
      this.listCategorias = JSON.parse(this.data);
    });
  }  

  crearTarea(): void {
    this.formSubmitted = true;
    
    if(this.createTareaForm.invalid)
    {
      console.log("Formulario no es correcto");
      return;
    }
    const tareaModel: TareaForm = {
      idTarea: Guid.create().toString(),
      descripcion: this.createTareaForm.value.descripcion?.toString(),
      fecha: this.createTareaForm.value.fecha?.toString(),
      finalizada: false,
      idcategoria: this.createTareaForm.value.categoria?.toString()
    };

    this.tareaService.crearTarea(tareaModel)
    .subscribe(resp=> {
      console.log(resp);
      Swal.fire('Exitoso', 'Ingreso exitoso de la tarea.');
      this.router.navigate(['']);

    }, (err)=> {
      Swal.fire('Error', err.error.msg, 'error');
      console.log(err);
    });

  }

  campoNoValido(campo: string) : boolean
  {
    if(this.createTareaForm.get(campo)?.invalid && this.formSubmitted)
    {
      return true;
    }
    else
    {
      return false;
    }    
  }

  
}
