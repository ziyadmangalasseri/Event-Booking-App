const Circle = ({ className }) => (
    <div className={`${className} absolute rounded-full`} />
  );
  
  const PageBackground = () => (
    <div className="absolute w-full h-full z-0 overflow-hidden">
      <Circle className="w-10 h-10 bg-green-200 top-[20%] left-[20%] shadow-[0_0_400px_100px_rgba(199,246,224,1)] animate-pulse" />
      <Circle className="w-10 h-10 bg-pink-200 top-[30%] left-[60%] shadow-[0_0_400px_100px_rgba(249,196,225,1)] animate-pulse" />
      <Circle className="w-10 h-10 bg-yellow-200 top-[60%] left-[30%] shadow-[0_0_400px_100px_rgba(233,205,151,1)] animate-pulse" />
      <Circle className="w-10 h-10 bg-teal-200 top-[60%] left-[60%] shadow-[0_0_400px_100px_rgba(151,217,216,1)] animate-pulse" />
      <Circle className="w-10 h-10 bg-red-200 top-[70%] left-[50%] shadow-[0_0_400px_100px_rgba(245,198,198,1)] animate-pulse" />
      <Circle className="w-10 h-10 bg-blue-200 top-[20%] left-[38%] shadow-[0_0_400px_100px_rgba(189,213,246,1)] animate-pulse" />
    </div>
  );
  
  export default PageBackground;
  