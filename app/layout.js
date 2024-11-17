  'use client';
  import '@fortawesome/fontawesome-free/css/all.min.css'; // Include Font Awesome CSS
  import '../styles/globals.css'
  import {NextUIProvider} from "@nextui-org/react";
  import NoSsr from "../components/NoSsr";
  import {ThemeProvider as NextThemesProvider} from "next-themes";
  import {PremiumProvider} from "../components/PrmeiumContext";



  export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body>
            <NoSsr> 
              <PremiumProvider>
                <NextUIProvider>
                  <NextThemesProvider attribute="class" defaultTheme="dark">
                  {/* Layout UI */}
                    {children}
                  </NextThemesProvider> 
                </NextUIProvider>
              </PremiumProvider>
            </NoSsr>
          </body>
        </html>
      )
    }