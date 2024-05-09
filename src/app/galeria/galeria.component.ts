import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent
} from '@angular/animations';
import { ProfileFiles } from '../models/profileFiles';



@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({ transform: 'scale(0.5)' }),
        animate('150ms', style({ transform: 'scale(1)' }))
      ]),
      transition('visible => void', [
        style({ transform: 'scale(1)' }),
        animate('150ms', style({ transform: 'scale(0.5)' }))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('50ms', style({ opacity: 0.8 }))
      ])
    ])
  ]
})
export class GaleriaComponent {


  @Input() galleryData: Array<ProfileFiles> = [];
  @Input() showCount = true;
  @Input() onEdit = false;

  @Output() deleteFile = new EventEmitter<ProfileFiles>;

  previewImage = false;
  showMask = false;
  currentLightboxImage: ProfileFiles = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;


  constructor() { }

  ngOnChanges(): void {
    this.totalImageCount = this.galleryData.length;
  }


  onPreviewImage(index: number): void {
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
    this.onEdit = true;
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.previewImage = false;
    this.onEdit = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  prev(): void {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  delete(file: ProfileFiles) { //CHEQUEAR Q SIRVA PARA BBDD
    this.deleteFile.emit(file);
    this.totalImageCount--;
    this.onClosePreview();
  }
}
