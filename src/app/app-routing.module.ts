import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { NotpagefoundComponent } from './pages/notpagefound/notpagefound.component';
import { AppComponent } from './app.component';
import { CreartareaComponent } from './pages/creartarea/creartarea.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'body', component: BodyComponent},
  {path: 'creartarea', component: CreartareaComponent},
  {path: '', redirectTo: 'body', pathMatch: 'full'},
  {path: '**', component: NotpagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
