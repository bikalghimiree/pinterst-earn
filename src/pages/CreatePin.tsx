import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ImageFile {
  url: string;
  file?: File;
}

export function CreatePin() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [aiModel, setAiModel] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const addPin = useStore((state) => state.addPin);
  const user = useStore((state) => state.user);

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 20 * 1024 * 1024
    ).slice(0, 20 - images.length);

    const newImages = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    setImages(prev => [...prev, ...newImages]);
  }, [images]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => 
        file.type.startsWith('image/') && file.size <= 20 * 1024 * 1024
      ).slice(0, 20 - images.length);

      const newImages = validFiles.map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 10) {
      e.preventDefault();
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newPin = {
      id: Date.now().toString(),
      title,
      description,
      image: images[0].url, // For now, just use the first image
      userId: user.id,
      boardId: '',
      saves: 0,
      views: 0,
      uniqueViews: 0,
      paidViews: 0,
      earnings: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      aiModel,
      aiPrompt,
      tags,
    };

    addPin(newPin);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create Pin</h1>
        
        <div className="mb-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleImageDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">
              Drag and drop up to 20 images (max 20MB each)
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600"
            >
              Select Files
            </label>
          </div>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">AI Model Used</label>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Stable Diffusion, DALL-E, Midjourney"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">AI Prompt</label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Enter the prompt used to generate this image"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {tags.length < 10 && (
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add a tag..."
                  className="border-none outline-none bg-transparent"
                />
              )}
            </div>
            <p className="text-sm text-gray-500">
              Press Enter to add a tag (max 10 tags)
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
        >
          Create Pin
        </button>
      </form>
    </div>
  );
}