import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [
  {
    id: 1,
    image: 'https://placeimg.com/64/64/1',
    name: '홍길동',
    birthday: '961022',
    gender: '남자',
    job: '대학생'
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/2',
    name: '이완종',
    birthday: '690724',
    gender: '남자',
    job: '직장인'
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/3',
    name: '임꺽정',
    birthday: '19890101',
    gender: '남자',
    job: '군인'
  }  
];

class App extends Component {
  render(){
    return (
      <div>
        {
          customers.map(customer=>{
            return (
              <Customer 
              key={customer.id}
              id={customer.id}
              image={customer.image}
              name={customer.name}
              birthday={customer.birthday}
              gender={customer.gender}
              job={customer.job}/>              
            );
          })
        }
  
      </div>
    );

  }
}

export default App;
