import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ThemeProviders from "../themeProvider";
import ReduxProviderLayout from "../components/ReduxProviderLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomToaster from "../components/common/CustomToaster";
import { NuqsAdapter } from "nuqs/adapters/next";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zhonya",
  description: "The best place to get your watches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviders>
          <ReduxProviderLayout>
            <Header />
            <NuqsAdapter>{children}</NuqsAdapter>
            <Footer />

            {/* toaster */}
            <CustomToaster />
          </ReduxProviderLayout>
        </ThemeProviders>
      </body>
    </html>
  );
}
