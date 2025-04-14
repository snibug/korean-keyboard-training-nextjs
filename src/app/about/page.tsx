import React from 'react';

export default function AboutPage() {
  return (
    <section className="py-12 px-4 bg-gray-50"> {/* Light background for the section */}
      <div className="max-w-4xl mx-auto text-center"> {/* Centering, max-width, and center text */}

        {/* Main Headline */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Unlock Fluent Korean Typing: Designed for English Speakers
        </h1>

        {/* Sub-headline or Short Description */}
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Feeling stuck with Korean typing? Korean Keyboard Training is specifically designed for English speakers learning to type in Hangeul efficiently and easily! Our app provides an accessible way to practice your Korean typing skills. Learn complex vowels and consonants, type real words with instant feedback and timing, and understand everything with built-in English translations.
        </p>

        {/* Key Features Section */}
        <div className="mb-12 text-left"> {/* Align feature text to the left */}
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-700">Why Choose Our App?</h2> {/* Centered title */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid layout */}

            {/* Feature 1: Interactive Keyboard */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Interactive Hangeul Keyboard</h3>
              <p className="text-gray-700">Master Hangeul's unique character composition principles with our intuitive keyboard designed specifically for learners.</p>
            </div>

            {/* Feature 2: Word Typing Practice */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Real Word Practice</h3>
              <p className="text-gray-700">Type various Korean words and get immediate feedback on your accuracy and speed. Practice makes perfect!</p>
            </div>

            {/* Feature 3: Built-in English Translations */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Learn While You Type</h3>
              <p className="text-gray-700">Understand the meaning of every word you practice with built-in English translations, boosting your vocabulary simultaneously!</p>
            </div>

            {/* Feature 4: Track Your Progress & Rank Up */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Track Progress & Rank Up</h3>
              <p className="text-gray-700">Set personal bests, compare your scores with others on the leaderboard, and stay motivated on your learning journey!</p>
            </div>

            {/* Feature 5: Clean & Intuitive Design */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Clean & Intuitive Design</h3>
              <p className="text-gray-700">Focus on learning with clear visual feedback (correct/incorrect color coding) and a user-friendly interface optimized for practice.</p>
            </div>

            {/* Feature 6: Ad-Free Option */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Ad-Free Option Available</h3>
              <p className="text-gray-700">Subscribe for an uninterrupted, focused learning experience without any distractions.</p>
            </div>
          </div>
        </div>

        {/* User Journey / Encouragement Section (Optional but recommended) */}
        <div className="my-12 p-8 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Start Your Korean Typing Journey Today!</h2>
          <p className="text-lg text-gray-700 mb-6">
            From understanding the basics of Hangeul composition to typing complex sentences, our app guides you step-by-step. Improve your speed, accuracy, and confidence. Clear English instructions and interface elements make learning enjoyable and effective.
          </p>
        </div>


        {/* Call to Action Button */}
        <button className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
          Start Practicing Now!
        </button>

      </div>
    </section>
  );
};
