import { Inter } from "next/font/google";
// import { Providers } from '@/components/providers';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Import Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "CeramicPro - Your Ultimate Guide to Ceramic Coating",
    template: "%s | CeramicPro",
  },
  description:
    "Expert advice, step-by-step guides, and professional tips to help you protect your vehicle with ceramic coating technology.",
  keywords:
    "ceramic coating, car protection, paint protection, ceramic pro, auto detailing, car care",
  authors: [{ name: "CeramicPro Team" }],
  creator: "CeramicPro",
  publisher: "CeramicPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}
