import React, { useState, useEffect } from 'react';
import './App.scss';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BetTable from './BetTable';
import axios from 'axios';
import {Pie} from './Pie'

const App = () => {
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBetIndex, setEditingBetIndex] = useState(null);
  const [simpleBet, setSimpleBet] = useState({
    description: '',
    stake: '',
    odds: '',
    status: null,
  });
  const [bets, setBets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then(response => {
        setBets(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données des paris :', error);
      });
  }, []);

  const openSimpleModal = () => {
    setIsSimpleModalOpen(true);
  };

  const openEditModal = (index) => {
    setEditingBetIndex(index);
    const betToEdit = bets[index];
    setSimpleBet({
      description: betToEdit.description,
      stake: betToEdit.stake,
      odds: betToEdit.odds,
      status: betToEdit.status,
    });
    setIsEditModalOpen(true);
  };

  const closeSimpleModal = () => {
    setIsSimpleModalOpen(false);
    setIsEditModalOpen(false);
    setEditingBetIndex(null);
    setSimpleBet({
      description: '',
      stake: '',
      odds: '',
      status: null,
    });
  };

  const handleSimpleChange = (event) => {
    const { name, value } = event.target;
    setSimpleBet((prevBet) => ({
      ...prevBet,
      [name]: value,
    }));
  };

  const handleSimpleStatusChange = (event) => {
    setSimpleBet((prevBet) => ({
      ...prevBet,
      status: event.target.value,
    }));
  };

  const handleSimpleSubmit = () => {
    const newBet = {
      ...simpleBet,
    };

    axios.post('/', newBet)
      .then(response => {
        console.log('Pari ajouté avec succès :', response.data);
        setBets([...bets, newBet]); // Mettez à jour la liste des paris localement
        closeSimpleModal(); // Fermez la modal
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du pari :', error);
      });
  };

  const calculateTotalProfit = () => {
    const totalProfit = bets.reduce((total, bet) => {
      if (bet.status === 'win') {
        return total + (bet.stake * bet.odds - bet.stake);
      } else{
        return total - bet.stake;
      }
    }, 0);
    return totalProfit.toFixed(2);
  };
  const winCount = bets.filter(bet => bet.status === 'win').length;
  const loseCount = bets.filter(bet => bet.status === 'lose').length;


  return (
    <div className="app-container">
      <div className="header">
        <div className="center">
          <div className="placeholder">
            <p>Mise initial: 50€</p>
            <p>Bénéfices : {calculateTotalProfit()}€</p>
          </div>
          <div className="values">
            <p>Il reste {parseFloat(50) + parseFloat(calculateTotalProfit())}€</p>
          </div>
        </div>
        <div className='right'>         
          <Pie winCount={winCount} loseCount={loseCount} />
        </div>
      </div>
      <div className="buttons">
        <Button variant="contained" onClick={openSimpleModal}>Ajouter un Pari</Button>
      </div>

      <BetTable bets={bets} onEdit={openEditModal} />


      <Modal open={isSimpleModalOpen || isEditModalOpen} onClose={closeSimpleModal}>
        <Box className="modal">
          <h2>{editingBetIndex !== null ? 'Modifier le Pari' : 'Ajouter un Pari'}</h2>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={simpleBet.description}
            onChange={handleSimpleChange}
          />
          <TextField
            label="Mise"
            variant="outlined"
            fullWidth
            name="stake"
            value={simpleBet.stake}
            onChange={handleSimpleChange}
          />
          <TextField
            label="Cote"
            variant="outlined"
            fullWidth
            name="odds"
            value={simpleBet.odds}
            onChange={handleSimpleChange}
          />
          <TextField
            label="Commentaire"
            variant="outlined"
            fullWidth
            name="comments"
            onChange={handleSimpleChange}
          />
          <FormControl fullWidth>
            <Select
              label="Statut"
              value={simpleBet.status}
              onChange={handleSimpleStatusChange}
            >
              <MenuItem value="win">Gagnant</MenuItem>
              <MenuItem value="lose">Perdant</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSimpleSubmit}>
            {editingBetIndex !== null ? 'Modifier' : 'Valider'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
