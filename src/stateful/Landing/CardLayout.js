import React, { useState } from 'react';
import { getVerbalDate, TAB_CONFIG } from "../../constants";
import DatePicker from 'react-date-picker';
import dummy from "../../assets/dummy.png";
import priceImg from "../../assets/price.png";
import reportImg from "../../assets/report.png";
import fileImg from "../../assets/file.png";
import calenderImg from "../../assets/calendar.png";

export default function Table({
  data, currentTab, setPopupOpen, setSelectedApp,
  selectedApp, selectedAppIndex, onDateChange,
  reschedule, exportToCsv, exportToReport, setCurrentTab
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-layout-root">
      <div className="campaign-type-selected" onClick={() => setOpen(!open)}>
        {currentTab.label} <span className="arrow" />
        <div className={`campaign-type-values ${open ? "open" : ""}`}>
          {
            TAB_CONFIG.map(({ value, label }) =>
              <div key={`tab_dropdown_${value}`} className="dropdown-item" onClick={() => {
                setOpen(false)
                setCurrentTab({ value, label })
              }}>{label}</div>
            )
          }
        </div>
      </div>
      {
        data[currentTab.value]?.length === 0 &&
        <div className="no-data">No Campaigns!</div>
      }
      {
        data[currentTab.value].map(({ name, region, createdOn, durationText }, index) => (
          <div className="card-root" key={`${name}-${Math.random()}`}>
            <div className="section date-col">
              <div className="text">{getVerbalDate(createdOn, true).verbalDate}</div>
              <div className="sub-text">{durationText}</div>
            </div>
            <div className="section campaign-col">
              <img src={dummy} alt="campaign-type" />
              <div className="campaign-text">
                <div className="text">{name}</div>
                <div className="sub-text">{region}</div>
              </div>
            </div>
            <div className="section action-col">
              <img
                className="small"
                src={priceImg}
                alt="view-type"
                onClick={() => {
                  setPopupOpen(true);
                  setSelectedApp(data[currentTab.value][index]);
                }}
              />
              <img className="small" src={fileImg} alt="action-csv" onClick={exportToCsv} />
              <img className="small" src={reportImg} alt="action-report" onClick={exportToReport} />
              <img className="small" src={calenderImg} alt="action-reschedule" onClick={() => reschedule(index)} />
              {
                selectedAppIndex === index &&
                <DatePicker
                  className="date-picker-mobile"
                  value={new Date(selectedApp.createdOn)}
                  onChange={onDateChange}
                />
              }
            </div>
          </div>
        ))
      }
    </div >
  )
}
