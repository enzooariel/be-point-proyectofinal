import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary-dark to-black h-[600px]">
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">
            Descubre el mundo de la 
            <span className="text-primary"> danza urbana</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Encuentra los mejores eventos, batallas y workshops de danza en un solo lugar
          </p>
          <button className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-md transition-colors flex items-center space-x-2">
            <span>Explorar Eventos</span>
            <ArrowRight className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;