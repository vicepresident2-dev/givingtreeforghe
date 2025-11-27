import React, { useEffect, useState } from 'react';
import { Gift } from './types';
import { fetchGifts, claimGift } from './services/api';
import { Ornament } from './components/Ornament';
import { ClaimModal } from './components/ClaimModal';
import { TREE_POSITIONS } from './constants';
import { Star, Gift as GiftIcon, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

function App() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loadGifts = async () => {
    setLoading(true);
    const fetchedGifts = await fetchGifts();
    setGifts(fetchedGifts);
    setLoading(false);
  };

  useEffect(() => {
    loadGifts();
  }, []);

  const handleOrnamentClick = (gift: Gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleClaim = async (name: string, email: string) => {
    if (!selectedGift) return;

    const success = await claimGift({
      giftId: selectedGift.id,
      claimerName: name,
      claimerEmail: email,
      giftName: selectedGift.name
    });

    if (success) {
      setIsModalOpen(false);
      setShowSuccess(true);
      
      // Refresh list to remove claimed gift
      await loadGifts();

      // Trigger Mailto
      const recipient = "vicepresident2@geneseehillpta.org";
      const subject = encodeURIComponent(`Giving Tree Gift Claimed: ${selectedGift.name}`);
      const body = encodeURIComponent(
        `Hi,\n\nI have claimed the gift: ${selectedGift.name}.\n` +
        `Description: ${selectedGift.description}\n\n` +
        `My Name: ${name}\n` +
        `My Email: ${email}\n\n` +
        `I will drop it off unwrapped by December 11th.`
      );
      
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      alert("Something went wrong claiming this gift. Please try again or contact the PTA.");
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden font-sans text-gray-800">
      
      {/* Header Section */}
      <header className="bg-red-700 text-white shadow-xl relative z-10">
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
          <h1 className="text-5xl md:text-7xl font-festive font-bold mb-4 drop-shadow-md">
            Genesee Hill Giving Tree
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto font-festive">
            Spread joy this season by helping Mary's Place collect gifts for children in need.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-8 relative z-20">
        
        {/* Instructions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto mb-12 border-t-8 border-green-600">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-festive font-bold text-red-700 mb-6">How to Participate</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 text-green-700">
                    <GiftIcon size={20} />
                  </div>
                  <span><span className="font-bold">1. Click an ornament</span> on the tree to see the gift wish.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 text-green-700">
                    <CheckCircle2 size={20} />
                  </div>
                  <span><span className="font-bold">2. Enter your details</span> to claim the gift. The ornament will disappear so others don't choose it.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 text-green-700">
                    <Calendar size={20} />
                  </div>
                  <span><span className="font-bold">3. Drop off by Dec 11th</span>. Please bring the <span className="font-bold underline text-red-600">unwrapped</span> gift to the main office.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 text-green-700">
                    <MapPin size={20} />
                  </div>
                  <span><span className="font-bold">4. Delivery!</span> We will deliver to Mary's Place in time for Christmas cheer.</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
              <h3 className="text-xl font-bold text-green-800 mb-2">Important Deadline</h3>
              <p className="text-4xl font-festive text-red-600 font-bold mb-4">December 11th</p>
              <p className="text-sm text-green-700">Please remember gifts must be <b>unwrapped</b> when dropped off.</p>
            </div>
          </div>
        </div>

        {/* The Tree Section */}
        <div className="relative w-full max-w-3xl mx-auto min-h-[600px] md:min-h-[800px] flex justify-center">
           
           {/* Loading State */}
           {loading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-white/50 backdrop-blur-sm rounded-xl">
               <div className="animate-spin text-red-600 mb-4">
                 <Star size={48} />
               </div>
               <p className="text-xl font-festive text-green-800">Decorating the tree...</p>
             </div>
           )}

           {/* Empty State */}
           {!loading && gifts.length === 0 && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-white/80 rounded-xl p-8 text-center">
               <h3 className="text-4xl font-festive text-green-800 mb-4">The Tree is Empty!</h3>
               <p className="text-lg">All gifts have been claimed. Thank you for your generosity!</p>
             </div>
           )}

           {/* Tree Container */}
           <div className="relative w-full h-[700px] md:h-[900px]">
              
              {/* Star on Top */}
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse">
                <Star fill="#fbbf24" stroke="#eab308" className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
              </div>

              {/* The Tree Shape (SVG) */}
              <svg 
                viewBox="0 0 100 120" 
                preserveAspectRatio="none"
                className="w-full h-full drop-shadow-2xl filter"
              >
                {/* Tree Levels (Triangles) */}
                <path d="M50 15 L35 35 L65 35 Z" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
                <path d="M50 25 L30 50 L70 50 Z" fill="#15803d" stroke="#14532d" strokeWidth="0.5" />
                <path d="M50 40 L25 70 L75 70 Z" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
                <path d="M50 55 L20 90 L80 90 Z" fill="#15803d" stroke="#14532d" strokeWidth="0.5" />
                
                {/* Trunk */}
                <rect x="45" y="90" width="10" height="15" fill="#451a03" />
              </svg>

              {/* Ornaments Layer */}
              {!loading && (
                <div className="absolute inset-0">
                  {gifts.slice(0, TREE_POSITIONS.length).map((gift, index) => (
                    <Ornament
                      key={gift.id}
                      gift={gift}
                      index={index}
                      position={TREE_POSITIONS[index]}
                      onClick={handleOrnamentClick}
                    />
                  ))}
                  {gifts.length > TREE_POSITIONS.length && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      + {gifts.length - TREE_POSITIONS.length} more gifts available (refresh to see)
                    </div>
                  )}
                </div>
              )}
           </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-festive text-2xl mb-2">Thank you for supporting Genesee Hill PTA</p>
          <p className="text-sm opacity-70">Questions? Contact vicepresident2@geneseehillpta.org</p>
        </div>
      </footer>

      {/* Modals */}
      <ClaimModal 
        gift={selectedGift} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onClaim={handleClaim}
      />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white p-6 rounded-xl shadow-2xl z-50 animate-bounce flex items-center space-x-4 max-w-sm">
          <div className="bg-white rounded-full p-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Gift Claimed!</h4>
            <p className="text-sm">Please check your email client to send the confirmation email.</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
