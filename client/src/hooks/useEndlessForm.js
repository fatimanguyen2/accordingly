import { useState } from 'react';

export default function useEndlessForm (inital={}) {
  // console.log('inital')
  // console.log(inital);
  const [input, setInput] = useState(inital)

  const [repeats, setRepeat] = useState(inital.recurrences ? inital.recurrences
    // {
    //   "html_id": 1,
    //   "id": 11,
    //   "type_of": "weekly",
    //   "initial": "2020-03-09T04:00:00.000Z",
    //   "interval": 2
    // },
    // {
    //   "html_id": 2,
    //   "id": 22,
    //   "type_of": "weekly",
    //   "initial": "2020-03-10T04:00:00.000Z",
    //   "interval": 2
    // }
   : []);
  const [max, setMax] = useState(repeats.length || 0);

  const increaseMax = () => setMax(state => state += 1);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleAddress = (address) => setInput({
    ...input,
    "destination": address
  })

  const addRepeat = (e) => {
    e.preventDefault();
    increaseMax();
    setRepeat(state => ([...state, {
      "html_id": max,
      "type_of": "day",
      "interval": 1
    }]));
  };

  const removeRepeat = (e, html_id) => {
    e.preventDefault();
    setRepeat(state => state.filter(ele => ele.html_id !== html_id));
  };

  return { input, repeats, max, increaseMax, handleInputChange ,handleAddress ,addRepeat, removeRepeat, setInput, setRepeat };
}
