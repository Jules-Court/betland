import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import './BetTable.scss';

const BetTable = ({ bets, onEdit }) => {
  const formatNumber = (number) => {
    return parseFloat(number).toFixed(2);
  };

  const calculateProfit = (bet) => {
    if (bet.status === 'win') {
      return formatNumber(bet.stake * bet.odds - bet.stake);
    } else {
      return '-' + formatNumber(bet.stake);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Mise</TableCell>
            <TableCell>Cote</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Bénéfice</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bets.slice().reverse().map((bet, index) => (
            <TableRow
              key={index}
              className={`bet-row ${bet.status === 'win' ? 'win' : 'lose'}`}
            >
              <TableCell>{bet.description}</TableCell>
              <TableCell>{formatNumber(bet.stake)}</TableCell>
              <TableCell>{formatNumber(bet.odds)}</TableCell>
              <TableCell>{bet.status}</TableCell>
              <TableCell>{calculateProfit(bet)}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => onEdit(index)}>Modifier</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BetTable;
