/* eslint-disable react/display-name */
 const SidebarWrapper =(Component,idName)=> () => {
  return (
    <div className={`app__sidebar-wrapper ${idName}`}>
     <Component />
    </div>
  )
}
export default SidebarWrapper
