import React from "react";
import Header from "../../Header/Header";
import AddMedicineForm from "./AddMedicineForm";

const AddMedicine = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <Header title={"Add Medicine"}></Header>
      <AddMedicineForm></AddMedicineForm>
    </div>
  );
};

export default AddMedicine;
