import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
import axios from 'axios';
import './LoginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/', formData);
      const { token } = response.data;

      if (token.code === 'ERR_BAD_REQUEST') {
        setError('Erreur lors de la connexion. Vérifiez vos informations.');
      } else {
        setError(null);
        navigate(`/?token=${token}`);
      }
    } catch (error) {
      setError('Erreur lors de la connexion. Vérifiez vos informations.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <div className="signup-link">
        <p>Je n'ai pas de compte ? <Link to="/signup">S'inscrire</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
