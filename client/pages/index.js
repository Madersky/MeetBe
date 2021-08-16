import buildClient from "../api/buildClient";

const overlayHide = () => {
  let overlay = document.getElementById("overlay");
  // hide.style.transition = 'ease 1s';
  // hide.style.transform = 'translateY(200px)';
  overlay.style.animation = "overlay-hide 1s";

  setTimeout(function () {
    overlay.style.display = "none";
  }, 500);
};

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <div className="welcome-container">
      <div className="content">
        <div className="loading-animation" data-text="Let'sMeet">
          Let'sMeet
        </div>
        <div className="card-1">
          Add posts! <br></br>
          <br></br>
Create your own content on Let's Meet!
        </div>
        <div className="card-2">
          Find friends! <br></br>
          <br></br>Your friends is also using Let's Meet? Find them!
        </div>
        <div className="card-3">
          Propose a meeting! <br></br>
          <br></br>Create your own events, invite friends!
        </div>
      </div>
      <div className="overlay" id="overlay">
        <div className="overlay-logo" onClick={overlayHide}></div>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
