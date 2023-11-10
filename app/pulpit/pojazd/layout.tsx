interface PojazdlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Pojazd",
  description: "Zobacz pojazdy, którymi dysponujesz",
};

export default async function Pracownicy({ children }: PojazdlayoutProps) {

  return <>{children}</>;
}
