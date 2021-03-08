import "./index.css";

const Tabs = ({ config, active, setTab }) => {
  return (
    <div className="tabs-root">
      {
        config?.map(({ label, value }) => (
          <div key={value} className={`tab-item ${active === value ? 'tab-item-active' : ""}`} onClick={() => setTab({ label, value })}>
            {label}
          </div>
        ))
      }
    </div>
  )
}

export default Tabs;