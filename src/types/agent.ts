export interface Agent {
  id: string;
  name: string;
  version: string;
  description: string;
  longDescription?: string;
  image: {
    repository: string;
    tag: string;
    digest: string;
    size: number;
  };
  author: {
    name: string;
    email: string;
    url?: string;
  };
  license: string;
  homepage: string;
  repository: string;
  documentation: string;
  categories: string[];
  tags: string[];
}