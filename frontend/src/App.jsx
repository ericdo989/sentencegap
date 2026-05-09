function App() {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        SentenceGap
      </h1>

      <p
        style={{
          fontSize: "1.4rem",
          maxWidth: "700px",
          lineHeight: "1.6",
          color: "#cbd5e1",
        }}
      >
        Same crime. Different justice.
        <br />
        AI-powered sentencing disparity analysis and visualization.
      </p>

      <button
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          backgroundColor: "#2563eb",
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Start Comparison
      </button>
    </div>
  );
}

export default App;