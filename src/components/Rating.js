import { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { axiosInstance } from '../util/config';
import { Card } from 'react-bootstrap';
import { UserContext } from '../util/context';
import { Typography } from '@mui/material';

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

export default function Rating({ firstName, userId, reviews,canReview }) {
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
      reviewed_username: userId,
      subject,
      body,
    };
    await axiosInstance.post('/ratings', data, {
      headers: { authorization: 'Bearer ' + authorization },
    });
  };

  return (
    <div style={styles.container}>
      <h2> {`Reviews of ${firstName}`} </h2>
      {reviews.length ? <h4> {`Reviewed by  ${JSON.parse(window.localStorage.getItem('username'))}`} </h4>:<></>}
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
      {!canReview &&<div style={{color: 'red',
  fontStyle:'bold'}} >
      <p>{`You either do not have the permission to review ${firstName} or the project that you both have been working on is still in progress`}</p>
      </div>}
      <input
        name='subject'
        type='text'
        placeholder='Subject'
        disabled={!canReview}
        onChange={handleInputChange}
        style={{ width: 300, padding: 8 }}
      />
      <textarea
        name='body'
        disabled={!canReview}
        style={styles.textarea}
        onChange={handleInputChange}
        placeholder='Write your experience!'
      />

      <button onClick={handleSubmitRating} style={styles.button} disabled={!canReview}>
        Submit
      </button>
      <h1 className='text-info'>Previous Reviews</h1>
      <div className='project-following-scroll'>
        {reviews.map((review) => {
          return (
            <Card >
              <Card.Body>
                <Card.Title>{review.subject}</Card.Title>
                <Card.Text>{review.body}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
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
