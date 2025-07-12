import React, { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []).filter(file =>
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-[30rem] bg-red-200 p-4 space-y-4 rounded">
      <label className="font-bold block">Upload Images/Videos</label>

      {/* Scrollable File Preview List */}
      {files.length > 0 && (
        <div className="flex gap-4 overflow-x-auto max-w-full pb-2">
          {files.map((file, index) => (
            <div key={index} className="relative w-fit shrink-0">
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-sm font-bold bg-gray-400 text-white py-1 px-2 rounded-full absolute top-1 right-1 hover:bg-gray-500 transition-all z-10"
              >
                X
              </button>

              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                  className="rounded border"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  width={100}
                  controls
                  className="rounded border"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Dropzone + Browse */}
      <div
        onDrop={handleDrop}
        onDragOver={preventDefaults}
        onDragEnter={preventDefaults}
        onDragLeave={preventDefaults}
        className="w-full p-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition duration-200 ease-in-out hover:border-blue-600 bg-gray-50"
      >
        <p className="text-gray-500 mb-1">Drag & drop your images/videos here</p>
        <p className="text-sm text-gray-400">or</p>

        <label className="inline-block mt-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-800 transition-all cursor-pointer">
          Browse Files
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
