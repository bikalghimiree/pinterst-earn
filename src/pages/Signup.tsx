import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add signup logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Create your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full name"
          type="text"
          required
          autoComplete="name"
        />
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="new-password"
        />
        
        <p className="text-sm text-gray-600">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-red-500 hover:text-red-600">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-red-500 hover:text-red-600">
            Privacy Policy
          </Link>
        </p>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-red-500 hover:text-red-600"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}