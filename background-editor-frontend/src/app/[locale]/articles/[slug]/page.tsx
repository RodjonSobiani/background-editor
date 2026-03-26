import { ArticlesPageContent } from '@page-content/articles-page';

export default async function ArticlesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlesPageContent slug={slug} />;
}
