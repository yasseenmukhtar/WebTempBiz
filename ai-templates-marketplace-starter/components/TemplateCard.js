export default function TemplateCard({ t }) {
  return (
    <div className="border rounded p-4 bg-white">
      <img className="w-full h-48 object-cover mb-3" src={t.screenshot} alt={t.name} />
      <h3 className="font-semibold">{t.name}</h3>
      <p className="text-sm text-gray-600">{t.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <strong>${t.price}</strong>
        <a className="inline-block px-3 py-1 bg-indigo-600 text-white rounded" href={`/templates/${t.id}`}>View</a>
      </div>
    </div>
  );
}
