export interface PressReleasePage {
  key?: string;
  title: string;
  content: string;
  date: any;
  image: {
    imageDownloadURL: string;
    imagePath: string;
  };
  outerButton: {
    title: string;
  };
}
