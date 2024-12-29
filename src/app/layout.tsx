"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FaviconUpdater from "@/components/faviconUpdater";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Entry Data Website</title>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AppRouterCacheProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ToastContainer />
              {children}
            </PersistGate>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
