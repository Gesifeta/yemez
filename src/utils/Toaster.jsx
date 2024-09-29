
const Toaster = ({trigger,  message}) => {

  //remove toaster
  new Promise((resolve) => {
    trigger &&
      resolve(
        setTimeout(() => {
          document.querySelector(".app__toaster").classList.add("hide");
        }, 3000)
      ) &&
      resolve(
        document.querySelector(".app__toaster-progress").classList.add("show")
      );
  }).then(() => {
    document.querySelector(".app__toaster").classList.remove("hide");
    document.querySelector(".app__toaster-progress").classList.remove("show");
  });
  return <div className="app__toaster">{message}
  <div className="app__toaster-progress">k</div>
  </div> 
};
export default Toaster;
