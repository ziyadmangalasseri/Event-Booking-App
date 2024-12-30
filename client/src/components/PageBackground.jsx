const PageBackground = () => {
  const circles = [
    { top: "20%", left: "20%", color: "rgba(199,246,224,1)" }, // Green
    { top: "30%", left: "60%", color: "rgba(249,196,225,1)" }, // Pink
    { top: "60%", left: "30%", color: "rgba(233,205,151,1)" }, // Yellow
    { top: "60%", left: "60%", color: "rgba(151,217,216,1)" }, // Cyan
    { top: "70%", left: "50%", color: "rgba(245,198,198,1)" }, // Red
    { top: "20%", left: "38%", color: "rgba(189,213,246,1)" }, // Blue
  ];

  return (
    <div className="fixed w-full h-screen -z-10">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute h-[13%] w-[10%] rounded-full animate-test"
          style={{
            top: circle.top,
            left: circle.left,
            backgroundColor: circle.color,
            boxShadow: `0 0 100px 100px ${circle.color}`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default PageBackground;
