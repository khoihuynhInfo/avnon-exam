import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './page/builder/builder.component';

const routes: Routes = [
  { path: '', redirectTo: 'form/builder', pathMatch: 'full' },
  { path: 'form/builder', component: BuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
