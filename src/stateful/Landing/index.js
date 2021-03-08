import { Fragment } from "react";
import "./index.scss";
import { CAMPAIGN_TIMESTAMP, STORAGE_DATA_KEY } from "../../constants";
import { useState, useEffect } from "react";
import PricePopup from "./PricePopup";
import { fetchData } from "./utils";

let campaignChunk = null;

const Landing = () => {
  const [data, setData] = useState(null);
  const [currentTab, setCurrentTab] = useState({ label: 'Live Campaigns', value: CAMPAIGN_TIMESTAMP.PRESENT });
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState({});
  const [selectedAppIndex, setSelectedAppIndex] = useState(null);
  const [showComp, setShowComp] = useState(false);

  useEffect(() => {
    if (campaignChunk == null) {
      // check for mobile devices in order to import table or cards layout accordingly
      let comp = null;
      if (window.screen.width < 600) comp = import(/* webpackChunkName: "Campaigns" */ "./CardLayout");
      else comp = import(/* webpackChunkName: "Campaigns" */ "./Table");

      comp.then(value => {
        campaignChunk = value;
        setShowComp(true);
      })
    }

    // fetching campaign data
    fetchData().then(setData)
  }, []);

  // reset selected row on tab change, flushing out the previous selection
  useEffect(() => {
    setSelectedApp({})
    setSelectedAppIndex(null)
  }, [currentTab])

  // Download CSV Action
  const exportToCsv = () => { }

  // Download Report Action
  const exportToReport = () => { }

  // reschedule functionality, setting the index as the currently selected row, 
  // in order to show the datepicker on that particular row
  const reschedule = (dataObjIndex) => {
    setSelectedApp(data[currentTab.value][dataObjIndex]);
    setSelectedAppIndex(dataObjIndex);
  }

  const onDateChange = (updatedDate) => {
    // when DatePicker is closed, null is returned as updatedDate
    if (!updatedDate) {
      setSelectedAppIndex(null);
      return;
    }

    // handle date change
    const newDate = new Date(updatedDate);
    const today = new Date();
    const currentData = { ...data };
    const past = currentData[CAMPAIGN_TIMESTAMP.PAST];
    const present = currentData[CAMPAIGN_TIMESTAMP.PRESENT];
    const future = currentData[CAMPAIGN_TIMESTAMP.FUTURE];
    currentData[currentTab.value].splice(selectedAppIndex, 1);

    if (newDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      // New date less than the current date
      const daysDiff = parseInt((today.getTime() - newDate.getTime()) / (1000 * 60 * 60 * 24));
      const updatedData = { ...selectedApp, createdOn: updatedDate, durationText: `${daysDiff} Days Ago` };
      past.push(updatedData);
    } else if (newDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0)) {
      // New date more than the current date
      const daysDiff = parseInt((newDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const updatedData = { ...selectedApp, createdOn: updatedDate, durationText: `${daysDiff} Days Ahead` };
      future.push(updatedData);
    } else {
      // Case for current date i.e. Present/Today/Live Campaigns
      const updatedData = { ...selectedApp, createdOn: updatedDate, durationText: `Today` };
      present.push(updatedData);
    }
    setData({ past, present, future });
    setSelectedAppIndex(null);
    setTimeout(updateLocalStorage);
  }

  const updateLocalStorage = () => localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
  return (
    <>
      <div className="landing-root">
        <h1>Manage Campaigns</h1>
        {
          !data &&
          <div className="loader-panel">
            <div className="shine" />
          </div>
        }
        {
          data && showComp && campaignChunk !== null &&
          <campaignChunk.default
            {...{
              data, currentTab, setPopupOpen, setSelectedApp,
              selectedApp, selectedAppIndex, onDateChange,
              reschedule, exportToCsv, exportToReport, setCurrentTab
            }}
          />
        }
      </div>
      <PricePopup {...{ selectedApp, popupOpen, setPopupOpen }} />
    </>
  )
}

export default Landing;