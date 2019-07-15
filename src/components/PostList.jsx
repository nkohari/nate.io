import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import '../css/post-list.styl';

export const PostList = props => {
  const items = props.posts
    .filter(post => post.path !== '/404/')
    .map(post => {
      const { slug } = post.fields;
      const { title, subtitle, date } = post.frontmatter;
      const time = moment(date);
      return (
        <li key={slug}>
          <Link to={slug} className="post">
            <time className="post-date" dateTime={time.toISOString()}>
              <span className="post-date-day">{time.format('Do')}</span>
              <span className="post-date-month">{time.format('MMM YYYY')}</span>
            </time>
            <div className="post-summary">
              <h1>{title}</h1>
              {subtitle && <h2>{subtitle}</h2>}
            </div>
          </Link>
        </li>
      );
    });

  return <ul className="post-list">{items}</ul>;
};
