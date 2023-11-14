import './globals.css'

const Layout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='max-h-screen bg-gray-200'>{children}</body>
    </html>
  );
};

export default Layout;
