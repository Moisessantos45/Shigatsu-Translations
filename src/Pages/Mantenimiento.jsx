import AppUse from "../Hooks/AppUse";

const Mantenimiento = () => {
  const { quitarDark } = AppUse();
  return (
    <div
      className={`${
        quitarDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen flex flex-col items-center justify-center p-4`}
    >
      <h1 className="text-4xl font-bold mb-4">Sitio en Mantenimiento</h1>
      <p className="text-xl mb-6">
        Estamos trabajando para mejorar nuestro sitio. Por favor, vuelve más
        tarde.
      </p>
      <div className="flex justify-center">
        <svg
          className="w-20 h-20 text-blue-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.875l3-2.584z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Mantenimiento;
