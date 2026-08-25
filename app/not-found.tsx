import Link from 'next/link';
import type { Metadata } from 'next';
import { RetroTvError } from '@/components/ui/404-error-page';
import { ContainerWrapper } from '@/components/site/container';
import { Footer } from './Footer';
import { Home, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found | SNAB Innovations',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <section className="flex-1 flex flex-col justify-center">
        <ContainerWrapper>
          <div className="flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20 text-center">
            {/* Retro TV 404 graphic */}
            <div className="w-full flex items-center justify-center overflow-hidden py-4">
              <div className="scale-[0.7] xs:scale-[0.8] sm:scale-90 md:scale-100 origin-center transition-transform duration-300">
                <RetroTvError errorCode="404" errorMessage="NOT FOUND" />
              </div>
            </div>

            {/* Message Content */}
            <div className="mt-4 max-w-lg space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans">
                Page Not Found
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                The page you are looking for doesn&apos;t exist or has been moved.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
              >
                <Home className="h-4 w-4" />
                <span>Return Home</span>
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-card/80 active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Technical Diagnostics */}
            <div className="mt-10 text-xs font-mono text-muted-foreground/60">
              HTTP 404 · RESOURCE_NOT_FOUND
            </div>
          </div>
        </ContainerWrapper>
      </section>

      <Footer />
    </main>
  );
}
