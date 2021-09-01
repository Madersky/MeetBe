import { useState, useEffect, useRef } from 'react';
import useRequest from '../../hooks/use-request';

const Hobbys = ({ hobbys, currentUser }) => {
  const [chosenHobby, setChosenHobby] = useState('');
  const [activeHobbys, setActiveHobbys] = useState(hobbys);
  const [hobby, setHobby] = useState('');

  const isInitialMount = useRef(true);

  //   const [patchProfileRequest, patchProfilesErrors] = useRequest({
  //     url: `/api/profiles/id/${currentUser._id}`,
  //     method: 'patch',
  //     body: {
  //       hobbys: hobbys || profile.hobbys,
  //     },
  //     onSuccess: () => {
  //       console.log('profile updated');
  //       Router.reload();
  //     },
  //   });

  const [deleteHobby, deleteHobbyError] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      hobbys: [chosenHobby],
    },
    onSuccess: () => {
      // Router.reload();
    },
  });

  const onClickDeleteHobby = (e) => {
    console.log(`TO jest state ${chosenHobby}`);
    deleteHobby();
    setActiveHobbys(activeHobbys.filter((hobby) => hobby != chosenHobby));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('Use effect');
      onClickDeleteHobby();
    }
  }, [chosenHobby]);

  return (
    <div>
      <p className="lead text-center pt-3">
        Hobbys:
        {activeHobbys.map((hobby) => {
          return hobby ? (
            <li key={hobby}>
              {hobby}
              <button
                className="btn bi bi-patch-minus"
                value={hobby}
                onClick={(e) => {
                  setChosenHobby(e.target.value);
                }}
              ></button>
            </li>
          ) : null;
        })}
      </p>
      {/* <form className="justify-content-center">
        <label className="form-label" htmlFor="hobbys">
          Hobbys
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={hobbys}
            onChange={(e) => setHobby(e.target.value)}
            placeholder="programowanie"
            aria-label="Hobbys"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <button className="btn btn-primary">Add hobby</button>
      </form> */}
    </div>
  );
};

export default Hobbys;
