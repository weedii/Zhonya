import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ThemeProviders from "../themeProvider";
import ReduxProviderLayout from "../components/ReduxProviderLayout";
import CustomToaster from "../components/common/CustomToaster";
import SideBar from "../components/adminComponents/SideBar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
            <div className="w-full min-h-screen flex">
              {/* side bar */}
              <SideBar />
              <main className="flex-1 overflow-auto md:ml-72">
                <NuqsAdapter>{children}</NuqsAdapter>
              </main>
            </div>

            {/* toaster */}
            <CustomToaster />
          </ReduxProviderLayout>
        </ThemeProviders>
      </body>
    </html>
  );
}
