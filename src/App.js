import { useEffect, useState } from "react";
import { Auth } from "./components/auth.js";
import {db} from "./config/firebase";
import {getDocs, collection , addDoc} from "firebase/firestore"

function App() {
  const[foodlist, setFoodlist] = useState([]);
  const [foodname, setFoodname] = useState("");
  const [foodquantity, setFoodquantity] = useState(0);
  const [delivery, setDelivery] = useState(false);

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

  const onSubmitFood = async () => [
    await addDoc(foodCollectionRef, {
      name: foodname,
      quantity: foodquantity,
      delivery: delivery,
    })
  ]
  return (
    <div>
      <Auth/>
      <div>
        <input placeholder="Food Name" onChange={(e) => setFoodname(e.target.value)}/>
        <input placeholder="Food Quantity" type="number" onChange={(e) => setFoodquantity(Number(e.target.value))}/>
        <input type="checkbox" onChange={(e) => setDelivery(e.target.checked)}/>
        <label>delivery Available</label>
        <button onClick={onSubmitFood}>Send Food</button>
      </div>
      <div>
        {foodlist.map((food) => (
          <div>
            <h1 style={{color: food.deliveryAvailable? "green ": "red" }}>{food.name}</h1>
            <h1>{food.quantity}</h1>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
