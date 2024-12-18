import { useState } from "react";
import { LogOut } from "lucide-react";
import { closeSession } from "../../firebase";
import { HeaderBar, HeaderTitle, HeaderUser, IconButton } from "./style";

type HeaderProps = {
  displayName?: string | null;
};

const Header = ({ displayName }: HeaderProps) => {
  const [signingOut, setSigningOut] = useState(false);

  async function handleLogout() {
    setSigningOut(true);
    try {
      await closeSession();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <HeaderBar>
      <HeaderTitle>Lista de tareas</HeaderTitle>
      {displayName && <HeaderUser>Hola, {displayName}</HeaderUser>}
      <IconButton
        type="button"
        onClick={handleLogout}
        disabled={signingOut}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <LogOut size={18} />
      </IconButton>
    </HeaderBar>
  );
};

export default Header;
