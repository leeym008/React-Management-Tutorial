import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [
  {
  'id' :  1,
  'image' : './logo.svg',
  'name'  :   '이영민1',
  'birthday'  :   '111111',
  'gender'    :   '남자',
  'job'       :   '대학생'
  },
  {
    'id' :  2,
    'image' : './logo.svg',
    'name'  :   '이영민2',
    'birthday'  :   '222222',
    'gender'    :   '남자',
    'job'       :   '대학생'
  },
  {
      'id' :  3,
      'image' : './logo.svg',
      'name'  :   '이영민',
      'birthday'  :   '333333',
      'gender'    :   '남자',
      'job'       :   '대학생'
   }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id}  //key = PK라 생각하자
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })
        }
      </div>  
    );
  }
}

export default App;



