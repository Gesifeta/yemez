import SidebarWrapper from "./SidebarWrapper";

const Sidebar = () => {
  return (
    <div className="app__sidebar">
      <ul>
        {["Appliances", "Used", "Mobile", "Desktop", "Laptops", "Tablets"].map(
          (category, index) => (
            <li key={`${category}-${index}`}>{category}</li>
          )
        )}
      </ul>
    </div>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default SidebarWrapper(Sidebar, "sidebar-left");
