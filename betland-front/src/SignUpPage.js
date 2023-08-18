import React, { useState } from 'react';
import './SignupForm.scss'

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    
      const [passwordError, setPasswordError] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
          setPasswordError("Les mots de passe ne correspondent pas");
          return;
        }
    
        // Réinitialisez l'erreur du mot de passe
        setPasswordError('');
    
        // Ajoutez ici la logique pour soumettre les données du formulaire
        console.log(formData);
      };
    

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Prénom:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Nom:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <div className="login-link">
        <p>Vous avez déjà un compte ? <a href="/">Se connecter</a></p>
      </div>
    </div>

  );
};

export default SignupPage;
