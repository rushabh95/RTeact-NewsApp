import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
          static defaultProps = {
            country: 'in',
            pageSize:10,
            category:'general'
          }
          static propTypes = {
            country: PropTypes.string,
            pageSize:PropTypes.number,
            category:PropTypes.string,
          }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=964f95d968674e65821d2605bb3d2479&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults,loading:false })
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=964f95d968674e65821d2605bb3d2479&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults,loading:false })
    }

     handlePreviousClick=async()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=964f95d968674e65821d2605bb3d2479&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     page:this.state.page -1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        this.setState({page:this.state.page -1})
        this.updateNews()
    }

     handleNextClick=async()=>{
        // if(!(this.state.page +1>Math.ceil(this.state.totalArticles/this.props.pageSize))){

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=964f95d968674e65821d2605bb3d2479&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true})
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     this.setState({
        //         page:this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading:false
        //     })
        // }
        this.setState({page:this.state.page +1})
        this.updateNews()
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">NewsMonkey - Top Headlines</h1>
                {this.state.loading === true?<Spinner/>:""}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.arstechnica.net/wp-content/uploads/2023/05/Apple-accessibility-iPad-iPhone-14-Pro-Max-Home-Screen-760x380.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source = {element.source.name} />
                        </div>
                    })}
                </div>
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" style={{float: "left"}} onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page +1>Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" style={{float: "right"}} onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        )
    }
}

export default News
