import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "@/styles/global.css";
import "@/styles/reset.css";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="container">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
