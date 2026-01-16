import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = { title: "SpoolMaster", description: "Gestion de filaments" };
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#F8FAFC]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}