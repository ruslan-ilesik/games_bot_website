'use client';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Include Font Awesome CSS
import '../styles/globals.css'
import NoSsr from "../components/NoSsr";

import { UserDataProvider } from "../components/UserDataProvider";
import Metadata from '../components/Metadata';
import PrivacyPopup from '../components/PrivacyPopup';
import AgainstPutinPopup from '../components/AgainstPutinPopup';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NoSsr>
        <Metadata />
        <body>
          <AgainstPutinPopup>
            <PrivacyPopup />
            <UserDataProvider>
              {children}
            </UserDataProvider>
          </AgainstPutinPopup>
        </body>
      </NoSsr>
    </html>
  );
}
