import React from 'react';
import { useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Link from 'gatsby-link';
import { debounce } from 'lodash';
import './Nav.styl';

export const Nav = props => {
  const [progress, setProgress] = useState({ visible: false, percent: 0 });

  if (typeof window !== 'undefined') {
    const handleScroll = debounce(() => {
      const pos = document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress({
        visible: pos > 300,
        percent: (pos / max) * 100,
      });
    }, 10);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  }

  let content;
  if (progress.visible) {
    content = (
      <nav className="nav">
        <div className="nav-content">
          <Link to="/" className="logo">
            D<span className="amp">&</span>R
          </Link>
          <div className="article-title">{props.article.frontmatter.title}</div>
        </div>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progress.percent}%` }} />
        </div>
      </nav>
    );
  }

  return (
    <ReactCSSTransitionGroup transitionName="nav" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
      {content}
    </ReactCSSTransitionGroup>
  );
};
