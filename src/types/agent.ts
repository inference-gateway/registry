export interface Agent {
  id: string;
  name: string;
  version: string;
  description: string;
  longDescription?: string;
  image: {
    repository: string;
    tag: string;
    size: string;
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