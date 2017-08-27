import React from 'react';
import Link from 'gatsby-link';
import '../css/footer.styl';

class Footer extends React.Component {

  render() {
    return (
      <footer className='footer'>
        <Link to='/about'>
          <img className='picture' src={require('../../static/nate.jpg')} />
        </Link>
        <div className='content'>
          <p>
            <Link to='/about'>Nate Kohari</Link> is a software engineer and an entrepreneur.
            He lives and works in Raleigh, North Carolina.
          </p>
          <ul className='pages'>
            <li><Link to='/about'>About Me</Link></li>
            <li><Link to='/career'>My Work</Link></li>
          </ul>
          <div className='bottom'>
            <ul>
              <li>
                <a rel='external' href='https://github.com/nkohari' target='_blank'>
                  <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,0.297c-6.63,0 -12,5.373 -12,12c0,5.303 3.438,9.8 8.205,11.385c0.6,0.113 0.82,-0.258 0.82,-0.577c0,-0.285 -0.01,-1.04 -0.015,-2.04c-3.338,0.724 -4.042,-1.61 -4.042,-1.61c-0.546,-1.385 -1.335,-1.755 -1.335,-1.755c-1.087,-0.744 0.084,-0.729 0.084,-0.729c1.205,0.084 1.838,1.236 1.838,1.236c1.07,1.835 2.809,1.305 3.495,0.998c0.108,-0.776 0.417,-1.305 0.76,-1.605c-2.665,-0.3 -5.466,-1.332 -5.466,-5.93c0,-1.31 0.465,-2.38 1.235,-3.22c-0.135,-0.303 -0.54,-1.523 0.105,-3.176c0,0 1.005,-0.322 3.3,1.23c0.96,-0.267 1.98,-0.399 3,-0.405c1.02,0.006 2.04,0.138 3,0.405c2.28,-1.552 3.285,-1.23 3.285,-1.23c0.645,1.653 0.24,2.873 0.12,3.176c0.765,0.84 1.23,1.91 1.23,3.22c0,4.61 -2.805,5.625 -5.475,5.92c0.42,0.36 0.81,1.096 0.81,2.22c0,1.606 -0.015,2.896 -0.015,3.286c0,0.315 0.21,0.69 0.825,0.57c4.801,-1.574 8.236,-6.074 8.236,-11.369c0,-6.627 -5.373,-12 -12,-12" />
                  </svg>
                </a>
              </li>
              <li>
                <a rel='external' href='https://twitter.com/nkohari' target='_blank'>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z" />
                  </svg>
                </a>
              </li>
              <li>
                <a rel='external' href='https://linkedin.com/in/nkohari' target='_blank'>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z" />
                  </svg>
                </a>
              </li>
            </ul>
            <div className='copyright'>
              Copyright &copy; 2006-2017 Nate Kohari.<br />
              Licensed under <a className='license' rel='license' href='http://creativecommons.org/licenses/by/4.0/' target='_blank'>Creative Commons Attribution (CC-BY) 4.0</a>.
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
