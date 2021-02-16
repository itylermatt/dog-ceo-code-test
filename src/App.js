import './App.css';
import NavBar from './components/NavBar/NavBar';
import Select from './components/Select/Select';
import Button from './components/Button/Button';
import Images from './components/Images/Images';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [numberOfImages, setNumberOfImages] = useState(0);
    const [breeds, setBreeds] = useState([]);
    const [subBreeds, setSubBreeds] = useState([]);
    const [allBreeds, setAllBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [selectedSubBreed, setSelectedSubBreed] = useState('');
    const [breedError, setBreedError] = useState(false);
    const [subBreedError, setSubBreedError] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('https://dog.ceo/api/breeds/list/all').then((response) => {
            const temp = response.data.message;
            setAllBreeds(temp);
            const tempBreeds = [];
            for (const breed in temp) {
                tempBreeds.push(breed);
            }
            setBreeds(tempBreeds);
        }).catch(e => console.log(e));
    }, []);

    const breedSelectHandler = (breedSelected) => {
        setSelectedBreed(breedSelected);
        for (const breed in allBreeds) {
            if (breed === breedSelected) {
                if (allBreeds[breed].length > 0) {
                    setSubBreeds(allBreeds[breed]);
                }
            }
        }
        setBreedError(false);
        setSubBreedError(false);
    };

    const subBreedSelectHandler = (subBreed) => {
        setSelectedSubBreed(subBreed);
        setSubBreedError(false);

    };

    const submitHandler = () => {
        console.log('selected details are: ', selectedBreed, selectedSubBreed, numberOfImages);
        if(selectedBreed===''){
            setBreedError(true);
            return;
        }
        if(subBreeds.length && selectedSubBreed === '') {
            setSubBreedError(true);
            return;
        }
        if(selectedSubBreed !== '') {
            axios.get(`https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images`).then(response => {
                console.log(response);
                const tempImages = [];
                for(let index = 0; index < numberOfImages; index++) {
                    tempImages.push(response.data.message[index]);
                }
                setImages([...tempImages]);
            }).catch(e => console.log(e));
        } else {
            axios.get(`https://dog.ceo/api/breed/${selectedBreed}/images`).then(response => {
                console.log(response);
                const tempImages = [];
                for(let c = 0; c < numberOfImages; c++) {
                    tempImages.push(response.data.message[c]);
                }
                setImages(tempImages);
            }).catch(e => console.log(e));
        }
        setSelectedSubBreed('');
        setSelectedBreed('');
        setNumberOfImages(0);
    };


    return (
        <div className="App">
            <NavBar/>
            <div className={'selectButtons'}>
                <Select error={breedError} disabled={!breeds.length} label={'Breed'} menuItems={breeds} handleChange={breedSelectHandler}/>
                <Select error={subBreedError} disabled={!subBreeds.length} label={'Sub Breed'} menuItems={subBreeds} handleChange={subBreedSelectHandler}/>
                <div style ={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                    <label htmlFor={'numberOfImages'}>Number of Images</label>
                    <input id={'numberOfImages'} value={numberOfImages} type="number" onChange={(e) => setNumberOfImages(e.target.value)}/>
                </div>
                <div className={'ViewImagesButton'}>
                    <Button onChange={submitHandler}/>
                </div>
            </div>

            <div>
                <Images images={images} />
            </div>
        </div>
    );
}

export default App;
