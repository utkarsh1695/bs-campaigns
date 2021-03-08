import React from 'react';
import { getVerbalDate, TAB_CONFIG } from "../../constants";
import DatePicker from 'react-date-picker';
import dummy from "../../assets/dummy.png";
import priceImg from "../../assets/price.png";
import reportImg from "../../assets/report.png";
import fileImg from "../../assets/file.png";
import calenderImg from "../../assets/calendar.png";
import Tabs from '../../stateless/Tabs';

export default function Table({
  data, currentTab, setPopupOpen, setSelectedApp,
  selectedApp, selectedAppIndex, onDateChange,
  reschedule, exportToCsv, exportToReport, setCurrentTab
}) {
  return (
    <>
      <Tabs active={currentTab.value} config={TAB_CONFIG} setTab={setCurrentTab} />
      {
        data[currentTab.value]?.length === 0 ?
          <div className="no-data">No Campaigns!</div>
          :
          <table>
            <thead>
              <th>DATE</th>
              <th>CAMPAIGN</th>
              <th>VIEW</th>
              <th>ACTIONS</th>
            </thead>
            <tbody>
              {
                data[currentTab.value].map(({ name, region, createdOn, price, csv, report, image_url, durationText }, index) => (
                  <tr key={`${name}-${Math.random()}`}>
                    <td>
                      <div className="date-col">
                        <div className="text">{getVerbalDate(createdOn, true).verbalDate}</div>
                        <div className="sub-text">{durationText}</div>
                      </div>
                    </td>
                    <td>
                      <div className="campaign-col">
                        <img src={dummy} alt="campaign-type" />
                        <div className="campaign-text">
                          <div className="text">{name}</div>
                          <div className="sub-text">{region}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="view-col">
                        <img
                          className="small"
                          src={priceImg}
                          alt="view-type"
                          onClick={() => {
                            setPopupOpen(true);
                            setSelectedApp(data[currentTab.value][index]);
                          }}
                        />
                        <div className="text">
                          View Pricing
                    </div>
                      </div>
                    </td>
                    <td>
                      <div className="action-col">
                        <div className="action-csv">
                          <img className="small" src={fileImg} alt="action-csv" onClick={exportToCsv} />
                          <div className="text">CSV</div>
                        </div>
                        <div className="action-report">
                          <img className="small" src={reportImg} alt="action-report" onClick={exportToReport} />
                          <div className="text">Report</div>
                        </div>
                        <div className="action-reschedule">
                          <img className="small" src={calenderImg} alt="action-reschedule" onClick={() => reschedule(index)} />
                          {
                            selectedAppIndex === index ?
                              <div className="date-picker-wrapper">
                                <DatePicker
                                  value={new Date(selectedApp.createdOn)}
                                  onChange={onDateChange}
                                />
                              </div>
                              :
                              <div className="text">Schedule Again</div>
                          }
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </>
  )
}
