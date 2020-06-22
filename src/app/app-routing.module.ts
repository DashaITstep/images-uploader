import { AddEditImageComponent } from './features/add-edit-image/add-edit-image.component';
import { ImagesListComponent } from './features/images-list/images-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ImagesListComponent },
  { path: 'image', component: AddEditImageComponent },
  { path: 'image/:id', component: AddEditImageComponent },
  { path: '**', component: ImagesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
