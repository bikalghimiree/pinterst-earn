import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Check your email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to your email address.
          </p>
          <Link
            to="/login"
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Reset your password
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Send reset instructions
        </Button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
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