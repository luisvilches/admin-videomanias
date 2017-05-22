import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a href="http://www.videomanias.cl">VideoManias</a> &copy; 2017 Dowhile Inc.
        <span className="float-right">Powered by <a href="http://www.dowhile.cl" target="_blank">Dowhile Inc</a></span>
      </footer>
    )
  }
}

export default Footer;
