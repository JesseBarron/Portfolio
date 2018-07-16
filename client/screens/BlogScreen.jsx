import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    BlogListItem
} from '../components'
import {
	fetchAllBlogs
} from '../store'
import './styles/_BlogScreen.scss'
import sketch from '../P5/blogBackground'
import P5Wrapper from 'react-p5-wrapper'

class BlogScreen extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.getAllPosts()
	}
	render() {
		const { blogs } = this.props
		return (
			<div>
				<h1>this is the Blog</h1>
				<section>
					<h2>There should be a carousel here</h2>
				</section>
				<section style={{position: 'relative', overflow: 'hidden'}} >
					<div>This is gonna be the sort and search section for the uhh list</div>
					<h2>This is going to be the blog list section</h2>
					<div style={{position: 'absolute', zIndex: -1}}>
						{/* <P5Wrapper sketch={sketch} /> */}
					</div>
					<div className="blog-list">
						{
							blogs.map((post, i) => <BlogListItem key={i} post={ post } />)
						}
					</div>
				</section>
			</div>
		)
	}
}

const mapState = ({ BlogPosts }) => ({
	blogs: BlogPosts.blogs
})

const mapDispatch = dispatch => ({
	async getAllPosts() {
		return await dispatch(fetchAllBlogs())
	}
})

export default connect(mapState, mapDispatch)(BlogScreen)