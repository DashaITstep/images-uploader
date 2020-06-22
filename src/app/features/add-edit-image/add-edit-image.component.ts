import { NgxSpinnerService } from 'ngx-spinner';
import { ImagesService } from './../../services/images.service';
import { TooltipPosition } from './../../enums/tooltip-position.enum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { ImageDto } from 'src/app/interfaces/image.dto';

@Component({
  selector: 'app-add-edit-image',
  styleUrls: ['./add-edit-image.component.scss'],
  templateUrl: './add-edit-image.component.html',
})
export class AddEditImageComponent implements OnInit {

  id: number;
  isImageSaved: boolean;
  imageBase64: string;
  tooltipLabel = '';
  tooltipPosition: string;
  tooltipColor: string;

  tooltipPositions = TooltipPosition;

  constructor(
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private imagesService: ImagesService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.tooltipPosition = TooltipPosition.Top;
    this.tooltipColor = '#000000';
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(async (data) => {
      this.id = +data;

      this.spinner.show();
      const image = await this.imagesService.getImageById(this.id);
      this.spinner.hide();
      this.isImageSaved = true;
      this.id = image.id;
      this.imageBase64 = image.image;
      this.tooltipColor = image.tooltipColor;
      this.tooltipLabel = image.tooltipLabel;
      this.tooltipPosition = image.tooltipPosition;
    });
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.imageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  saveImage() {
    if (!this.isImageSaved) {
      this.notificationsService.error('Image is required!');
      return false;
    }

    if (!this.tooltipLabel.replace(/\s/g, '').length) {
      this.notificationsService.error('Tooltip Label is required!');
      return false;
    }

    this.spinner.show();
    const prevImages = JSON.parse(localStorage.getItem('images')) || [];
    const nextId =
      prevImages.length
        ? prevImages[prevImages.length - 1].id + 1
        : 0;

    const image: ImageDto = {
      id: this.id.toString() ? this.id : nextId,
      image: this.imageBase64,
      tooltipLabel: this.tooltipLabel,
      tooltipColor: this.tooltipColor,
      tooltipPosition: this.tooltipPosition,
    };

    if (this.id.toString()) {
      this.imagesService.updateImage(image, this.id).then(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
      });
    } else {
      this.imagesService.addImage(image).then(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
      });
    }
  }

}
