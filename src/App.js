import { useEffect, useState } from "react";
import { Auth } from "./components/auth.js";
import {db} from "./config/firebase";
import {getDocs, collection} from "firebase/firestore"

function App() {
  const[foodlist, setFoodlist] = useState([]);
  const foodCollectionRef = collection(db, "Food");

  useEffect(() =>{
    const getFoodlist = async () => {
      const data = await getDocs(foodCollectionRef)
      const filterData = data.docs.map((doc) =>({
          ...doc.data(),
          id: doc.id,
      }));
      setFoodlist(filterData);
    };
     getFoodlist();
     
  }, [])
  return (
    <div>
      <Auth/>
      
      <div>
        
        {foodlist.map((food) => (
          <div>
            <h1 style={{color:food.deliveryAvailable? "green ": "red" }}>{food.name}</h1>
            <h1>{food.quantity}</h1>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
