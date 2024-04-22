import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import fetchPet from "./fetch";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
    const [showModel, SetShowModel] = useState(false);
    const navigate = useNavigate();
    const [adoptedPet, setAdoptedPet] = useContext(AdoptedPetContext)
    let { id } = useParams();
    const result = useQuery(["details", id], fetchPet)

    // if(result.isError){

    // }

    if (result.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">@</h2>
            </div>
        );
    }
    const pet = result.data.pets[0];
    console.log(pet)


    return (

        <div className="details">
            <Carousel images={pet.images} />
            <div> <h1>{pet.name}</h1>
                <h2>{pet.animal} —{pet.breed} — ${pet.city}</h2>
                <button onClick={() => SetShowModel(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>

                {showModel ?
                    (<Modal>
                        <div>
                            <h2>Would you like to adopt {pet.name}</h2>
                            <div className="buttons">
                                <button onClick={() =>
                                {setAdoptedPet(pet)
                                navigate("/")
                                }}>yes</button>
                                <button onClick={() => SetShowModel(false)}>No</button>

                            </div>
                        </div>
                    </Modal>) : null
                }
            </div>
        </div>
    );
};


function DetailsErrorBoundary() {
    return (<ErrorBoundary>
        <Details />
    </ErrorBoundary>);
}
export default DetailsErrorBoundary;

