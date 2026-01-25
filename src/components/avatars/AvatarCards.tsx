import { useState } from 'react';
import { randomArrayElement, shuffleArray } from 'src/util';
import { AvatarCard } from './AvatarCard';
import { AvatarFilters, FILTERS } from './AvatarFilters';

const NUM_CARDS = 4;

type CardState = {
  visibleFace: 'front' | 'back';
  frontFilter: number;
  backFilter: number;
};

export function AvatarCards() {
  const [cards, setCards] = useState<CardState[]>(() => {
    const allFilters = shuffleArray([...Array(FILTERS.length).keys()]);
    const frontFilters = allFilters.slice(0, NUM_CARDS);
    const backFilters = allFilters.slice(NUM_CARDS, NUM_CARDS * 2);
    return frontFilters.map((filter, index) => ({
      visibleFace: 'front' as const,
      frontFilter: filter,
      backFilter: backFilters[index],
    }));
  });

  const getVisibleFilters = (cardStates: CardState[]) => {
    return cardStates.map((card) =>
      card.visibleFace === 'front' ? card.frontFilter : card.backFilter,
    );
  };

  const getAvailableFilter = (cardStates: CardState[], excludeFilters: number[] = []) => {
    const visibleFilters = getVisibleFilters(cardStates);
    const allExcluded = [...visibleFilters, ...excludeFilters];
    const availableFilters = [...Array(FILTERS.length).keys()].filter(
      (i) => !allExcluded.includes(i),
    );
    return randomArrayElement(availableFilters);
  };

  const handleFlip = (cardIndex: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const card = { ...newCards[cardIndex] };
      card.visibleFace = card.visibleFace === 'front' ? 'back' : 'front';
      newCards[cardIndex] = card;
      return newCards;
    });

    setTimeout(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const card = { ...newCards[cardIndex] };
        const newVisibleFace = card.visibleFace;
        const hiddenFace = newVisibleFace === 'front' ? 'back' : 'front';

        if (hiddenFace === 'front') {
          card.frontFilter = getAvailableFilter(newCards, [card.backFilter]);
        } else {
          card.backFilter = getAvailableFilter(newCards, [card.frontFilter]);
        }

        newCards[cardIndex] = card;
        return newCards;
      });
    }, 500);
  };

  const items = cards.map((cardState, index) => (
    <AvatarCard
      key={index}
      position={index + 1}
      visibleFace={cardState.visibleFace}
      frontFilter={cardState.frontFilter}
      backFilter={cardState.backFilter}
      onFlip={() => handleFlip(index)}
    />
  ));

  return (
    <div className="flex flex-row space-x-4 mb-8">
      <AvatarFilters />
      {items}
    </div>
  );
}
