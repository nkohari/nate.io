import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import './RelatedPosts.styl';

export const RelatedPosts = props => {
  const items = props.posts
    .filter(post => post.path !== '/404/')
    .map(post => {
      const { slug } = post.fields;
      const title = post.frontmatter.title || slug;
      const date = moment(post.frontmatter.date);
      return (
        <li key={slug}>
          <Link to={slug} className="post">
            <time className="post-date" dateTime={date.toISOString()}>
              {date.format('MMMM DD, YYYY')}
            </time>
            <span className="post-title">{title}</span>
          </Link>
        </li>
      );
    });

  return (
    <div className="related-posts">
      <header className="header">You may also like</header>
      <ul>{items}</ul>
    </div>
  );
};
