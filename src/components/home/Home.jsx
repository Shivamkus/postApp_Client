import '../../App.css';

const Home = () => {
  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('https://your-image-url.com')" }}>
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-2xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] text-center">
        {/* Logo */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Post Management App</h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Manage all your posts in one place. Create, edit, and organize with ease.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 bg-gray-600 text-white rounded-md text-lg shadow-lg hover:bg-gray-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
