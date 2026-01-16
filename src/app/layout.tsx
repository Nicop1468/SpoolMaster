import "./globals.css";
import Navbar from "../components/Navbar";

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