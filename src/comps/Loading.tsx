import { useEffect, useState } from 'react';

const Loading = () => {
  const loadingText = [
    'Slaying Dragons...',
    'Planting Magical Forests...',
    "Building the King's Castle...",
    'Giving a Frog Wings...',
    "Sowing the Princess's Dress...",
    'Filling Pond Full of Magic...',
    'Teaching a Fish to Speak...',
    'Taming Wild Griffins...',
    'Baking Enchanted Cookies...',
    'Wandering through Pixie Glades...',
    'Waking Sleeping Giants...',
    'Brewing Potions of Laughter...',
    'Tickling Baby Dragons...',
    'Summoning Starlight Spirits...',
    'Melting Icy Caves...',
    'Painting Rainbows in the Sky...',
    'Whispering to Whales...',
    'Chasing Shooting Stars...',
    'Building Sandcastles on Clouds...',
    'Wishing on Magic Mirrors...',
    'Flying on Broomsticks...',
    'Crafting Wings for Butterflies...',
    'Exploring Ancient Treasure Maps...',
    'Weaving Dreams for the Sandman...',
    'Playing Hide-and-Seek with Fairies...',
    'Sailing on Pirate Ships to Distant Lands...',
    'Frolicking with Mermaids in Ocean Waves...',
    'Discovering Secret Elf Hideouts...',
    'Balancing on Tightropes in the Circus of Wonders...',
    'Solving Riddles with Talking Owls...',
    'Hosting Tea Parties with Mad Hatters...',
    'Sprinkling Stardust on Rainbow Bridges...',
    'Dancing with Fireflies in the Moonlight...',
    'Carving Pumpkin Lanterns for Halloween...',
    'Singing with Joyful Forest Creatures...',
    'Sculpting Snow Castles in Winter Wonderlands...',
    'Searching for Hidden Treasures in Haunted Mansions...',
    'Greeting Aliens from Outer Space...',
    'Teaching Cats to Play the Piano...',
    'Hatching Phoenix Eggs...',
    'Riding Magic Carpets Across the Sky...',
    'Diving with Dolphins in Atlantis...',
    'Blowing Bubbles that Never Pop...',
    'Unraveling Ancient Scroll Secrets...',
    'Uniting Magical Beings for a Grand Feast...',
    'Collecting Moonbeams in Crystal Jars...',
  ];
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingIndex((prevIndex) => Math.floor(Math.random() * loadingText.length));
    }, 2000);
    return () => {
      clearInterval(loadingInterval);
    };
  }, [loadingText.length]);

  return (
    <section className="loading__container">
      <img className="loading__icon" src="src/assets/Spinner.gif" alt="Pages Turning Animation" />
      <div className="loading__text">{loadingText[loadingIndex]}</div>
    </section>
  );
};

export default Loading;
