import React from 'react';

const Nav = () => {
  return (
    <div className='w-full h-12 bg-dark'>
      <div className='flex flex-row justify-between'>
        <h3>Title</h3>
        <ul>
          <li>aaa</li>
          <li>bbb</li>
        </ul>
      </div>
    </div>
  );
};
const Side = () => {
  return (
    <div className='w-6 h-full bg-light'>
      <div className='flex flex-col justify-between'>
        <button>aaa</button>
        <button>bbb</button>
        <button>ccc</button>
        <button>ddd</button>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className='w-full h-full bg-bgDarkLight'>
      <div className='flex flex-row justify-around'>
        <Content />
        <Content />
      </div>
      <div className='flex flex-row justify-around'>
        <Content />
        <Content />
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className='w-full h-full p-8 m-8 bg-bgWhite border-2 border-textBlack'>
      Content
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Layout = () => {
  return (
    <div className='w-screen h-screen'>
      <Nav />
      <div className='h-full w-full flex flex-row'>
        <Side />
        <Body />
      </div>
    </div>
  );
};

export default Layout;
