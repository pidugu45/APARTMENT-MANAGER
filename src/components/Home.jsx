import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
export const Home = () => {
  const local = JSON.parse(localStorage.getItem("userdata")) || false;
  const status = local;
  console.log(status);
    const [flats, setFlats] = useState([]);
   // const [nbr,setNbr]=useState(0)
    const [type,setType]=useState("")
    const navigate = useNavigate()
  useEffect(() => {
    getFlats();
   
  }, []);
  function getFlats() {
    axios
      .get("https://apartment-manager-system.herokuapp.com/flats")
      .then((res) => {
          setFlats(res.data);

          console.log("flats",flats);
      })
      .catch((e) => {
        console.log("flats not fetched");
      });
    }
    function getFlatsByType(type) {
        console.log("type", type)
        !type?getFlats():
        axios
          .get(`https://apartment-manager-system.herokuapp.com/flats/cat/${type}`)
            .then((res) => {
                console.log(res.data);
              setFlats([...res.data]);
              
          })
          .catch((e) => {
            console.log("flats not fetched");
          });
      }
//     const getFlat = (id) => {
//         let  len ;
//     axios
//       .get(`https://apartment-manager-system.herokuapp.com/residents/${id}`)
//         .then((res) => {
//             //setNbr(res.data.length)
//             len= res.data.length
//             //console.log(res.data.length)
//         });
//         console.log("len",len)
//         return len;
//   };
    function handleCat(e) {
        console.log("e.target.value",e.target.value)
        setType(e.target.value)
        getFlatsByType(type);
  }
  function handleCountry() {
    flats.sort(function (a, b) {
      return a.type.localeCompare(b.type);
    });
    // console.log(flats);
    setFlats([...flats]);
  }

  //sort by population
  function handlePopulation(value) {
    if (value == 1) {
      flats.sort(function (a, b) {
        return a.flatnumber - b.flatnumber;
      });
    } else {
      flats.sort(function (a, b) {
        return b.flatnumber - a.flatnumber;
      });
    }
    setFlats([...flats]);
  }
  //searchBox

  const handleSearch = (e) => {
    const newValue = e.target.value;
    if (newValue.length == 0) {
      getFlats();
    } else {
      const newflats = flats.filter((el) => {
        // let text = "Hello world, welcome to the universe.";

        return el.block.startsWith(newValue);
      });
      setFlats(newflats);
    }
  };
    return (
        
        <>
           
        <h1>Home Page</h1>
        <div>
        <div>
          <h2>search here..</h2>

          <input
            type="text"
            id="search"
            onChange={handleSearch}
            maxLength={1}
          />
        </div>
        <div>
          {" "}
          <h3>Sort By:</h3>
          <button variant="outlined" onClick={handleCountry}>
            Type
          </button>{" "}
          <button
            variant="outlined"
            onClick={() => {
              handlePopulation(1);
            }}
          >
            Flat asc
          </button>{" "}
          <button
            variant="outlined"
            onClick={() => {
              handlePopulation(-1);
            }}
          >
            Flat desc
            </button>
            <select onChange={handleCat} >
                <option value="">type</option>
                <option value="owner">tenant</option>
                <option value="tenent">owner</option>
            </select>
        </div>
      </div>
        {status ? <>
          <table>
        <thead>
          <tr>
            <td>FlatNo</td>
            <td>FlatType</td>
            <td>Block</td>
            <td>Residents</td>
            <td>Details</td>
          </tr>
        </thead>
              <tbody>
                  {
                      flats?flats.map((e) => {
                      // let l= getFlat(e._id)
                          return <>
                               
                          <tr>
                              <td>{ e.flatnumber}</td>
                              <td>{e.type }</td>                            
                              <td>{e.block }</td>
                              <td>{0}</td>
                              <td onClick={() => {
                                  navigate(`/flats/${e._id}`)
                              }}>{"Details" }</td>
                              </tr>
                              </>
                    }):<>no flats</>  
                  }
        </tbody>
      </table>
        </> : <Navigate to={"/login"} />}       
      
    </>
  );
};
