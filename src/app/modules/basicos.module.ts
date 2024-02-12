import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotpagefoundComponent } from '../pages/notpagefound/notpagefound.component';
import { HeaderComponent } from '../pages/header/header.component';
import { BodyComponent } from '../pages/body/body.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { GridComponent } from '../pages/grid/grid.component';
import { CreartareaComponent } from '../pages/creartarea/creartarea.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotpagefoundComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    GridComponent,
    CreartareaComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class BasicosModule { }
