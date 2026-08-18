import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jesus-monsalve.com"),
  title: "Jesus Monsalve | Video Editor, Graphic Designer & UI/UX Web Developer",
  description:
    "Professional portfolio of Jesus Monsalve — 7+ years of experience in video editing, graphic design, motion graphics, and UI/UX web development. Available for freelance and remote work worldwide.",
  keywords:
    "video editor, graphic designer, UI UX designer, web developer, motion graphics, freelancer, bilingual, remote, premiere pro, after effects, figma",
  authors: [{ name: "Jesus Monsalve", url: "https://www.jesus-monsalve.com" }],
  creator: "Jesus Monsalve",
  publisher: "Nexocode Studio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Jesus Monsalve | Video Editor & UI/UX Developer",
    description: "7+ years turning ideas into scroll-stopping content. Video, design, and web development.",
    url: "https://www.jesus-monsalve.com",
    siteName: "Jesus Monsalve Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Monsalve | Video Editor & UI/UX Developer",
    description: "7+ years turning ideas into scroll-stopping content. Video, design, and web development.",
    creator: "@jesusmonsalve",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesus Monsalve",
  jobTitle: ["Video Editor", "Graphic Designer", "UI/UX Developer"],
  url: "https://www.jesus-monsalve.com",
  sameAs: [
    "https://instagram.com/",
    "https://linkedin.com/"
  ],
  description: "Professional portfolio of Jesus Monsalve — 7+ years of experience in video editing, graphic design, motion graphics, and UI/UX web development.",
  worksFor: {
    "@type": "Organization",
    name: "Freelance"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
