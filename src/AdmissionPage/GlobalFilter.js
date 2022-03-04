export default function GlobalFilter({ filter, setFilter }) {
  return (
    <>
      <p>
        {" "}
        Search
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={"Search by name"}
          style={{
            marginLeft: "15px",
            fontSize: "0.8rem",
            border: "solid 1.5px Black",
          }}
        />
      </p>
    </>
  );
}
