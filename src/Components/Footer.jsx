const Footer = () => {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  return (
    <footer className="relative mt-5 bg-gray-900 px-4 pt-5">
      <p className="py-5 text-center text-gray-300">
        © {anio} Copyright | Shigatsu Translation
      </p>
    </footer>
  );
};

export default Footer;
