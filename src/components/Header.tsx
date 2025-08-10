function Header() {
  return (
    <header className="bg-green-700 flex min-h-[60px] items-center">
      <img src="src/assets/IFF-PC2.jpg" alt="IFF" className="h-[50px] rounded-4xl hidden sm:block ml-5"/>
      <img src="src/assets/IFF-MOBILE.jpg" alt="IFF" className="h-[50px] rounded-4xl block sm:hidden ml-5"/>
      <h1 className="ml-5 text-3xl text-white font-bold sm:ml-45">Cardápio Digital</h1>
    </header>
  );
}

export default Header;