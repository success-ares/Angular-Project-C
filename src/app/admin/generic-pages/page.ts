interface PageMetadata {
  key?: string;
  title: string;
}

interface Page extends PageMetadata {
  link: string;
}
