import { NgxSpinnerService } from 'ngx-spinner';
import { TooltipPosition } from './../../enums/tooltip-position.enum';
import { ImagesService } from './../../services/images.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageDto } from 'src/app/interfaces/image.dto';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-image-item',
  styleUrls: ['./image-item.component.scss'],
  templateUrl: './image-item.component.html',
})
export class ImageItemComponent {

  tooltipPositions = TooltipPosition;

  constructor(
    private router: Router,
    private imagesService: ImagesService,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
  ) { }

  @Input() image: ImageDto;
  @Output() imageDeleted = new EventEmitter<number>();

  openImageDetails() {
    this.router.navigateByUrl(`/image/${this.image.id}`);
  }

  deleteImage(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.spinner.show();
    this.imagesService.deleteImage(this.image.id)
      .then(() => {
        this.spinner.hide();
        this.notificationsService.success('Image deleted.');
        this.imageDeleted.emit(this.image.id);
      });
  }

}
