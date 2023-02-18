import {useEffect, useState} from "react";

const fetchPuppy = async () => {
    const url = "https://dog.ceo/api/breeds/image/random";
    const response = await fetch(url);
    const dog = await response.json();

    return dog.message;
};

export default function DogPictures() {
    const [dogPic, setDogPic] = useState("");

    useEffect(() => {
        fetchPuppy().then((pic) => setDogPic(pic));
    }, []);

    return (
        <div className='dog-pics'>
            <img src={dogPic} alt='rando puppo' />
            <button onClick={async (e) => setDogPic(await fetchPuppy())}>
                🐶
            </button>
        </div>
    );
}
