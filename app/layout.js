  'use client';
  import '@fortawesome/fontawesome-free/css/all.min.css'; // Include Font Awesome CSS
  import '../styles/globals.css'
  import {NextUIProvider} from "@nextui-org/react";
  import NoSsr from "../components/NoSsr";
  import {ThemeProvider as NextThemesProvider} from "next-themes";
  import {PremiumProvider} from "../components/PremiumContext";
  import {UserDataProvider} from "../components/UserDataProvider";
  import Metadata from '../components/Metadata';
  import PrivacyPopup from '../components/PrivacyPopup';

  export default function RootLayout({ children }) {
      return (
          <html lang="en">
            <NoSsr> 
              <Metadata/>
              <body>
                <PrivacyPopup/>
                  <UserDataProvider>
                    <PremiumProvider>
                      <NextUIProvider>
                        <NextThemesProvider attribute="class" defaultTheme="dark">
                        {/* Layout UI */}
                          {children}
                        </NextThemesProvider> 
                      </NextUIProvider>
                    </PremiumProvider>
                  </UserDataProvider>
              </body>
            </NoSsr>
          </html>
      )
    }   