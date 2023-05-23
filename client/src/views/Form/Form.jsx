import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postVideogame } from "../../redux/actions";
import { useNavigate } from 'react-router-dom';
import "./Form.css";

const Form = () => {

    const [vgData, setVgData] = useState({
        name: '', image: '', description: '', platforms: [], released: '', rating: '', genres: []
    })

    const genres = useSelector((state) => state.allGenres);

    const handleChange = (event) => {
        setVgData({ ...vgData, [event.target.name]: event.target.value })
    };

    const handleChangeGenres = (event)=>{
        if(event.target.checked){
            setVgData({
                ...vgData,
                genres:[...vgData.genres, event.target.name]
            })  
        }else{
            setVgData({
                ...vgData,
                genres:vgData.genres.filter(gen => gen !== event.target.name)
            })
        }
    }
    const handleChangePlatforms = (event)=>{
        if(event.target.checked){
            setVgData({
                ...vgData,
                platforms:[...vgData.platforms, event.target.name]
            })  
        }else{
            setVgData({
                ...vgData,
                platforms:vgData.platforms.filter(plat => plat !== event.target.name)
            })
        }
    }

    const dispatch = useDispatch();   
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validation()){
           dispatch (postVideogame(vgData));
           navigate('/home');
           window.location.reload('/home');
        }else{ 
            alert("Please fill in all fields.")}
    }
    

    //*validaciones*//

    const [errors, setErrors] = useState({
        name: '', description: '', rating: '',
    })

    let validateName = () => {
        if (vgData.name.length < 3) {
            setErrors({ ...errors, name: "Requires a minimum of 3 characters." })
        } else { setErrors({ ...errors, name: "" }) }
    }

    let validateDescription = () => {
        if (vgData.description.length < 10 || vgData.description.length > 100) {
            setErrors({ ...errors, description: "Minimum 10 characters and maximum 100 characters." })
        } else { setErrors({ ...errors, description: "" }) }
    }

    let validateRating = () => {
        if (isNaN(vgData.rating) || vgData.rating < 0 || vgData.rating > 5) {
            setErrors({ ...errors, rating: "The rating must be a number between 0 and 5." })
        } else { setErrors({ ...errors, rating: "" }) }
    }

    let validation = () => {
        if (errors.name === "" && errors.description === "" && errors.rating === "" && vgData.image && vgData.platforms && vgData.genres && vgData.released) {
            return true
        } 
        return false}
    
   


    return (
<form onSubmit={handleSubmit} className="form-container">
  <h1 className="form-title">Create your Videogame</h1>
  <label htmlFor="name" className="form-label">Name:</label>
  <input
    name="name"
    placeholder="Insert name"
    value={vgData.name}
    onChange={handleChange}
    onBlur={validateName}
    className="form-input"
  />
  {errors.name && <p className="form-error">{errors.name}</p>}
  <hr className="form-divider" />

  
  <label htmlFor="description" className="form-label">Description:</label>
  <input
    name="description"
    placeholder="Insert description"
    value={vgData.description}
    onChange={handleChange}
    onBlur={validateDescription}
    className="form-input"
  />
  {errors.description && <p className="form-error">{errors.description}</p>}
  <hr className="form-divider" />


  <label htmlFor="released" className="form-label">Released:</label>
  <input
    name="released"
    type="date"
    placeholder="Insert released"
    value={vgData.released}
    onChange={handleChange}
    
  />
  <hr className="form-divider" />


  <label htmlFor="rating" className="form-label">Rating:</label>
  <input
    name="rating"
    placeholder="Insert rating"
    value={vgData.rating}
    onChange={handleChange}
    onBlur={validateRating}
    className="form-input"
  />
  {errors.rating && <p className="form-error">{errors.rating}</p>}
  <hr className="form-divider" />


  <label htmlFor="image" className="form-label">Image:</label>
  <input
    name="image"
    placeholder="Insert URL"
    value={vgData.image}
    onChange={handleChange}
    className="form-input"
  />
  <hr className="form-divider" />


  <p className="form-label">Genres:</p>
  <div className="form-genres-options">
  {genres.map((gen) => (
    <label key={gen.id} className="form-checkbox-label">
      <input
        type="checkbox"
        name={gen.id}
        value={gen.id}
        onChange={handleChangeGenres}
        className="form-checkbox"
      />{gen.name}
    </label>
    
  ))}</div>
  <hr className="form-divider" />


  <p className="form-label">Platforms:</p>
  <div className="form-platforms">
    <label className="form-checkbox-label">
      <input
        type="checkbox"
        name="PlayStation"
        value="PlayStation"
        onChange={handleChangePlatforms}
        className="form-checkbox"
      />
      PlayStation
    </label>
    <label className="form-checkbox-label">
      <input
        type="checkbox"
        name="PC"
        value="PC"
        onChange={handleChangePlatforms}
        className="form-checkbox"
      />
      PC
    </label>
    <label className="form-checkbox-label">
      <input
        type="checkbox"
        name="Xbox"
        value="Xbox"
        onChange={handleChangePlatforms}
        className="form-checkbox"
      />
      Xbox
    </label>
    <label className="form-checkbox-label">
      <input
        type="checkbox"
        name="Android"
        value="Android"
        onChange={handleChangePlatforms}
        className="form-checkbox"
      />
      Android
    </label>
    <label className="form-checkbox-label">
      <input
        type="checkbox"
        name="iOS"
        value="iOS"
        onChange={handleChangePlatforms}
        className="form-checkbox"
      />
      iOS
    </label>
    <label className="form-checkbox-label">
      <input
        type="checkbox"
        name="Nintendo"
        value="Nintendo"
        onChange={handleChangePlatforms}
        className="form-checkbox"
      />
      Nintendo
    </label>
  </div>


  <hr className="form-divider" />
  <button type="submit" className="form-button">
    Create
  </button>
</form>

)}

export default Form;
