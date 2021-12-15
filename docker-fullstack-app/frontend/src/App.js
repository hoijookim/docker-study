import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  // DB에서 데이터 가져오기
  useEffect(() => {
    axios.get(`/api/values`).then((res) => {
      console.log('respose', res.data);
      setLists(res.data);
    });
  }, []);
  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`/api/value`, { value: value }).then((res) => {
      if (res.data.success) {
        console.log('response.data', res.data);
        setLists([...lists, res.data]);
        setValue('');
      } else {
        alert('값을 DB에 넣는데 실패했습니다.');
      }
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
        {lists && lists.map((list, index) => (
            <li key={index}>{list.value} </li>
          ))}
          <br />
            안녕하세요.
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요.."
              onChange={changeHandler}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
