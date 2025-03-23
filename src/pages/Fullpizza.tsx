import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Fullpizza() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [getPizza, SetGetPizza] = useState<{ title: string }>({ title: '' });
  useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get('https://67c59241351c081993fa8d3d.mockapi.io/items/' + id);
        SetGetPizza(data);
        console.log(data);
      } catch (err) {
        alert('Такой пиццы нет');
        navigate('/');
      }
    }
    getPizza();
  }, []);
  if (!getPizza) {
    return <div>...загрузка</div>;
  }
  return (
    <div>
      <div>{getPizza.title}</div>
    </div>
  );
}

export default Fullpizza;
