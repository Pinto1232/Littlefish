import React, { useState } from 'react';
import NavLinks from '../Navbar/NavLinks';
import MegaMenu from './MegaMenu';

const Header: React.FC = () => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);

  console.log("Header: isMegaMenuOpen", isMegaMenuOpen); // Debugging log

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}> {/* Ensure high z-index */}
      <NavLinks setMegaMenuOpen={setMegaMenuOpen} />
      {isMegaMenuOpen && <MegaMenu />}
    </div>
  );
};

export default Header;