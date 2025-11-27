import React, { useState } from 'react';
import { Gift } from '../types';
import { X, Gift as GiftIcon, Send, Loader2 } from 'lucide-react';

interface ClaimModalProps {
  gift: Gift | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: (name: string, email: string) => Promise<void>;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ gift, isOpen, onClose, onClaim }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !gift) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    await onClaim(name, email);
    setIsSubmitting(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-100">
        
        {/* Decorative Header */}
        <div className="bg-red-600 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-20"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-inner">
             <GiftIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-festive font-bold text-white">Claim This Gift</h2>
          <p className="text-red-100 text-sm mt-1">Make a child's holiday brighter!</p>
        </div>

        <div className="p-6">
          <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-100">
            <h3 className="font-bold text-green-800 text-lg">{gift.name}</h3>
            <p className="text-green-700 text-sm mt-1">{gift.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                placeholder="Santa's Helper"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                placeholder="helper@northpole.com"
              />
            </div>

            <div className="text-xs text-gray-500 italic mt-2">
              * Your information will be sent to the PTA organizer.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl 
                       transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                       flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Confirm Claim</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
