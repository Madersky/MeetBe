import Image from 'next/image';

const ImagePanel = ({ profileImage }) => {
  return (
    <div
      // className=""
      style={{ position: 'relative', minWidth: '200px', minHeight: '200px' }}
    >
      <Image
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
