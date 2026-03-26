const formattedFileSize = (bytes?: number) => {
  if (!bytes) return [0, 'b'];

  const k = 1024;
  const sizes = ['b', 'kb', 'mb'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const index = i >= sizes.length - 1 ? sizes.length - 1 : i;

  return [parseFloat((bytes / Math.pow(k, index)).toFixed(2)), sizes[index]];
};

export { formattedFileSize };
