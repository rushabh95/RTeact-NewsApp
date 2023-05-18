import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        let newDate = new Date(date).toLocaleDateString()

        return (
            <div className="my-3">
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span class="badge rounded-pill text-bg-success">{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "unknown"} on {newDate}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default NewsItem
