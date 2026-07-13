import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ArrowLeft } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-brand-yellow font-bold mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query ? (
          <p className="text-lg mb-4">Showing results for: <span className="font-bold text-brand-yellow">"{query}"</span></p>
        ) : (
          <p>Please enter a search term.</p>
        )}
        <p className="text-gray-500">Search functionality coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};
export default SearchPage;
