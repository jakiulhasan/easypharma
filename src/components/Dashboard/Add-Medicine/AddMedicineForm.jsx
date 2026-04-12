import React, { useState, useEffect } from "react";
import { Plus, Trash2, Send } from "lucide-react";

const AddMedicineForm = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
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

  // Calculation logic
  useEffect(() => {
    const subTotal = medicines.reduce(
      (acc, curr) => acc + curr.quantity * curr.buyPrice,
      0,
    );
    const grandTotal = subTotal - commission;
    setTotals({ subTotal, grandTotal });
  }, [medicines, commission]);

  const handleInputChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;

    // Auto total calculation
    if (field === "quantity" || field === "buyPrice") {
      updatedMedicines[index].totalBuy =
        updatedMedicines[index].quantity * updatedMedicines[index].buyPrice;
    }

    setMedicines(updatedMedicines);
  };

  const addMoreRow = () => {
    setMedicines([
      ...medicines,
      {
        id: Date.now(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", { medicines, totals, commission });
    alert("Medicine Data Submitted Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plus className="bg-green-600 text-white rounded-full p-1" size={24} />
        Add New Stock
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="w-full mb-4">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 px-2">Sl</th>
                <th className="pb-3 px-2">Medicine Name</th>
                <th className="pb-3 px-2">Code</th>
                <th className="pb-3 px-2">Expiry</th>
                <th className="pb-3 px-2 w-24">Qty</th>
                <th className="pb-3 px-2">Buy Price</th>
                <th className="pb-3 px-2">Sell Price</th>
                <th className="pb-3 px-2">Location</th>
                <th className="pb-3 px-2">Total Buy</th>
                <th className="pb-3 px-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {medicines.map((med, index) => (
                <tr
                  key={med.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-2 text-sm font-bold text-gray-500">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </td>

                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      placeholder="Napa..."
                      required
                    />
                  </td>

                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={med.code}
                      onChange={(e) =>
                        handleInputChange(index, "code", e.target.value)
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      placeholder="MED101"
                    />
                  </td>

                  <td className="py-2 px-2">
                    <input
                      type="date"
                      value={med.expiry}
                      onChange={(e) =>
                        handleInputChange(index, "expiry", e.target.value)
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      required
                    />
                  </td>

                  <td className="py-2 px-2">
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
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      min="0"
                    />
                  </td>

                  <td className="py-2 px-2">
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
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      min="0"
                    />
                  </td>

                  <td className="py-2 px-2">
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
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      min="0"
                    />
                  </td>

                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={med.location}
                      onChange={(e) =>
                        handleInputChange(index, "location", e.target.value)
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 ring-green-500/20 outline-none"
                      placeholder="A5"
                    />
                  </td>

                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={med.totalBuy.toFixed(2)}
                      readOnly
                      className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 outline-none"
                    />
                  </td>

                  <td className="py-2 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addMoreRow}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl font-bold text-sm hover:bg-green-100 transition-all border border-green-200 mb-10"
        >
          <Plus size={18} /> Add More
        </button>

        {/* Calculation */}
        <div className="flex flex-col items-end gap-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-gray-500">Sub Total</label>
            <input
              type="text"
              value={totals.subTotal.toFixed(2)}
              readOnly
              className="w-40 p-2 bg-gray-50 border border-gray-200 rounded-xl text-right font-bold"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-gray-500">
              Commission (-)
            </label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
              className="w-40 p-2 border border-green-200 rounded-xl text-right font-bold text-green-700 outline-none focus:ring-2 ring-green-500/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xl font-black text-gray-800">
              Grand Total
            </label>
            <input
              type="text"
              value={totals.grandTotal.toFixed(2)}
              readOnly
              className="w-48 p-3 bg-[#053528] text-white rounded-xl text-right text-xl font-black shadow-lg"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="flex items-center gap-3 px-12 py-4 bg-[#053528] text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-green-900/20"
          >
            <Send size={20} /> Submit Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;
