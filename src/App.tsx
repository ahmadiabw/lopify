import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#0b1121] text-white select-none">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}


