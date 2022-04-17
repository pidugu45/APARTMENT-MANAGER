import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
    const [flats, setFlats] = useState([]);
   // const [nbr,setNbr]=useState(0)
    const navigate = useNavigate()
  useEffect(() => {
    getFlats();
   
  }, []);
  function getFlats() {
    axios
      .get("https://apartment-manager-system.herokuapp.com/flats")
      .then((res) => {
          setFlats(res.data);
          console.log(res.data);
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
    return (
        
        <>
           
      <h1>Home Page</h1>
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
                      flats.map((e) => {
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
                    })  
                  }
        </tbody>
      </table>
    </>
  );
};
