import { useContext, useState } from "react";
import useBreedList from "./useBreedList";
import Results, { errorResult } from "./Result";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMAL = ["dog", "cat", "bird", "rabbit"];

const SearchParams = () => {
  const [adoptedPet, setAdoptedPet] = useContext(AdoptedPetContext);
  const [requestParam, setRequestParam] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  let [animal, setAnimal] = useState("");
  // let [breed, setBreed] = useState("");
  // let [pets, setPets] = useState([])
  const [breeds] = useBreedList(animal);
  // useEffect(() => {
  //     requestPets();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // async function requestPets() {
  //     let res = await fetch(
  //         `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //     );
  //     let json = await res.json();

  //     setPets(json.pets);
  // }

  const result = useQuery(["search", requestParam], fetchSearch);
  const pets = result?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // requestPets();

          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          console.log(obj);
          setRequestParam(obj);
        }}
      >
        {console.log(adoptedPet)}

        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMAL.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
