import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Heart, MessageCircle, Share2, Bookmark, Copy, Flag } from 'lucide-react';
import { PinGrid } from '../components/PinGrid';

export function PinDetail() {
  const { id } = useParams<{ id: string }>();
  const pin = useStore((state) => state.pins.find(p => p.id === id));
  const [comment, setComment] = useState('');
  const [promptCopied, setPromptCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(pin?.aiPrompt || '');
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  if (!pin) return null;

  const similarPins = useStore((state) => 
    state.pins.filter(p => 
      p.id !== pin.id && 
      p.tags?.some(tag => pin.tags?.includes(tag))
    )
  );

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3">
              <img
                src={pin.image}
                alt={pin.title}
                className="w-full h-auto"
              />
            </div>
            
            <div className="md:w-1/3 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Bookmark className="w-6 h-6" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                  <Flag className="w-6 h-6" />
                </button>
              </div>

              <h1 className="text-2xl font-bold mb-2">{pin.title}</h1>
              <p className="text-gray-600 mb-4">{pin.description}</p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">AI Prompt</h3>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                    {promptCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-600">{pin.aiPrompt}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {pin.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Comments</h3>
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {pin.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userId}`}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm">{comment.content}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                    className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More like this</h2>
          <PinGrid pins={similarPins} />
        </div>
      </div>
    </div>
  );
}