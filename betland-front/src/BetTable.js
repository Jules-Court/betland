import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './BetTable.scss';

const BetTable = ({ bets, onEdit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBetComment, setSelectedBetComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const openModalWithComment = (comment) => {
    setSelectedBetComment(comment);
    setModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bets.slice(indexOfFirstItem, indexOfLastItem);

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
          {currentItems.slice().reverse().map((bet, index) => (
            <TableRow
              key={index}
              className={`bet-row ${bet.status === 'win' ? 'win' : 'lose'}`}
            >
              <TableCell
                className="clickable"
                onClick={() => openModalWithComment(bet.comments)}
              >
                {bet.description}
              </TableCell>
              <TableCell>{formatNumber(bet.stake)}</TableCell>
              <TableCell>{formatNumber(bet.odds)}</TableCell>
              <TableCell>{bet.status}</TableCell>
              <TableCell>{calculateProfit(bet)}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => onEdit(index)}>
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="pagination">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        <span>{currentPage}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentItems.length < itemsPerPage}
        >
          {">"}
        </Button>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="modal">
          <h2>Ce qu'il s'est passé</h2>
          <p>{selectedBetComment}</p>
        </div>
      </Modal>
    </TableContainer>
  );
};

export default BetTable;
