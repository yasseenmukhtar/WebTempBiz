import { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function TemplatePage({ template }) {
  const [brand, setBrand] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [loading, setLoading] = useState(false);

  async function handleCustomize() {
    setLoading(true);
    try {
      const resp = await axios.post('/api/ai-customize', {
        templateId: template.id,
        brand,
        primaryColor
      });
      const { downloadUrl } = resp.data;
      window.location.href = downloadUrl;
    } catch (e) {
      alert('Customization failed: ' + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    const r = await axios.post('/api/checkout', { templateId: template.id });
    window.location.href = r.data.checkoutUrl;
  }

  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img src={template.screenshot} alt={template.name} className="w-full h-96 object-cover rounded" />
        </div>
        <div className="bg-white p-4 rounded">
          <h2 className="text-xl font-bold">{template.name}</h2>
          <p className="text-sm text-gray-600">{template.description}</p>
          <p className="mt-2 font-semibold">${template.price}</p>
          <div className="mt-4">
            <button onClick={handleBuy} className="w-full bg-green-600 text-white p-2 rounded">Buy</button>
          </div>
          <hr className="my-4"/>
          <h3 className="font-semibold">AI Customizer (demo)</h3>
          <input placeholder="Brand name" value={brand} onChange={e => setBrand(e.target.value)} className="w-full mt-2 p-2 border rounded" />
          <label className="block mt-2 text-sm">Primary color</label>
          <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-full mt-1 p-1" />
          <button onClick={handleCustomize} disabled={loading} className="w-full mt-3 bg-indigo-600 text-white p-2 rounded">
            {loading ? 'Generating...' : 'Customize & Download (Demo)'}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const res = await fetch(`http://localhost:3000/api/templates?id=${id}`);
  const data = await res.json();
  const template = data[0] ?? null;
  if (!template) return { notFound: true };
  return { props: { template } };
}
