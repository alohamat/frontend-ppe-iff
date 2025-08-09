function Header() {
  return (
    <header className="bg-green-700 flex min-h-[60px] items-center">
      <img src="src/assets/IFF-PC.jpg" alt="IFF" className="h-[50px] rounded-4xl hidden sm:block ml-5"/>
      <img src="src/assets/IFF-MOBILE.jpg" alt="IFF" className="h-[50px] rounded-4xl block sm:hidden ml-5"/>
    </header>
  );
}

export default Header;