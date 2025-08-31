import Layout from '../../components/Layout';
export default function Upload() {
  return (
    <Layout>
      <h2 className="text-xl">Admin — Upload Template (dev)</h2>
      <p className="text-sm text-gray-600">For now, drop template zips into <code>/public/templates</code>.</p>
      <div className="mt-4">
        <p className="text-sm">This page is a placeholder for an admin UI to upload zips & screenshots.</p>
      </div>
    </Layout>
  );
}
