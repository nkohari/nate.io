import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import '../css/related-posts.styl';

class RelatedPosts extends React.Component {

  render() {
    console.log(this.props);
    const { posts } = this.props;

    const items = posts.filter(post => post.path !== '/404/').map(post => {
      const { slug } = post.fields;
      const title = post.frontmatter.title || slug;
      const subtitle = post.frontmatter.subtitle;
      const date = moment(post.frontmatter.date);
      return (
        <li key={slug}>
          <Link to={slug} className='post'>
            <time className='post-date' dateTime={date.toISOString()}>
              {date.format('MMMM DD, YYYY')}
            </time>
            <span className='post-title'>{title}</span>
          </Link>
        </li>
      );
    });

    return (
      <ul className='related-posts'>
        <header className='header'>
          You might also like
        </header>
        {items}
      </ul>
    );
  }

}

export default RelatedPosts;
