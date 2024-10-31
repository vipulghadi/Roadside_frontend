import NavbarClient from "./NavbarClient";

export function LayoutWithClientNavbar({ children }) {
  return (
    <>
      <NavbarClient />
      <div>{children}</div>
    </>
  );
}
