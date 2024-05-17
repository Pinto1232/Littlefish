import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
  },
  tableCell: {
    padding: '16px',
  },
  productImage: {
    width: '70px',
    height: '70px',
    marginRight: '16px',
    borderRadius: '50%',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  switch: {
    color: '#4caf50',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: '8px',
  },
});

export { useStyles };