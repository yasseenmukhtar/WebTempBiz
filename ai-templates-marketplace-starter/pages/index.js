import Layout from '../components/Layout';
import TemplateCard from '../components/TemplateCard';

export default function Home({ templates }) {
  return (
    <Layout>
      <h2 className="text-2xl mb-4">Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map(t => <TemplateCard key={t.id} t={t} />)}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/templates');
  const templates = await res.json();
  return { props: { templates } };
}
