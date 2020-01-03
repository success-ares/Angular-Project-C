interface CareerMetadata {
  key?: string;
  title: string;
  category: string;
}

interface Career extends CareerMetadata {
  description: string;
  requirements: string;
  extras: string;
  benefits: string;
  available: boolean;
}
