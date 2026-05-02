export default function TourKoala({ onVolver }) {
  return (
    <>
      <button
        onClick={onVolver}
        style={{ position: "absolute", zIndex: 10 }}
      >
        Volver
      </button>

      <iframe
        src="https://koala360.com/tour?id=48555&preview=true"
        width="100%"
        height="1000px"
        style={{ border: "none" }}
      />
    </>
  );
}