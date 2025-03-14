const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[999999] bg-white/60 h-screen w-screen grid place-items-center">
      <div className="w-16 h-16 grid place-items-center bg-[conic-gradient(from_180deg_at_50%_50%,rgba(82,0,255,0)_0deg,#022B50_360deg)] animate-spin relative rounded-full">
        <span className="absolute inset-0 w-[80%] h-[80%] m-auto bg-white rounded-full" />
      </div>
    </div>
  );
};

export default Spinner;
