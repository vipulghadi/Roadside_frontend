import NavbarClient from "./NavbarClient";

export function LayoutWithClientNavbar({ children }) {
    return (
      <div>
        <NavbarClient />
        {children}
      </div>
    );
  }
  