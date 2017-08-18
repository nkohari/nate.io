import React from 'react';
import Link from 'gatsby-link';
import '../css/footer.styl';

class Footer extends React.Component {

  render() {
    return (
      <footer className='footer'>
        <Link to='/about'>
          <img className='profile' src={require('../../static/nate.jpg')} />
        </Link>
        <div>
          Hi, I'm Nate.
        </div>
        <ul>
          <li>
            <a href='http://github.com/nkohari'>Github</a>
          </li>
        </ul>
        <div className='copyright'>
          <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>
            <img alt='Creative Commons License' src='https://i.creativecommons.org/l/by/4.0/88x31.png' />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
