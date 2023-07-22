import { useEffect, useState } from "react";
import { Auth } from "./components/auth.js";
import {db} from "./config/firebase";
import {getDocs, collection , addDoc, deleteDoc, doc} from "firebase/firestore"

function App() {
  const[foodlist, setFoodlist] = useState([]);
  const [foodname, setFoodname] = useState("");
  const [foodquantity, setFoodquantity] = useState(0);
  const [delivery, setDelivery] = useState(true);

  const foodCollectionRef = collection(db, "Food");

  const getFoodlist = async () => {
    const data = await getDocs(foodCollectionRef)
    const filterData = data.docs.map((doc) =>({
        ...doc.data(),
        id: doc.id,
    }));
    setFoodlist(filterData);
  };
  

  useEffect(() =>{
    getFoodlist();
  }, [])

  const onSubmitFood = async () => {
    await addDoc(foodCollectionRef, {
      name: foodname,
      quantity: foodquantity,
      deliveryAvailable: delivery,
    })
    getFoodlist();
  }

  const deleteFood = async (id) =>{
    const foodDoc = doc(db, "Food", id);
    await deleteDoc(foodDoc);
  }

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
            <h1 style={{color: food.deliveryAvailable ? "green" : "red" }}>{food.name}</h1>
            <h1>{food.quantity}</h1>
            <button onClick={() => deleteFood(food.id)}> Delete </button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
