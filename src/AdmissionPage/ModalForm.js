import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const FormDialog = ({
  dataLength,
  reloadTableData,
  open,
  handleClose,
  isEdit,
  editIndex,
  editFieldValues,
}) => {
  const initialFieldValues = {
    sIno: dataLength,
    Name: "",
    CutOff: "",
    Address: "",
    State: "",
    University: "",
  };
  const [studentInfo, setStudentInfo] = React.useState(
    isEdit ? editFieldValues : initialFieldValues
  );
  const [universityData, setUniversityData] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const serialNumber = dataLength;

  const UniversityStateDatas = [
    { name: "Assam", id: "1" },
    { name: "Haryana", id: "2" },
    { name: "Dehradun", id: "3" },
    { name: "MadhyaPradesh", id: "4" },
    { name: "Punjab", id: "5" },
    { name: "TamilNadu", id: "6" },
    { name: "UttarPradesh", id: "7" },
    { name: "WestBengal", id: "8" },
  ];

  function GetUniversityData() {
    fetch("http://universities.hipolabs.com/search?country=India")
      .then((response) => response.json())
      .then((response) => setUniversityData(response));
  }

  React.useEffect(() => {
    GetUniversityData();
    console.log(editFieldValues, "editFieldValues");
  }, []);

  const setSerialNumber = (e) => {
    const { name } = e.target;
    if (isEdit === false) {
      setStudentInfo({
        ...studentInfo,
        [name]: serialNumber,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "::::::");
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const resetForm = () => {
    setStudentInfo(initialFieldValues);
    setErrors({});
  };

  const Validate = (fieldvalues = studentInfo) => {
    let temp = { ...errors };
    if ("Name" in fieldvalues)
      temp.Name = fieldvalues.Name ? "" : "This field is Required.";
    if ("CutOff" in fieldvalues)
      temp.CutOff = fieldvalues.CutOff ? "" : "This field is Required.";
    if ("Address" in fieldvalues)
      temp.Address = fieldvalues.Address ? "" : "This field is Required.";
    if ("State" in fieldvalues)
      temp.State = fieldvalues.State ? "" : "This field is Required.";
    if ("University" in fieldvalues)
      temp.University = fieldvalues.University ? "" : "This field is Required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleStorageDataSave = () => {
    const retrievedStudentInfo = JSON.parse(
      localStorage.getItem("studentInfo")
    );
    if (retrievedStudentInfo) {
      if (isEdit && editIndex !== "") {
        retrievedStudentInfo[editIndex] = studentInfo;
      } else {
        retrievedStudentInfo.push(studentInfo);
      }
      localStorage.setItem("studentInfo", JSON.stringify(retrievedStudentInfo));
    } else {
      localStorage.setItem("studentInfo", JSON.stringify([studentInfo]));
    }
    reloadTableData();
    resetForm();
    handleClose();
    window.alert("Submitted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validate()) {
      handleStorageDataSave();
    } else {
      window.alert("Error Submitting");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Admission Form</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              style={{ marginTop: "20px" }}
              margin="dense"
              autoFocus
              id="sIno"
              label="Serial Number"
              name="sIno"
              value={studentInfo.sIno}
              onChange={setSerialNumber}
              onFocus={setSerialNumber}
              type="number"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              style={{ marginTop: "20px" }}
              margin="dense"
              id="name"
              label="Student Name"
              name="Name"
              value={studentInfo.Name}
              onChange={handleInputChange}
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              style={{ marginTop: "20px" }}
              margin="dense"
              id="CutOff"
              label="Student CutOff"
              name="CutOff"
              value={studentInfo.CutOff}
              onChange={handleInputChange}
              type="number"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              style={{ marginTop: "20px" }}
              margin="dense"
              id="Address"
              label="Student Address"
              name="Address"
              value={studentInfo.Address}
              onChange={handleInputChange}
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <FormControl
              style={{ marginTop: "20px" }}
              fullWidth
              variant="outlined"
            >
              <InputLabel>Prefered State *</InputLabel>
              <Select
                name="State"
                id="State"
                value={studentInfo.State}
                onChange={handleInputChange}
                required
              >
                {UniversityStateDatas.map((UniversityStateData) => (
                  <MenuItem
                    key={UniversityStateData.id}
                    value={UniversityStateData.name}
                  >
                    {UniversityStateData.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              style={{ marginTop: "20px" }}
              fullWidth
              variant="outlined"
            >
              <InputLabel>Prefered University *</InputLabel>
              <Select
                name="University"
                id="University"
                value={studentInfo.University}
                onChange={handleInputChange}
                required
              >
                {universityData.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button size="large" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="large" variant="outlined" onClick={resetForm}>
              Reset
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default FormDialog;
