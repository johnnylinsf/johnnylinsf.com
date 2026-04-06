import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundSuggestions from "@/components/NotFoundSuggestions";

export default function NotFound() {
  return (
    <>
      <Script
        id="dark-mode-404"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var m=localStorage.getItem('theme');if(m==='dark'||(!m&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
        }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <p className="text-sm text-muted mb-1">404</p>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground mb-2">
            Page not found
          </h1>
          <p className="text-sm text-muted mb-8">
            This page might have been moved or you followed a broken link.
          </p>

          <NotFoundSuggestions />

          <div className="flex gap-3 mt-8">
            <Link
              href="/"
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Go home
            </Link>
            <Link
              href="/writing"
              className="rounded-md border border-muted/40 px-4 py-2 text-sm font-medium text-foreground hover:border-foreground/50 hover:bg-card transition-colors"
            >
              Read my writing
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
