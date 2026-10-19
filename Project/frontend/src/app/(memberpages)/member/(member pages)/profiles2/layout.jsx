export const metadata = {
  title: 'Respondent profile · Turn2Opinion',
  description:
    'Build your Turn2Opinion respondent profile in your own language — 135 languages, 50 interactive profiles, better-matched surveys.',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Turn2Opinion · Build your profile in your language',
    description: '135 languages · 50 interactive profiles · better-matched surveys.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function Layout({ children }) {
  return children;
}
