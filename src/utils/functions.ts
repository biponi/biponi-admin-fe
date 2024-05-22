export const isValidImageUrl = (url: string): boolean => {
  // Regular expression to match common image file extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

  // Check if the URL matches a valid image file extension and is not a blob URL
  return imageExtensions.test(url) && !url.startsWith("blob:");
};

// Function to create FormData dynamically from an object
export const buildFormDataFromObject = (data: any): FormData => {
  const formData = new FormData();

  // Helper function to append nested arrays to FormData
  const appendArrayValues = (key: string, arr: any[]) => {
    arr.forEach((item, index) => {
      if (typeof item === "object") {
        // Convert object to JSON string and append with indexed key
        formData.append(`${key}[${index}]`, JSON.stringify(item));
      } else {
        // Append value directly with indexed key
        formData.append(`${key}[${index}]`, item);
      }
    });
  };

  // Iterate over the properties of the input object
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        // Handle nested arrays
        appendArrayValues(key, value);
      } else if (value instanceof File) {
        // Append the file directly without stringifying
        formData.append(key, value);
      } else if (typeof value === "object" && value !== null) {
        // Convert nested objects to JSON string
        formData.append(key, JSON.stringify(value));
      } else {
        // Append primitive value directly
        formData.append(key, value);
      }
    }
  }

  return formData;
};

export const getInitialsWord = (sentence: string) => {
  const words = sentence.trim().split(/\s+/); // Split the sentence into words based on whitespace

  if (!words || words.length < 1) return "N/A";

  if (words.length === 1) {
    return words[0].substring(0, 2); // Return first two letters if there is only one word
  } else if (words.length === 2) {
    return words[0][0] + words[1][0]; // Return the first letter of each word if there are two words
  } else {
    return words[0][0] + words[words.length - 1][0]; // Return the first letter of the first and last words if more than two words
  }
};
