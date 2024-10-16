
function NewsCard({article}){

    return(
        <a className="article-card" href={article.link} target="_blank" rel="noopener noreferrer">
            <img className="article-image" src={article.image_url}/>
            <div style={{padding: '0px 5px 10px 5px'}}>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <p className="article-published">{article.pubDate}</p>     
            </div>
        </a>
    )
}

export default NewsCard