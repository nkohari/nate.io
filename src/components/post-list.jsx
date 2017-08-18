import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import '../css/post-list.styl';

class PostList extends React.Component {

  render() {
    const { posts } = this.props;

    const items = posts.filter(post => post.node.path !== '/404/').map(post => {
      const { slug } = post.node.fields;
      const { frontmatter } = post.node;
      const title = frontmatter.title || slug;
      const subtitle = frontmatter.subtitle;
      const date = moment(frontmatter.date);
      return (
        <li key={slug}>
          <Link to={slug} className='post'>
            <time className='post-date' dateTime={date.toISOString()}>
              <span className='post-date-day'>{date.format('Do')}</span>
              <span className='post-date-month'>{date.format('MMM YYYY')}</span>
            </time>
            <div className='post-summary'>
              <h1>{title}</h1>
              {subtitle && <h2>{subtitle}</h2>}
            </div>
          </Link>
        </li>
      );
    });

    return <ul className='post-list'>{items}</ul>;
  }

}

export default PostList;
