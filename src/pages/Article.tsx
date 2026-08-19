import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookACall from '@/components/BookACall';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { articles } from '@/data/articles';
import { siteConfig } from '@/data/content';
import NotFound from '@/pages/NotFound';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  useEffect(() => {
    if (!article) return;

    const title = `${article.title} | Jhoenil Labs`;
    const url = `${siteConfig.url}/insights/${article.slug}`;
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };

    setMeta('meta[name="description"]', article.excerpt);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', article.excerpt);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', article.excerpt);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [article]);

  if (!article) return <NotFound />;

  const Content = article.Content;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <article className="py-12 md:py-20">
          <div className="section-shell max-w-3xl">
            <Link to="/insights" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All insights
            </Link>

            <header className="mt-10 border-b border-border pb-10">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>{article.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </div>
              <h1 className="mt-5 text-4xl font-medium leading-tight md:text-5xl">{article.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
              {article.aiAssisted && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--brand))]" aria-hidden="true" />
                  AI-assisted write-up
                </p>
              )}
            </header>

            <div className="py-10 text-[1.05rem] leading-8 text-foreground/85 [&>h2]:mt-10 [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:leading-tight [&>h2]:text-foreground [&>p]:mt-4 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:marker:text-[hsl(var(--brand))] [&>blockquote]:mt-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[hsl(var(--brand))] [&>blockquote]:bg-secondary/60 [&>blockquote]:px-6 [&>blockquote]:py-5 [&>blockquote]:text-xl [&>blockquote]:leading-8 [&>blockquote]:text-foreground [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm">
              <Content />
            </div>

            <section className="border-t border-border pt-10">
              <h2 className="text-2xl font-medium text-foreground">Useful client reading</h2>
              <ul className="mt-5 space-y-3">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[hsl(var(--brand))] underline underline-offset-4 hover:text-foreground">
                      {source.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 border-2 border-foreground bg-secondary p-6 md:p-8">
              <h2 className="text-2xl font-medium text-foreground">Need an implementation partner who works this way?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                I build web, mobile, and operational systems with clear ownership, visible progress, and a practical handover.
              </p>
              <BookACall className="btn-primary mt-6" />
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
