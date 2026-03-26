'use client';

const Loader = () => {
  return (
    <div className="bg-opacity-75 inset-0 z-50 flex items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
