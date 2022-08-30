import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActingComponent } from './acting/acting.component';
import { CodeComponent } from './code/code.component';

const routes: Routes = [
  { path: 'acting', component: ActingComponent },
  { path: 'code', component: CodeComponent },
  { path: '**', component: ActingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
