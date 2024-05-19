import React, { useState } from 'react';
import NavLinks from '../Navbar/NavLinks';
import MegaMenu from './MegaMenu';

const Header: React.FC = () => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);

  console.log("Header: isMegaMenuOpen", isMegaMenuOpen); 

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}> 
      <NavLinks setMegaMenuOpen={setMegaMenuOpen} />
      {isMegaMenuOpen && <MegaMenu open={false} />}
    </div>
  );
};


const MemoizedHeader = React.memo(Header);
export default MemoizedHeader;
