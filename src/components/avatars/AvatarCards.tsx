import { getAllAssetUrlsForFolder } from '@apocrypha/core/assets';
import { useEffect, useState } from 'react';
import { randomArrayElement, shuffleArray } from 'src/util';
import { AvatarCard } from './AvatarCard';

const IMAGES = getAllAssetUrlsForFolder('images/avatars');
const NUM_CARDS = 4;
const FACE_CHANGE_DELAY_MS = 500;

type CardState = {
  visibleFace: 'front' | 'back';
  frontUrl: string;
  backUrl: string;
};

export function AvatarCards() {
  const [cards, setCards] = useState<CardState[]>(() => {
    const allUrls = shuffleArray(IMAGES);
    const frontUrls = allUrls.slice(0, NUM_CARDS);
    const backUrls = allUrls.slice(NUM_CARDS, NUM_CARDS * 2);
    return frontUrls.map((url, index) => ({
      visibleFace: 'front',
      frontUrl: url,
      backUrl: backUrls[index],
    }));
  });

  useEffect(() => {
    // Preload images so we avoid a flash when a card flips.
    for (const url of IMAGES) {
      const img = new Image();
      img.src = url;
    }
  }, []);

  const findUnusedImageUrl = (cardStates: CardState[], excludeUrls: string[] = []) => {
    const visibleUrls = cardStates.map((card) =>
      card.visibleFace === 'front' ? card.frontUrl : card.backUrl,
    );
    const allExcluded = [...visibleUrls, ...excludeUrls];
    const availableUrls = IMAGES.filter((url) => !allExcluded.includes(url));
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

    // After the card flip animation has completed, change the URL of the hidden face.
    setTimeout(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const card = { ...newCards[cardIndex] };
        const hiddenFace = card.visibleFace === 'front' ? 'back' : 'front';

        if (hiddenFace === 'front') {
          card.frontUrl = findUnusedImageUrl(newCards, [card.backUrl]);
        } else {
          card.backUrl = findUnusedImageUrl(newCards, [card.frontUrl]);
        }

        newCards[cardIndex] = card;
        return newCards;
      });
    }, FACE_CHANGE_DELAY_MS);
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
