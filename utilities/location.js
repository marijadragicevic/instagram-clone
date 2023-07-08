const GOOGLE_API_KEY = "AIzaSyAaWQqTY6UfIe1VIpKFuPKIT0TgjZnYEl4";

export const getMapPreview = (lat, long) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=10&size=200x400&maptype=roadmap&markers=color:red%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
  // label:S%7C label on marker between 7C and ${lat}

  return imagePreviewUrl;
};

export const getAddress = async (lat, long) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=200x400&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;

  // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();

  const address = response.results[0].formatted_address;

  return address;
};
