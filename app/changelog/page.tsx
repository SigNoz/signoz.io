import { fetchChangelogEntries } from '../../utils/strapi';

const Changelog = async () => {
  const changelogEntries = await fetchChangelogEntries();
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-center my-12">Changelog</h1>
      <div className="relative border-l border-gray-200 dark:border-gray-700">
        {changelogEntries.map((entry) => (
          <div key={entry.id} className="mb-10 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#5468ff] rounded-full ring-8 ring-white dark:ring-gray-900"></span>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{entry.attributes.title}</h2>
              <span className="text-sm font-normal text-gray-400 dark:text-gray-500">{new Date(entry.attributes.date).toLocaleDateString()}</span>
            </div>
            <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: entry.attributes.description }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Changelog;
