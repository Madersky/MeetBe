import { useState, useEffect, useRef } from 'react';
import useRequest from '../../hooks/use-request';

const Hobbys = ({ hobbys, currentUser, profile }) => {
  const [chosenHobby, setChosenHobby] = useState('');
  const [activeHobbys, setActiveHobbys] = useState(hobbys);
  const [hobby, setHobby] = useState('');

  const isInitialMount = useRef(true);

  const [patchProfileHobbyRequest, patchProfilesHobbyErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      hobbys: hobby || profile.hobbys,
    },
    onSuccess: () => {
      console.log('profile updated');
    },
  });

  const [deleteHobby, deleteHobbyError] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      hobbys: [chosenHobby],
    },
    onSuccess: () => {},
  });

  const onClickAddHobby = (e) => {
    e.preventDefault();

    console.log('update hobby z komponentu hobby');
    patchProfileHobbyRequest();
    setActiveHobbys((arr) => [...arr, hobby]);
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
      console.log('Use effect');
      onClickDeleteHobby();
    }
  }, [chosenHobby]);

  return (
    <div>
      <h1 className="lead text-center pt-3">Hobbys:</h1>
      <div className="container">
        <div className="text-align-start">
          <div className="row mb-5">
            <div className="col">
              {activeHobbys.map((hobby) => {
                return hobby ? (
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
                  </div>
                ) : null;
              })}
            </div>
            <div className="col">
              {activeHobbys.map((hobby) => {
                return hobby ? (
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
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
      <form className="justify-content-center">
        <div className="container">
          <label className="form-label" htmlFor="hobbys">
            Add hobby
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              // style={{ width: 50 + 'px' }}
              placeholder="programowanie"
              aria-label="Hobbys"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <button className="btn btn-primary" onClick={onClickAddHobby}>
            Add hobby
          </button>
          {/* <button className="btn btn-primary">Save</button> */}
        </div>
      </form>
    </div>
  );
};

// return (
//   <div>
//     <h1 className="lead text-center pt-3">Hobbys:</h1>
//     <div className="container">
//       <div className="text-align-start">
//         {activeHobbys.map((hobby) => {
//           return hobby ? (
//             <div className="row mb-5">
//               <div className="col-md-3">
//                 <div
//                   key={hobby}
//                   className="bg-primary text-white text-center rounded"
//                 >
//                   {hobby}
//                   <button
//                     className="btn bi bi-patch-minus"
//                     value={hobby}
//                     onClick={(e) => {
//                       setChosenHobby(e.target.value);
//                     }}
//                   ></button>
//                 </div>
//               </div>
//             </div>
//           ) : null;
//         })}
//       </div>
//     </div>
//     <form className="justify-content-center">
//       <div className="container">
//         <label className="form-label" htmlFor="hobbys">
//           Add hobby
//         </label>
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             value={hobbys}
//             onChange={(e) => setHobby(e.target.value)}
//             // style={{ width: 50 + 'px' }}
//             placeholder="programowanie"
//             aria-label="Hobbys"
//             aria-describedby="basic-addon1"
//           ></input>
//         </div>
//         <button className="btn btn-primary">Add hobby</button>
//         <button className="btn btn-primary">Save</button>
//       </div>
//     </form>
//   </div>
// );
// };

export default Hobbys;
