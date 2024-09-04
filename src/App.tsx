import CalendarOverlay from "./Calendar";

const App = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
      }}
    >
      <CalendarOverlay />
    </div>
  );
};
export default App;
