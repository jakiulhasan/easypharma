import React, { useState, useEffect, useContext } from "react";
import { Plus, Trash2, Send, MapPin } from "lucide-react";
import { AuthContext } from "../../../context/auth/AuthContext";

const AddMedicineForm = () => {
  const { user } = useContext(AuthContext);

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      user: user?.email || "",
      type: "Tablet",
      name: "",
      code: "",
      expiry: "",
      quantity: 0,
      buyPrice: 0,
      sellPrice: 0,
      location: "",
      totalBuy: 0,
    },
  ]);

  const [commission, setCommission] = useState(0);
  const [totals, setTotals] = useState({ subTotal: 0, grandTotal: 0 });

  useEffect(() => {
    const subTotal = medicines.reduce(
      (acc, curr) => acc + curr.quantity * curr.buyPrice,
      0,
    );
    const grandTotal = subTotal - commission;

    setTotals({ subTotal, grandTotal });
  }, [medicines, commission]);

  const handleInputChange = (index, field, value) => {
    const updatedMedicines = medicines.map((item, i) => {
      if (i !== index) return item;

      const updatedItem = { ...item, [field]: value };

      if (field === "quantity" || field === "buyPrice") {
        updatedItem.totalBuy =
          (updatedItem.quantity || 0) * (updatedItem.buyPrice || 0);
      }

      return updatedItem;
    });

    setMedicines(updatedMedicines);
  };

  const addMoreRow = () => {
    setMedicines([
      ...medicines,
      {
        id: Date.now(),
        user: user?.email || "",
        type: "Tablet",
        name: "",
        code: "",
        expiry: "",
        quantity: 0,
        buyPrice: 0,
        sellPrice: 0,
        location: "",
        totalBuy: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mx-auto my-10">
      <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-1">
        <Plus className="bg-[#053528] text-white rounded-lg p-1.5" size={32} />
        Update Stock Inventory
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-[11px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="p-4 w-12 text-center">SL</th>
                <th className="p-4 w-28">Type</th>
                <th className="p-4 min-w-[150px]">Medicine Name</th>
                <th className="p-4 w-28">Code</th>
                <th className="p-4 w-36">Expiry</th>
                <th className="p-4 w-20 text-center">QTYY</th>
                <th className="p-4 w-28 text-right">Buy (৳)</th>
                <th className="p-4 w-28 text-right">Sell (৳)</th>
                <th className="p-4 w-32">Location</th>
                <th className="p-4 w-32 text-right">Total Buy</th>
                <th className="p-4 w-16 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {medicines.map((med, index) => (
                <tr key={med.id} className="hover:bg-gray-50/50 transition-all">
                  {/* SL */}
                  <td className="p-1 text-center text-xs font-bold text-gray-400">
                    {index + 1}
                  </td>

                  {/* TYPE */}
                  <td className="p-1">
                    <select
                      value={med.type}
                      onChange={(e) =>
                        handleInputChange(index, "type", e.target.value)
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                    >
                      <option value="Tablet">Tablet</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Injection">Injection</option>
                      <option value="Insulin">Insulin</option>
                    </select>
                  </td>

                  {/* NAME */}
                  <td className="p-1">
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 ring-green-500/20 outline-none"
                      placeholder="Enter Name..."
                    />
                  </td>

                  {/* CODE */}
                  <td className="p-1">
                    <input
                      type="text"
                      value={med.code}
                      onChange={(e) =>
                        handleInputChange(index, "code", e.target.value)
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                      placeholder="Code"
                    />
                  </td>

                  {/* EXPIRY */}
                  <td className="p-1">
                    <input
                      type="date"
                      value={med.expiry}
                      onChange={(e) =>
                        handleInputChange(index, "expiry", e.target.value)
                      }
                      className="w-full p-2 border border-gray-200 rounded-xl text-xs outline-none"
                    />
                  </td>

                  {/* QUANTITY */}
                  <td className="p-1">
                    <input
                      type="number"
                      value={med.quantity}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm font-bold text-center outline-none"
                    />
                  </td>

                  {/* BUY */}
                  <td className="p-1">
                    <input
                      type="number"
                      value={med.buyPrice}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "buyPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm text-right outline-none"
                    />
                  </td>

                  {/* SELL */}
                  <td className="p-1">
                    <input
                      type="number"
                      value={med.sellPrice}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "sellPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm text-right outline-none"
                    />
                  </td>

                  {/* LOCATION */}
                  <td className="p-1">
                    <div className="flex items-center gap-1.5 bg-white px-2 py-2.5 rounded-lg border border-gray-100">
                      <MapPin size={14} className="text-gray-400" />
                      <input
                        type="text"
                        value={med.location}
                        onChange={(e) =>
                          handleInputChange(index, "location", e.target.value)
                        }
                        className="w-full bg-transparent text-xs font-semibold outline-none"
                        placeholder="A1 / B2"
                      />
                    </div>
                  </td>

                  {/* TOTAL */}
                  <td className="p-1 text-right font-black">
                    ৳ {med.totalBuy.toLocaleString()}
                  </td>

                  {/* ACTION */}
                  <td className="p-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-gray-300 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-between">
          <div>
            <button
              type="button"
              onClick={addMoreRow}
              className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-2xl font-bold cursor-pointer"
            >
              <Plus size={20} /> Add New Medicine
            </button>
          </div>

          <div className="w-96 p-6 bg-gray-50 rounded-3xl space-y-3">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>৳ {totals.subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Commission</span>
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                className="w-24 text-right border rounded px-2"
              />
            </div>

            <div className="flex justify-between font-black text-lg">
              <span>Grand Total</span>
              <span>৳ {totals.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="px-16 py-4 bg-[#053528] text-white rounded-2xl font-black flex gap-5 justify-center items-center"
          >
            <Send size={20} /> Save Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;
