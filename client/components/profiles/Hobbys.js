import { useState, useEffect, useRef } from 'react';
import useRequest from '../../hooks/use-request';
import CustomInput from '../CustomInput';

const Hobbys = ({ hobbys, currentUser }) => {
  const [chosenHobby, setChosenHobby] = useState('');
  const [activeHobbys, setActiveHobbys] = useState(hobbys);
  const [hobby, setHobby] = useState('');

  const isInitialMount = useRef(true);

  const [patchProfileHobbyRequest, patchProfilesHobbyErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      hobby: hobby,
    },
    onSuccess: () => {
      console.log('profile updated');
    },
  });

  const [deleteHobby, deleteHobbyError] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      hobby: chosenHobby,
    },
    onSuccess: () => {},
  });

  const onClickAddHobby = (e) => {
    e.preventDefault();

    patchProfileHobbyRequest();
    setActiveHobbys([...activeHobbys, hobby]);
    setHobby('');
  };

  const onClickDeleteHobby = (e) => {
    console.log(`TO jest state ${chosenHobby}`);
    deleteHobby();
    setActiveHobbys(activeHobbys.filter((hobby) => hobby != chosenHobby));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onClickDeleteHobby();
    }
  }, [chosenHobby]);

  return (
    <div>
      <h1 className="lead text-center pt-3">Hobbys:</h1>
      <div className="container">
        <div className="text-align-start">
          <div className="row mb-5">
            {activeHobbys.map((hobby) => {
              return hobby ? (
                <div className="col-6">
                  <div
                    key={hobby}
                    className="bg-primary text-white text-center rounded m-2"
                  >
                    {hobby}
                    <button
                      className="btn bi bi-patch-minus"
                      value={hobby}
                      onClick={(e) => {
                        setChosenHobby(e.target.value);
                      }}
                    ></button>
                    {deleteHobbyError}
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
      <form className="justify-content-center">
        <div className="container">
          <CustomInput
            name="Add Hobby"
            id="hobbys"
            type="text"
            className="input-group mb-3"
            value={hobby}
            setter={setHobby}
            placeholder="Music"
            error={
              patchProfilesHobbyErrors &&
              patchProfilesHobbyErrors.message['hobby']
            }
          />

          <button
            className="btn btn-primary"
            onClick={onClickAddHobby}
            disabled={hobby ? null : 'disabled'}
          >
            Add hobby
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hobbys;
