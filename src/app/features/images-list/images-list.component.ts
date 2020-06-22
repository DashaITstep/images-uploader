import { NgxSpinnerService } from 'ngx-spinner';
import { ImagesService } from './../../services/images.service';
import { Component, OnInit, } from '@angular/core';
import { ImageDto } from 'src/app/interfaces/image.dto';

@Component({
  selector: 'app-images-list',
  styleUrls: ['./images-list.component.scss'],
  templateUrl: './images-list.component.html',
})
export class ImagesListComponent implements OnInit {

  images: ImageDto[] = [];

  constructor(
    private imagesService: ImagesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.imagesService.getAllImages().then(images => {
      this.images = images;
      this.spinner.hide();
    });
  }

  deleteImage(id: number) {
    this.images = this.images.filter(i => i.id !== id);
  }
}
