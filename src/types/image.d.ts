// Define a type for the structure of the image object
export interface Image {
  url: string;
  alt: string;
}

// Define the structure of the data stored in localStorage
export interface StoredData {
  timestamp: number;
  images: Image[];
}
