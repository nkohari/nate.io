import { getAllAssetUrlsForFolder } from '@apocrypha/core/assets';
import { useState } from 'react';
import { randomArrayElement, shuffleArray } from 'src/util';
import { AvatarCard } from './AvatarCard';

const NUM_CARDS = 4;

type CardState = {
  visibleFace: 'front' | 'back';
  frontUrl: string;
  backUrl: string;
};

export function AvatarCards() {
  const [cards, setCards] = useState<CardState[]>(() => {
    const allUrls = shuffleArray(getAllAssetUrlsForFolder('images/avatars'));
    const frontUrls = allUrls.slice(0, NUM_CARDS);
    const backUrls = allUrls.slice(NUM_CARDS, NUM_CARDS * 2);
    return frontUrls.map((url, i) => ({
      visibleFace: 'front',
      frontUrl: url,
      backUrl: backUrls[i],
    }));
  });

  const getVisibleUrls = (cardStates: CardState[]) => {
    return cardStates.map((card) => (card.visibleFace === 'front' ? card.frontUrl : card.backUrl));
  };

  const getAvailableUrl = (cardStates: CardState[], excludeUrls: string[] = []) => {
    const visibleUrls = getVisibleUrls(cardStates);
    const allExcluded = [...visibleUrls, ...excludeUrls];
    const availableUrls = getAllAssetUrlsForFolder('images/avatars').filter(
      (url) => !allExcluded.includes(url),
    );
    return randomArrayElement(availableUrls);
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
          card.frontUrl = getAvailableUrl(newCards, [card.backUrl]);
        } else {
          card.backUrl = getAvailableUrl(newCards, [card.frontUrl]);
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
      frontUrl={cardState.frontUrl}
      backUrl={cardState.backUrl}
      onFlip={() => handleFlip(index)}
    />
  ));

  return <div className="flex flex-row gap-4 mb-8">{items}</div>;
}
