import { ref } from 'vue';

export const useBackground = () => {
  const backgroundImage = ref('');

  const preloadBackgroundImage = (imageUrl: string) => {
    const img = new Image();
    img.src = imageUrl;
    return new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  };

  const changeBackground = async () => {
    // Generate a random number between 1 and 10
    const randomIndex = Math.floor(Math.random() * 10) + 1;

    // Ensure the background image URL is properly formatted, handling '10' as a special case
    const newBackground = randomIndex < 10
      ? `/images/pixel-lake0${randomIndex}.jpg` // For 1 to 9, prepend '0'
      : `/images/pixel-lake${randomIndex}.jpg`;  // For 10, no '0' needed

    try {
      // Preload the image and wait until it's fully loaded
      await preloadBackgroundImage(newBackground);

      document.body.style.backgroundImage = `url(${newBackground})`;
    } catch (error) {
      console.error('Background image failed to load, applying fallback.', error);
    }
  };

  return { backgroundImage, changeBackground };
};
