import { useState, useEffect } from 'react';
import { getNewsRequest } from "../../utils/api";
import { getAccessToken, getRefreshToken, setAccessToken } from "../../utils/auth";

const TeacherNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNewsRequest(getAccessToken, getRefreshToken, setAccessToken);
        setNewsItems(data);
        setFilteredNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNews(newsItems);
    } else {
      const filtered = newsItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, newsItems]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  };

  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Yangiliklar
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Platformadagi so'nggi yangiliklar va e'lonlar
        </p>
      </header>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Yangiliklar qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base outline-none placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 text-sm">Yuklanmoqda...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredNews.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-gray-500">
            {searchQuery ? 'Hech qanday yangilik topilmadi' : 'Hozircha yangiliklar yo\'q'}
          </p>
        </div>
      )}

      {/* News grid */}
      {!loading && !error && filteredNews.length > 0 && (
        <section className="grid gap-4 md:gap-5 lg:grid-cols-2">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition"
            >
              {item.image && (
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <div className="space-y-1.5">
                  <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-400 pt-2 border-t border-gray-100">
                  <span>📅</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default TeacherNews;
