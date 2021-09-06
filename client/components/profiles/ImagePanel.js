import Image from 'next/image';

const ImagePanel = ({ profileImage }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      // style={{ position: 'relative', width: '200px', height: '200px' }}
    >
      <img
        layout="fill"
        src={`/${profileImage}`}
        alt="Profile Photo"
        width="200"
        height="200"
      />
    </div>
  );
};

export default ImagePanel;
