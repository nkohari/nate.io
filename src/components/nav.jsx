import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Link from 'gatsby-link';
import debounce from 'lodash/debounce';
import '../css/nav.styl';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false, percent: 0 };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll = debounce(() => {
    const value = document.body.scrollTop;
    const max = document.body.scrollHeight - window.innerHeight;
    this.setState((prevState, props) => ({
      visible: value > 300,
      percent: (value / max) * 100
    }));
  }, 10)

  render() {
    const { site, article } = this.props;
    const { visible, percent } = this.state;

    let content;
    if (visible) {
      content = (
        <nav className='nav'>
          <div className='nav-content'>
            <Link to='/' className='logo'>
              D<span className='amp'>&</span>R
            </Link>
            <div className='article-title'>{article.frontmatter.title}</div>
          </div>
          <div className='progress'>
            <div className='progress-fill' style={{ width: `${percent}%` }} />
          </div>
        </nav>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName='nav' transitionEnterTimeout={100} transitionLeaveTimeout={100}>
        {content}
      </ReactCSSTransitionGroup>
    );
  }
}

export default Nav;
