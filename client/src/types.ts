interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
}

interface BookPatch {
  description: string;
}
