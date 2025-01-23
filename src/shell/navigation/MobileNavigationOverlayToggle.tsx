import { useState } from 'react';
import { Icon } from 'src/components';
import { MobileNavigationOverlay } from 'src/shell';

export function MobileNavigationOverlayToggle() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlayVisible = () => setOverlayVisible((value) => !value);

  return (
    <>
      <button
        type="button"
        className="flex md:hidden items-center w-5"
        onClick={toggleOverlayVisible}
      >
        <Icon type="menu" />
      </button>
      {overlayVisible && <MobileNavigationOverlay onClose={toggleOverlayVisible} />}
    </>
  );
}
