import React, {Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme =>({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

class App extends Component {
  state = {
    customers: null,
    completed: 0
  }

  stateRefresh = ()=>{
    this.setState({
      customers: null,
      completed: 0
    });
    this.callApi()
      .then(res=> this.setState({customers: res}))
      .catch(err => console.log(err));    
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 100);
    this.callApi()
      .then(res=> this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi  = async () =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    if(this.timer>0){
      clearInterval(this.timer);
      this.timer = 0;
    }
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    console.log(completed);
    this.setState({completed: (completed>100?0:(completed+1))});
  }

  render(){
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>액션</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers!=null?
                this.state.customers.map(customer=>{
                  return (
                    <Customer 
                    key={customer.id}
                    id={customer.id}
                    image={customer.image}
                    name={customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                    stateRefresh={this.stateRefresh}/>              
                  );
                })
                :
                <TableRow>
                  <TableCell colSpan="7" align="center">
                    <CircularProgress className={classes.progress}  value={this.state.completed}/>
                  </TableCell>
                </TableRow> 
              }
            </TableBody>
          </Table>
    
        </Paper>

        <CustomerAdd stateRefresh={this.stateRefresh}/>

      </div>
    );

  }
}

export default withStyles(styles)(App);
