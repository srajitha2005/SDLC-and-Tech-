import office from "./office.png";

function App() {

  const offices = [
    {
      Name: "DBS",
      Rent: 50000,
      Address: "Chennai"
    },
    {
      Name: "Regus",
      Rent: 75000,
      Address: "Bangalore"
    },
    {
      Name: "WeWork",
      Rent: 60000,
      Address: "Hyderabad"
    }
  ];

  return (
    <div style={{ marginLeft: "30px" }}>

      <h1>Office Space Rental App</h1>

      <img
        src={office}
        alt="Office"
        width="400"
        height="250"
      />

      {
        offices.map((item, index) => (

          <div key={index}>

            <h2>Name : {item.Name}</h2>

            <h3
              style={{
                color: item.Rent < 60000 ? "red" : "green"
              }}
            >
              Rent : Rs. {item.Rent}
            </h3>

            <h3>
              Address : {item.Address}
            </h3>

            <hr />

          </div>

        ))
      }

    </div>
  );
}

export default App;