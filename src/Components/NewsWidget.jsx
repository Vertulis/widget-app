import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard.jsx';
import axios from 'axios';

const NewsWidget = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [cat, setCategory] = useState('top'); // Initial category is empty

    // Fetch news whenever the category changes
    useEffect(() => {
        if (cat) { // Fetch news only when a category is selected
            const fetchNews = async () => {
                try {
                    const response = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_55865a9eb6dc5e440c5eebad4442a1ad83c30&country=za&language=en&size=10&image=1&category=${cat}`);
                    setNews(response.data.results);
                } catch (err) {
                    setError('Failed to fetch news: ' + err.message);
                }
            };
            fetchNews();
        }
    }, [cat]); // useEffect runs when the category changes

    // Handle category button click
    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory.toLowerCase()); // Set category in lowercase to match API parameter
    };

    return (
        <div>
            <h2 className='news-heading'>Agile News</h2>

            <div className='category-container'>
                {['Business', 'Crime', 'Domestic', 'Education', 'Entertainment', 'Environment', 'Food', 'Health', 'Lifestyle', 'Other', 'Politics', 'Science', 'Sports', 'Technology', 'Top', 'Tourism', 'World'].map(category => (
                    <button 
                        onClick={() => handleCategoryClick(category)} // Pass function reference properly
                        className='category-btn' 
                        key={category}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {error && <p style={{backgroundColor: "hsl(219, 80%, 20%)",textAlign: "center"}}>{error}</p>}
            <div className='articles-container'>
                {news.map((article, index) => (
                    <div key={index}>
                        <NewsCard article={article} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsWidget;
