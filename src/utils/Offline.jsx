import { useState } from "react";
const Offline = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  window.addEventListener("online", () => {
    setIsOnline(true);
    setTimeout(() => {
       setIsExpired(true);
    }, 5000);
  });
  
  window.addEventListener("offline", () => {
    setIsOnline(false);
    setIsExpired(false);
  });
  return (
    <div className="app__offline">
      {!isOnline ? (
        <div className="app__offline-error">
          <h1>Oops! You are offline</h1>
        </div>
      ) : (
        <></>
      )}

      {!isExpired && isOnline && (
        <div className="app__offline-online">
          <h1>Online</h1>
        </div>
      )}
    </div>
  );
};

export default Offline;
