import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/data/content';
import { articles } from '@/data/articles';

const Insights = () => {
  useEffect(() => {
    const title = 'Insights — Jhoenil Labs';
    const description = 'Practical notes on running clear, secure, and maintainable software projects.';
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', `${siteConfig.url}/insights`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${siteConfig.url}/insights`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="section-shell max-w-4xl">
            <span className="eyebrow">Insights</span>
            <h1 className="mt-4 text-4xl font-medium md:text-5xl">Notes for clearer software projects.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Practical guidance for owners and operators who want their technology work to stay visible, secure, and maintainable.
            </p>

            <div className="mt-12 space-y-5">
              {articles.map((article) => (
                <Link key={article.slug} to={`/insights/${article.slug}`} className="edge-card group block p-6 md:p-8">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h2 className="mt-3 flex items-start justify-between gap-4 text-2xl font-medium md:text-3xl">
                    {article.title}
                    <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[hsl(var(--brand))]" aria-hidden="true" />
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
