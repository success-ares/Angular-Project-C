export interface EventPage {
  key?: string;
  title: string;
  content: string;
  date: any;
  eventDate: any;
  image: {
    imageDownloadURL: string;
    imagePath: string;
  };
  innerButton: {
    url: string;
    title: string;
  };
  outerButton: {
    title: string;
  };
}
