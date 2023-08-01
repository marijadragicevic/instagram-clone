// checks for duplicates based on id
export const checkForDuplicate = (selectedMedia, selectedPhotoId) => {
  const duplicate = selectedMedia?.find(
    (selectedMediaItem) => selectedPhotoId === selectedMediaItem.id
  );

  return duplicate;
};

export const handleUpdateSelectedMedia = (
  selectedMedia,
  selectedPhoto,
  duplicate
) => {
  let updatedSelectedMedia = [];

  if (selectedMedia?.length === 0) {
    updatedSelectedMedia = [
      ...selectedMedia,
      { ...selectedPhoto, isSelected: true, number: 1 },
    ];
  } else if (selectedMedia?.length > 0) {
    updatedSelectedMedia = duplicate
      ? selectedMedia
          ?.filter(
            (selectedMediaItem) => selectedMediaItem?.id !== duplicate?.id
          )
          ?.map((filteredMedia, index) => ({
            ...filteredMedia,
            number: index + 1,
          }))
      : [
          ...selectedMedia,
          {
            ...selectedPhoto,
            isSelected: true,
            number: selectedMedia?.length + 1,
          },
        ];
  }

  return updatedSelectedMedia;
};

export const handleUpdatePhotos = (photos, selectedPhoto) => {
  const updatedPhotos = photos?.map((photo) => {
    if (selectedPhoto.id === photo.id) {
      return {
        ...selectedPhoto,
        isSelected: !selectedPhoto?.isSelected,
      };
    }

    return photo;
  });

  return updatedPhotos;
};
