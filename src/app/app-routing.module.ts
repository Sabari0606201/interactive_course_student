import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TexteditorComponent } from './texteditor/texteditor.component';
import { FocustimerComponent } from './focustimer/focustimer.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'texteditor', component: TexteditorComponent
  },
  {
    path: 'focustimer', component: FocustimerComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
