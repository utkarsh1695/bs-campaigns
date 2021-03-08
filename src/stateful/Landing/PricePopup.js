import "./index.scss";
import dummy from "../../assets/dummy.png";

export default function PricePopup({ selectedApp, popupOpen, setPopupOpen }) {
  const { name, region } = selectedApp;

  return (
    <div className={`price-popup ${popupOpen ? '__open' : ''}`}>
      <div className="content">
        <div className="upper">
          <img src={dummy} alt="selected-app-logo" />
          <div className="text">
            <div className="name">{name}</div>
            <div className="region">{region}</div>
          </div>
        </div>
        <div className="lower">
          <h3>Pricing</h3>
          <div className="pricing">
            <div className="slab">
              <div className="duration">1 Week - 1 Month</div>
              <div className="amount">$100.0</div>
            </div>
            <div className="slab">
              <div className="duration">6 Months</div>
              <div className="amount">$500.0</div>
            </div>
            <div className="slab">
              <div className="duration">1 Year</div>
              <div className="amount">$900.0</div>
            </div>
          </div>
        </div>
        <button onClick={() => setPopupOpen(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
