import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ImageUpload = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (data.success) {
        onImageUpload(data.imageUrl);
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <span className="text-gray-600">
            {uploading ? 'Subiendo...' : 'Haz clic para subir una imagen'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;