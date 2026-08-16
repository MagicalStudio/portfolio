import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-rhrcs3xtj-maumau1211s-projects.vercel.app"),
  title: "Juan Guevara | Video Editor, Graphic Designer & UI/UX Web Developer",
  description:
    "Professional portfolio of Juan Guevara — 7+ years of experience in video editing, graphic design, motion graphics, and UI/UX web development. Available for freelance and remote work worldwide.",
  keywords:
    "video editor, graphic designer, UI UX designer, web developer, motion graphics, freelancer, bilingual, remote, premiere pro, after effects, figma",
  authors: [{ name: "Juan Guevara", url: "https://portfolio-rhrcs3xtj-maumau1211s-projects.vercel.app" }],
  creator: "Juan Guevara",
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
    title: "Juan Guevara | Video Editor & UI/UX Developer",
    description: "7+ years turning ideas into scroll-stopping content. Video, design, and web development.",
    url: "https://portfolio-rhrcs3xtj-maumau1211s-projects.vercel.app",
    siteName: "Juan Guevara Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Guevara | Video Editor & UI/UX Developer",
    description: "7+ years turning ideas into scroll-stopping content. Video, design, and web development.",
    creator: "@juanguevara",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan Guevara",
  jobTitle: ["Video Editor", "Graphic Designer", "UI/UX Developer"],
  url: "https://portfolio-rhrcs3xtj-maumau1211s-projects.vercel.app",
  sameAs: [
    "https://instagram.com/",
    "https://linkedin.com/"
  ],
  description: "Professional portfolio of Juan Guevara — 7+ years of experience in video editing, graphic design, motion graphics, and UI/UX web development.",
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
