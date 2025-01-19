import { getAllAssetUrlsForFolder } from '@apocrypha/core/assets';
import { AnimatePresence, motion } from 'motion/react';
import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { shuffleArray } from 'src/util';

const tileVariants = {
  hidden: {
    opacity: 0,
    rotate: -15,
    skew: -45,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    skew: 0,
    transition: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5 },
  },
};

const imageVariants = {
  visible: {
    scale: 1,
  },
  hover: () => ({
    scale: 1.3,
    transition: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5 },
  }),
};

const backdropVariants = {
  hidden: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  visible: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

type ArtTileProps = {
  image: string;
  isSelected: boolean;
  onClick: () => void;
};

function ArtTile({ image, isSelected, onClick }: ArtTileProps) {
  return (
    <motion.button
      variants={tileVariants}
      className="hover:z-10 w-1/2 md:w-1/4 p-1 cursor-pointer"
      onClick={onClick}
    >
      <motion.img
        className="rounded-md shadow-md"
        src={image}
        variants={imageVariants}
        initial={false}
        animate="visible"
        whileHover={isSelected ? 'visible' : 'hover'}
        layout
        layoutId={image}
      />
    </motion.button>
  );
}

export function ArtGrid() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const images = useMemo(() => shuffleArray(getAllAssetUrlsForFolder('images/art')), []);

  const tiles = images.map((image) => (
    <ArtTile
      key={image}
      image={image}
      isSelected={image === selectedImage}
      onClick={() => setSelectedImage(image)}
    />
  ));

  let overlay: React.ReactNode;
  if (selectedImage) {
    overlay = (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        className="z-50 fixed top-0 left-0 right-0 bottom-0 cursor-pointer"
        onClick={() => setSelectedImage(undefined)}
      >
        <motion.img
          className="w-auto h-auto max-w-[90vw] max-h-[90vh] my-12 mx-auto rounded-2xl"
          src={selectedImage}
          layout
          layoutId={selectedImage}
        />
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="mt-6 flex flex-row flex-wrap"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.075 }}
      >
        {tiles}
      </motion.div>
      {createPortal(<AnimatePresence>{overlay}</AnimatePresence>, document.body)}
    </>
  );
}
