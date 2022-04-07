import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./employee.css";
import "../Home.css";
type props = {
  entry: boolean;
  exit: boolean;
  msg: boolean;
  datesData: string;
  timesData: string;
  username:any
};
class DailyAttendance extends React.Component<
  props,
  {
    entry: boolean;
    exit: boolean;
    msg: boolean;
    datesData: string;
    timesData: string;
    username:any
  }
> {
  constructor(props: props) {
    super(props);
    let date = new Date();
    const dates =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    const times =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.state = {
      entry: false,
      exit: false,
      msg: false,
      datesData:dates,
      timesData:times,
      username:this.props.username
    };
  }
  entryHandler = () => {
    this.setState({ entry: true });
    localStorage.setItem("datesdata", this.state.datesData);
    localStorage.setItem("timesdata", this.state.timesData);
  };
  exitHandler = () => {
    this.setState({ exit: true });
    this.setState({ msg: true });
  };
  render() {
    return (
      <>
        <Navbar personalData leaveData employeeData username={this.props.username}/>
        <div style={{ textAlign: "center" }}>
        <span style={{ textDecoration: "underline" }}>Daily Attendance</span>
        <hr />
        <h3 style={{ color: "green" }}>
          {this.state.entry && !this.state.msg && "Successfully Checked in"}
        </h3>
        <h3 style={{ color: "red" }}>
          {this.state.exit && this.state.msg && "Successfully Checked out"}
        </h3>
        <button onClick={this.entryHandler} className="anybutton">CheckIn</button>
        <button onClick={this.exitHandler} className="anybutton">CheckOut</button>
        <table id="data" style={{ marginLeft: "500px" }}>
          <thead>
            <tr>
              <td>
                <h3>CheckinTime </h3>
              </td>
              <td>
                <h3>CheckOutTime </h3>
              </td>
              <td>
                <h3>Status</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {this.state.entry &&
                  localStorage.getItem("datesdata") +
                    "-" +
                    localStorage.getItem("timesdata")}
              </td>
              <td>
                {this.state.exit && this.state.msg &&
                  new Date().getDate() +
                    "/" +
                    new Date().getMonth() +
                    "/" +
                    new Date().getFullYear() +
                    "-" +
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ":" +
                    new Date().getSeconds()}
              </td>
              <td>{!this.state.exit ? "" : "Present"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </>
    );
  }
}
export default DailyAttendance;
