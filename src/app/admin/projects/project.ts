interface Project {
  title: string;
  about: string;
  headerImage: {
    imageDownloadURL: string;
    imagePath: string;
  };
  aboutImage: {
    imageDownloadURL: string;
    imagePath: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  masterplanDescription: string;
  masterplan: {
    imageDownloadURL: string;
    imagePath: string;
  };
  dining?: {
    imageDownloadURL: string;
    imagePath: string;
  };
  shopping?: {
    imageDownloadURL: string;
    imagePath: string;
  };
  entertainment?: {
    imageDownloadURL: string;
    imagePath: string;
  };
  business?: {
    imageDownloadURL: string;
    imagePath: string;
  };
  hospitalityAndResidence?: {
    imageDownloadURL: string;
    imagePath: string;
  };
}
