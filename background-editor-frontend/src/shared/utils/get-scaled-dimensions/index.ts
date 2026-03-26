export const getScaledDimensions = (width: number | undefined, height: number | undefined, scaleFactor: number) => {
  if (!width || !height) {
    return '';
  }

  return `${Math.round(width * scaleFactor)}x${Math.round(height * scaleFactor)}px`;
};
