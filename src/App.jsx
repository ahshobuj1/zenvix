import React, {useState, useEffect} from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  // Fetch paginated data from API
  const fetchData = async (page) => {
    if (loading) return; // Prevent making multiple requests at the same time

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `https://dummyjson.com/products?page=${page}&limit=${itemsPerPage}`,
      );
      const result = await response.json();

      setData((prevData) => [...prevData, ...result?.products]); // Append the new data to the current list

      // Check if there are more pages to load
      if (result.data.length < itemsPerPage) {
        setHasMore(false); // No more data to fetch
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch on page load and when the page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Load more items when the user reaches the bottom of the list
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  console.log();

  return (
    <div>
      <h1>Paginated Data</h1>
      <div>
        {data.map((item) => (
          <div key={item?.id}>
            <p> {item?.title}</p>
            <img src={item?.thumbnail} alt="products" />
          </div> // Assuming each item has a 'name' field
        ))}
      </div>

      {loading && <div>Loading...</div>}

      {!loading && hasMore && (
        <button onClick={handleLoadMore}>Load More</button>
      )}

      {!hasMore && <div>No more data to load</div>}
    </div>
  );
};

export default App;
