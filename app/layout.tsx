import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

import localFont from "next/font/local";

const caveat = localFont({
  src: "../public/fonts/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  display: "swap",
});

const intro = localFont({
  src: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-intro",
  display: "swap",
});


const jura = localFont({
  src: "../public/fonts/Jura-VariableFont_wght.ttf",
  variable: "--font-jura",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yeva course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`
          ${caveat.variable}
          ${intro.variable}
          ${jura.variable}
          antialiased
          `}
        >
        {children}

        {/* Meta Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2699363500423395');
              fbq('track', 'PageView');
            `,
          }}
        />

      </body>
    </html>
  );
}
