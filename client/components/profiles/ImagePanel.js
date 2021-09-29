import { useState, useEffect, useRef } from 'react';
import UseRequest from '../../hooks/use-request';

const ImagePanel = ({ profile, currentUser }) => {
  const [profilePhoto, setProfilePhoto] = useState();
  const [profilePhotoName, setProfilePhotoName] = useState('Choose file');
  const [photoUrl, setPhotoUrl] = useState(profile.profilePhoto);
  const isInitialMount = useRef(true);

  const [patchProfilePhotoRequest, patchProfilePhotoErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/photo`,
    method: 'patch',
    body: {
      photoUrl: photoUrl,
    },
    onSuccess: () => {
      console.log('Profile Photo updated');
    },
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      patchProfilePhotoRequest();
    }
  }, [photoUrl]);

  const uploadProfilePhoto = async () => {
    const photo = profilePhoto;
    const response = await fetch('/api/s3', {
      method: 'post',
      body: JSON.stringify({
        type: photo.type,
        name: photo.name,
      }),
    });

    const { url } = await response.json();

    await fetch(url, {
      method: 'PUT',
      body: photo,
      headers: {
        'Content-Type': photo.type,
      },
    });

    setPhotoUrl(
      `https://meetbe-images.s3.eu-central-1.amazonaws.com/profilePhotos/${photo.name}`
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    uploadProfilePhoto();
  };

  const onChange = (e) => {
    setProfilePhoto(e.target.files[0]);
    setProfilePhotoName(e.target.files[0].name);
  };

  return (
    <div className="profile__basic-info-image-container">
      <div className="profile__basic-info-image">
        <img
          src={photoUrl}
          style={{
            position: 'relative',
            minWidth: '200px',
            maxWidth: '200px',
            minHeight: '200px',
            maxHeight: '200px',
          }}
        ></img>
      </div>
      <form onSubmit={onSubmit} className="profile__basic-info-image-form">
        <div className="profile__basic-info-image-form-container">
          <label>
            {profilePhotoName}
            <input
              className="profile__basic-info-image-submit"
              type="file"
              name="photo"
              onChange={onChange}
            />
          </label>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default ImagePanel;
