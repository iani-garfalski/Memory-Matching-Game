/*
Expected structure for storing images in localStorage:
Each category (e.g., 'animals', 'fruits') has its own key in localStorage, prefixed with "storage_".

Key: "storage_<category>"
Value: {
  timestamp: number;  // The time (in milliseconds since Unix epoch) when the data was last updated.
  images: [           // Array of image objects for the category.
    {
      url: string;    // The image URL (e.g., a small version suitable for the game).
      alt: string;    // The alt text for the image (used for accessibility and screen readers).
    },
    ...
  ];
}

Example:
"storage_animals": {
  "timestamp": 1699876543210, // Cached on November 13, 2024, 1:02:23 PM UTC
  "images": [
    { "url": "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg", "alt": "A lion in the wild" },
    { "url": "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg", "alt": "A close-up of a butterfly on a flower" }
  ]
}
*/

import axios from 'axios';
import { Image, StoredData } from '../types/image';

const PEXELS_BASE_URL = 'https://api.pexels.com/v1/';
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

/**
 * Fetch images from the Pexels API.
 * @param category - The search query (e.g., 'animals', 'fruits').
 * @param count - The number of images to fetch.
 * @returns A Promise that resolves to an array of image objects with { url, alt }.
 */
const fetchPexelsImages = async (category: string, count: number): Promise<Image[]> => {
  console.log(`Fetching ${count} images from the Pexels API for category "${category}".`);
  try {
    const response = await axios.get(`${PEXELS_BASE_URL}search`, {
      headers: { Authorization: PEXELS_API_KEY },
      params: { query: category, per_page: count, size: 'small' },
    });
    return response.data.photos.map((photo: any) => ({
      url: photo.src.tiny,
      alt: photo.alt,
    }));
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    throw new Error('Failed to fetch images from the API.');
  }
};

/**
 * Ensure there are enough images in localStorage for the given category.
 * Fetches additional images if required and updates localStorage.
 * @param category - The category of images (e.g., 'animals').
 * @param count - The minimum number of images required.
 * @returns A Promise that resolves to an array of image objects with { url, alt }.
 */
export const ensureImagesInStorage = async (category: string, count: number): Promise<Image[]> => {
  const storageKey = `storage_${category}`;

  try {
    // Retrieve and parse the stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem(storageKey) || 'null') as StoredData | null;

    // Destructure storedData to extract images and timestamp
    const { images: storedImages, timestamp = 0 } = storedData ?? { images: [], timestamp: 0 };

    // Return early if there is no valid images data
    if (!Array.isArray(storedImages)) {
      console.log('No valid cached images found, fetching new ones.');
      return fetchAndUpdateImages(category, count);
    }

    // Return early if the data is expired or invalid
    const isValidImageData = storedImages.length >= count;
    const isDataNotExpired = Date.now() - timestamp < EXPIRATION_TIME;

    if (!isValidImageData || !isDataNotExpired) {
      console.log(`Cached images for category "${category}" are invalid or expired. Fetching new images.`);
      return fetchAndUpdateImages(category, count);
    }

    // Return the cached images if they are valid
    console.log(`Using cached images for category "${category}" from localStorage.`);
    return storedImages.slice(0, count);

  } catch (error) {
    // If anything goes wrong, log the error and return an empty array as a fallback
    console.error('Error while ensuring images in storage:', error);
    return []; // Fallback in case of error
  }
};

// Helper function to fetch and update images in localStorage
async function fetchAndUpdateImages(category: string, count: number): Promise<Image[]> {
  const images = await fetchPexelsImages(category, count);

  // Save updated data to localStorage
  const updatedData: StoredData = {
    timestamp: Date.now(),
    images,
  };
  localStorage.setItem(`storage_${category}`, JSON.stringify(updatedData));
  console.log(`Updated localStorage for category "${category}".`);

  return images;
}
