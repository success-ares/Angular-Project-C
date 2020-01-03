interface BenefitMetadata {
  key?: string;
  header: string;
}

interface Benefit extends BenefitMetadata {
  content: string;
}
