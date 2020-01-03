import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

@Injectable()
export class UploadService {
  fireApp: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any) {
    this.fireApp = firebaseApp;
  }

  /**
   * Function to handle resizing anf base64 encoding of an image file
   * @param file: image file to be handled (using FormData blob)
   * @param callback: callback function to manipulate base64 encoded string after resize
   * @param dims: Maximum size of the larger dimension of the picture to be resized
   */
  handlePicFileSelect(file, dims, callback) {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement('img');
        const tgt = e.target as FileReader;
        img.src = tgt.result;
        this.resize(img, dims, dims, (resized, before, after) => {
          callback(resized);
        });
      };
      reader.readAsDataURL(file);
    }
  }

  //Function used for resizing slected image files
  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {

      // Get the images current width and height
      let width = img.width;
      let height = img.height;

      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // create a canvas object
      const canvas = document.createElement('canvas');

      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      //draw resized image onto the canvas
      ctx.drawImage(img, 0, 0, width, height);

      //write canvas to a base64 encoded png
      const dataUrl = canvas.toDataURL();

      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }

  generateRandomKeyWithLength(keyLength: number): string {
    let key = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < keyLength; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
  }

  /**
   * Upload images to firebase and get the URL and Path of each image
   *
   * @param newImages the new images to upload
   * @param folder path to save the images to
   * @returns a resolved promise when all uploads succeed
   */
  uploadImages(newImages: NewImage[], folderPath: string): Promise<FirebaseImage[]> {
    const uploadPromises = [];
    newImages.forEach((newImage: NewImage) => {
      uploadPromises.push(new Promise<FirebaseImage>((resolve, reject) => {
        const imageFile: File = newImage.file;
        if (imageFile) {
          const imageKey = this.generateRandomKeyWithLength(32);
          this.saveFile(imageFile, folderPath + '/' + imageKey + '.jpg')
            .then(img => {
              let imageInfo = {imageURL: "", imagePath: ""};
              this.getFileURL(img.metadata.fullPath).then(url => {
                imageInfo.imageURL = url;
                imageInfo.imagePath = img.metadata.fullPath;
              }).then( () => {
                resolve(imageInfo);
              })
            });
        }
      }));
    });
    return Promise.all(uploadPromises);
  }

  /**
   * Upload image to firebase and get the URL and Path of the image
   *
   * @param imageFile image file to upload
   * @param path path to save the image to
   * @returns a resolved promise when the upload succeed
   */

  uploadImage(imageFile: File, path: string): Promise<FirebaseImage> {
    const image = {imageURL: '', imagePath: ''};
    const promise = new Promise<FirebaseImage>((resolve, reject) => {
      if (!imageFile) {
        resolve(image);
      } else {
        this.saveFile(imageFile, path).then(img => {
          let imageInfo = {imageURL: "", imagePath: ""};
          this.getFileURL(img.metadata.fullPath).then(url => {
            imageInfo.imageURL = url;
            imageInfo.imagePath = img.metadata.fullPath;
          }).then( () => {
            resolve(imageInfo);
          })
        });
      }
    });
    return promise;
  }

  /**
   * Saves file to Firebase Storage in the specified path
   * @param file File to be uploaded
   * @param path path of the file containing the file name and extension
   */
  saveFile(file: File, path: String) {
    const ref = this.fireApp.storage().ref().child(path);
    return ref.put(file);
  }

  /**
   * Gets a Firebase URL to the file
   * @param path path of the file in Firebase Storage
   */
  getFileURL(path: String): Promise<string> {
    const storageRef = this.fireApp.storage().ref().child(path);
    return storageRef.getDownloadURL();
  }
}

export interface NewImage {
  base64img: string;
  file: File;
}

export interface FirebaseImage {
  imagePath: string;
  imageURL: string;
}
