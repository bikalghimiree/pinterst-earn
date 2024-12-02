import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Wallet2, CreditCard, DollarSign } from 'lucide-react';

export function Withdrawals() {
  const earnings = useStore((state) => state.earnings);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');

  const withdrawalMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet2,
      description: 'Withdraw directly to your PayPal account',
      minAmount: 10,
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: CreditCard,
      description: 'Instant transfer to your UPI ID',
      minAmount: 5,
    },
    {
      id: 'esewa',
      name: 'eSewa',
      icon: DollarSign,
      description: 'Transfer to your eSewa wallet',
      minAmount: 5,
    },
  ];

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal logic here
    console.log('Withdrawal requested:', {
      method: selectedMethod,
      amount: withdrawalAmount,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Withdrawals</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Available Balance</h3>
          <p className="text-3xl font-bold">${earnings.total.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Balance</h3>
          <p className="text-3xl font-bold">${earnings.pending.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Withdrawn</h3>
          <p className="text-3xl font-bold">
            ${(earnings.total - earnings.pending).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Withdrawal Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {withdrawalMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-lg border text-left ${
                selectedMethod === method.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-500'
              }`}
            >
              <method.icon className={`w-6 h-6 mb-2 ${
                selectedMethod === method.id ? 'text-red-500' : 'text-gray-400'
              }`} />
              <h3 className="font-medium mb-1">{method.name}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Min. withdrawal: ${method.minAmount}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedMethod && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Request Withdrawal</h2>
          <form onSubmit={handleWithdrawal} className="max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to withdraw
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  min={withdrawalMethods.find(m => m.id === selectedMethod)?.minAmount}
                  max={earnings.total}
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Request Withdrawal
            </button>
          </form>
        </div>
      )}
    </div>
  );
}