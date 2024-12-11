// src/components/Signup.js
import React, { useState, useEffect, useRef } from 'react';
import './Signup.css';
// import './ImageUpload.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match.";
    if (!image) newErrors.image = "Image not Uploaded";
    if (phone.length !== 10) newErrors.phone = "Phone Number must be 10 Digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("isRole", "customer"); // Assuming a default role for simplicity
    formData.append("image", image); // Append the file object here

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Signup failed.");
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Contact Number"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <ImageUpload center onInput={(id, pickedFile, isValid) => setImage(pickedFile)} />
        {errors.image && <p className="error">{errors.image}</p>}

        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      props.onInput(props.id, pickedFile, true);
    } else {
      setIsValid(false);
      props.onInput(props.id, null, false);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: 'none' }}
        ref={filePickerRef}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />

      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Signup;