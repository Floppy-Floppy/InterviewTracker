import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//for UI design: https://material-ui.com/getting-started/usage/

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});


export default function Job() {

  const classes = useStyles();

    const [jobs, setJobs] = useState([]);
    const [token, setToken] = useState('');
    let history = useHistory();

    const getJobs = async (token) => {
        const res = await axios.get('api/jobs', { 
            headers: {Authorization: token}
        })
        setJobs(res.data); 
    }
    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getJobs(token);
        }
    }, [jobs]);



    const handleSelectJob = (e, id) => {
      e.stopPropagation()
      history.push(`/update/${id}`)
    }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Submitted</TableCell>
            <TableCell align="right">Application</TableCell>
            <TableCell align="right">Interview</TableCell>
            <TableCell align="right">Offer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id} onClick={(e)=> handleSelectJob(e, job._id)}>
              <TableCell component="th" scope="row">
                {job.name}
              </TableCell>
            <TableCell align="right">{job.company}</TableCell>
            <TableCell align="right">{job.email}</TableCell>
            <TableCell align="right">{job.phone}</TableCell>
            <TableCell align="right">{job.position}</TableCell>
            <TableCell align="right">{job.submitted}</TableCell>
            <TableCell align="right">{job.application}</TableCell>
            <TableCell align="right">{job.interview}</TableCell>
            <TableCell align="right">{job.offer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

