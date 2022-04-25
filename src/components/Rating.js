import { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { axiosInstance } from '../util/config';

import { UserContext } from '../util/context';

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

export default function Rating({ firstName, userId }) {
  const [rating, setRating] = useState({ subject: '', body: '' });
  const { authorization } = useContext(UserContext);



  // const [currentValue, setCurrentValue] = useState(0);
  // const [hoverValue, setHoverValue] = useState(undefined);
  // const stars = Array(5).fill(0)

  // const handleClick = value => {
  //   setCurrentValue(value)
  // }

  // const handleMouseOver = newHoverValue => {
  //   setHoverValue(newHoverValue)
  // };

  // const handleMouseLeave = () => {
  //   setHoverValue(undefined)
  // }

  const handleInputChange = ({ target: { name, value } }) => {
    setRating({ ...rating, [name]: value });
  };

  const handleSubmitRating = async () => {
    const { subject, body } = rating;
    const data = {
      reviewed_username:  userId,
      subject,
      body,
    };
    await axiosInstance.post('/ratings', data, {
      headers: { authorization: 'Bearer ' + authorization },
    });
  };

  return (
    <div style={styles.container}>
      <h2> {`Rate ${firstName}`} </h2>
      {/* <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div> */}
      <input
        name='subject'
        type='text'
        placeholder='Subject'
        style={{ width: 300, padding: 8 }}
      />
      <textarea
        name='body'
        placeholder='Write your experience!'
        onChange={handleInputChange}
        style={styles.textarea}
      />

      <button onClick={handleSubmitRating} style={styles.button}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  textarea: {
    border: '1px solid #a9a9a9',
    borderRadius: 5,
    padding: 10,
    margin: '20px 0',
    minHeight: 100,
    width: 300,
  },
  button: {
    border: '1px solid #a9a9a9',
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
