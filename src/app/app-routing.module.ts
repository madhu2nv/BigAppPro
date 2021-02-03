import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailSchedulingComponent } from './mail-scheduling/mail-scheduling.component';


const routes: Routes = [
  {path: '', component: MailSchedulingComponent},
 
  ]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
