const SignInPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 text-white"></div>
      <div className="bg-blue-500 flex flex-col items-center justify-center gap-6 p-2 text-center text-white invisible md:visible">
        <h1 className="text-6xl font-bold">OdontoApp</h1>
        <h3 className="text-lg">
          Full command central for dental clinics and prosthetics labs
        </h3>
      </div>
    </>
  );
};

export default SignInPage;
