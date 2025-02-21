export const MaintenanceSection = ({ scanFrequency, scanDay, scheduleTime, onChange }) => {
  return (
    <div className="row">
      <div className="col-12 col-lg-4">
        <select name="scanFrequency" value={scanFrequency} onChange={onChange} className="form-select">
          <option value="">Select Scan Frequency</option>
          <option value="1">Weekly</option>
          <option value="2">Monthly</option>
          <option value="3">Daily</option>
        </select>
      </div>
      <div className="col-12 col-lg-4">
        <select name="scanDay" value={scanDay} onChange={onChange} className="form-select">
          <option value="">Select Scan Day</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
          <option value="7">Sunday</option>
        </select>
      </div>
      <div className="col-12 col-lg-4">
        <input type="time" name="scheduleTime" value={scheduleTime} onChange={onChange} className="form-control" />
      </div>
    </div>
  );
};