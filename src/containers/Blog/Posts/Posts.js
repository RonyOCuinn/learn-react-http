import React, {Component} from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from "../FullPost/FullPost";

class Posts extends Component {

    state = {
        posts: []
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id})
    }



    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Ronan'
                    }
                })
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true });
            });
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>SOmething went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        {...this.props}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;