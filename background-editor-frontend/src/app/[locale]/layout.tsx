import { ReactNode } from 'react';
import { Metadata } from 'next';
import Footer from '@widgets/layout/footer';
import Header from '@widgets/layout/header';
import Head from 'next/head';
import localFont from 'next/font/local';
import '../globals.css';
import Providers from '@app/providers';
import { MessageProvider } from '@shared/providers/server/message-provider';
import { cookies } from 'next/headers';
import { ECookieValues } from '@shared/utils/enums';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const furore = localFont({ src: '../../../public/fonts/Furore/Furore.otf', variable: '--font-furore' });
const golosText = localFont({
  src: '../../../public/fonts/Golos_Text/GolosText-VariableFont_wght.ttf',
  variable: '--font-golos'
});

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const token = (await cookies()).get(ECookieValues.ACCESS_TOKEN)?.value;
  const initialAuthState = Boolean(token);

  return (
    <html lang="en" className={`${furore.variable} ${golosText.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <MessageProvider>
          <Providers initialAuthState={initialAuthState}>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </MessageProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = { title: { absolute: '', default: 'Test', template: `Test | %s` } };
