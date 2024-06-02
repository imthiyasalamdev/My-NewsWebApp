import React, { useEffect, useState } from 'react'; // Import React and necessary hooks from 'react'
import axios from 'axios'; // Import Axios for making HTTP requests

const NewsList = () => {
  const [articles, setArticles] = useState([]); // State to hold news articles
  const [error, setError] = useState(''); // State to handle errors
  const [loading, setLoading] = useState(true); // State to track loading status
  const [query, setQuery] = useState(''); // State to hold search query
  const [category, setCategory] = useState(''); // State to hold selected category

  // Effect hook to fetch news based on query and category
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'in',
            apiKey: 'db0c89fbc7784902bc5964c83f1c3dd8', //  actual API key
            q: query, // Search query parameter
            category: category, // Category parameter
          },
        });
        setArticles(response.data.articles); // Set fetched articles in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError('Failed to fetch news headlines. Please try again later.'); // Handle fetch errors
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchNews(); // Call the fetchNews function when query or category changes
  }, [query, category]); // Depend on query and category changes to re-fetch news

  // Event handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    setQuery(e.target.elements.search.value); // Set query based on input value
  };

  // Event handler for category selection change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Set category based on selected option value
  };

  // Render the component based on loading and error states
  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message if there's an error
  }

  // Return JSX for rendering news list and search/filter options
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search news..."
          className="p-2 border rounded w-full"
        />
      </form>
      <div className="mb-4">
        <label className="mr-2">Category:</label>
        <select onChange={handleCategoryChange} className="p-2 border rounded">
          <option value="">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      {loading ? ( // Display loading indicator while data is being fetched
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading news...</p>
        </div>
      ) : (
        <> {/* Fragment shorthand for rendering multiple elements */}
          <h2 className="text-2xl font-bold mb-4">Latest Headlines</h2>
          <ul className="space-y-4">
            {articles.slice(0, 5).map((article, index) => (
              <li key={index} className="bg-white p-4 rounded shadow flex">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-32 h-32 object-cover mr-4"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                  <p className="text-gray-500">{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NewsList; // Export the NewsList component
