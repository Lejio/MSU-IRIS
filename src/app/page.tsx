import React from 'react';
import HeroSection from './components/main/HeroSection';
import SignInModal from './components/main/SignInModal';

export default function Home() {
  return (
    <main>
      <div className=' flex flex-row justify-center align-middle items-center'>
        <SignInModal />
        <HeroSection />
      </div>
    </main>
  );
}
