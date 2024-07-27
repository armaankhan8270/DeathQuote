import "../app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import { UserProvider } from "./context/userContext";
import { ThemeProvider } from "./context/themecontect";
import { BookProvider } from "./context/BookContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Death Note",
  description: "Share and discover inspiring book quotes",
  keywords: "books, quotes, literature, reading",
  icons: {
    icon: "/favicon.ico", // Link to your favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <ThemeProvider>
          <UserProvider>
            <BookProvider>
              <Navbar />
              <main className="flex-grow container mx-auto ">{children}</main>
              <Footer />
            </BookProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
