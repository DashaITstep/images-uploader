import { Injectable } from '@angular/core';
import { ImageDto } from '../interfaces/image.dto';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
  ) { }

  addImage(image: ImageDto): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const prevImages = JSON.parse(localStorage.getItem('images')) || [];
        localStorage.setItem('images', JSON.stringify([...prevImages, image]));
        resolve(true);
      }, 1000);
    });
  }

  updateImage(image: ImageDto, id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const prevImages = JSON.parse(localStorage.getItem('images')) || [];
        const updatedImages = prevImages.map(i => i.id === id ? image : i);
        localStorage.setItem('images', JSON.stringify(updatedImages));
        resolve(true);
      }, 1000);
    });
  }

  getAllImages(): Promise<ImageDto[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const images = JSON.parse(localStorage.getItem('images'));
        resolve(images);
      }, 1000);
    });
  }

  deleteImage(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const images = JSON.parse(localStorage.getItem('images'));
        const updatedImages = images.filter(i => i.id !== id);
        localStorage.setItem('images', JSON.stringify(updatedImages));
        resolve(true);
      }, 1000);
    });
  }

  getImageById(id: number): Promise<ImageDto> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const images = JSON.parse(localStorage.getItem('images'));
        const image = images.find(i => i.id === id);
        resolve(image);
      }, 1000);
    });
  }
}

