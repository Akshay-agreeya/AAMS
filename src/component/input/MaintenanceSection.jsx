import React, { useEffect, useState } from "react";
import { getData } from "../../utils/CommonApi";
import { FormItem } from "../form/FormItem";
import { Select } from "./Select";

export const MaintenanceSection = ({ scanFrequency, scanDay, scheduleTime, onChange }) => {
  const [frequencies, setFrequencies] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    loadScanFrequencies();
    loadScanDays();
  }, []);

  const loadScanFrequencies = async () => {
    try {
      const resp = await getData("/lookup/frequency");
      const options = Array.isArray(resp.data)
        ? resp.data.map((item) => ({
          value: item.frequency_id,
          label: item.scan_frequency,
        }))
        : [];
      setFrequencies(options);
    } catch (error) {
      console.error("Error fetching scan frequencies:", error);
    }
  };

  const loadScanDays = async () => {
    try {
      const resp = await getData("/lookup/scan-days");
      const options = Array.isArray(resp.data)
        ? resp.data.filter(item=>item.Scan_day_id<8).map((item) => ({
          value: item.Scan_day_id,
          label: item.day_name,
        }))
        : [];
      setDays(options);
    } catch (error) {
      console.error("Error fetching scan days:", error);
    }
  };

  return (
    <>
      <div className="col-12 col-lg-4">
        <FormItem label="Scan Frequency"
          name="frequency_id"
          rules={[{ required: true, message: "Scan Frequency is required" }]}
          requiredMark={true}
        >
          <Select
            name="frequency_id"
            value={scanFrequency}
            onChange={onChange}
            options={frequencies}
          />
        </FormItem>
      </div>

      <div className="col-12 col-lg-4">
        <FormItem name="scan_day_ids" label="Scan Day"
          rules={[{ required: true, message: "Scan Day is required" }]}
          requiredMark={true}
        >
          <Select
            name="scan_day_ids"
            options={days}
          />
        </FormItem>
      </div>

      <div className="col-12 col-lg-4">
        <FormItem name="schedule_time" label="Schedule Time"
          rules={[{ required: true, message: "Scan Time is required" }]}
          requiredMark={true}
        >
          <input
            type="time"
            name="scheduleTime"
            value={scheduleTime}
            onChange={onChange}
            className="form-control"
          />
        </FormItem>
      </div>
    </>
  );
};
