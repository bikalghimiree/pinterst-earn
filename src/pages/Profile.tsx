import React, { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import { Camera, Link as LinkIcon, MapPin, Twitter, Instagram } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { PinGrid } from '../components/PinGrid';

export function Profile() {
  const user = useStore((state) => state.user);
  const pins = useStore((state) => state.pins.filter(pin => pin.userId === user?.id));
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    bio: "AI art enthusiast and digital creator",
    location: "San Francisco, CA",
    website: "https://example.com",
    twitter: "@username",
    instagram: "@username"
  });

  const handleProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle profile picture upload
      console.log('Uploading profile picture:', file);
    }
  };

  const handleCoverPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle cover photo upload
      console.log('Uploading cover photo:', file);
    }
  };

  return (
    <div className="pt-16">
      {/* Cover Photo */}
      <div className="relative h-64 bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => coverInputRef.current?.click()}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
        >
          <Camera className="w-5 h-5" />
        </button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverPhoto}
          className="hidden"
        />
      </div>

      {/* Profile Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-24">
          <div className="relative z-10">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicture}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </div>

          {isEditing ? (
            <div className="mt-6 space-y-4">
              <Input
                label="Bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
              <Input
                label="Location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
              <Input
                label="Website"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              />
              <Input
                label="Twitter"
                value={profile.twitter}
                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
              />
              <Input
                label="Instagram"
                value={profile.instagram}
                onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
              />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <LinkIcon className="w-5 h-5" />
                <a href={profile.website} className="text-red-500 hover:underline">
                  {profile.website}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                  {profile.twitter}
                </a>
                <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                  {profile.instagram}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">My Pins</h2>
          <PinGrid pins={pins} />
        </div>
      </div>
    </div>
  );
}