import React, { useState, useEffect, useContext, useRef } from "react";
import { Plus, Trash2, Send, MapPin, Search, X } from "lucide-react";
import { AuthContext } from "../../../context/auth/AuthContext";
import axios from "axios";

const API_BASE_URL = "https://easypharma-backend.vercel.app/api";

const AddMedicineForm = () => {
  const { user } = useContext(AuthContext);

  const [medicines, setMedicines] = useState([
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

  const [commission, setCommission] = useState(0);
  const [totals, setTotals] = useState({ subTotal: 0, grandTotal: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search related states
  const [searchQuery, setSearchQuery] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState({});
  const [showAddNewOption, setShowAddNewOption] = useState({});

  const searchTimeoutRef = useRef({});
  const suggestionRefs = useRef({});

  // Function to generate a unique 5-digit ID
  const generateUniqueId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicines/all-ids`);
      const existingIds = response.data;

      let newId;
      do {
        newId = Math.floor(10000 + Math.random() * 90000).toString();
      } while (existingIds.includes(newId));

      return newId;
    } catch (error) {
      console.error("Error generating unique ID:", error);
      return Math.floor(10000 + Math.random() * 90000).toString();
    }
  };

  useEffect(() => {
    const subTotal = medicines.reduce(
      (acc, curr) => acc + curr.quantity * curr.buyPrice,
      0,
    );
    const grandTotal = subTotal - commission;

    setTotals({ subTotal, grandTotal });
  }, [medicines, commission]);

  // Search medicines from MongoDB
  const searchMedicines = async (query, rowIndex) => {
    if (!query || query.length < 2) {
      setSuggestions((prev) => ({ ...prev, [rowIndex]: [] }));
      setShowAddNewOption((prev) => ({ ...prev, [rowIndex]: false }));
      return;
    }

    setIsLoading((prev) => ({ ...prev, [rowIndex]: true }));

    try {
      const response = await axios.get(`${API_BASE_URL}/medicines/search`, {
        params: { q: query },
      });
      const data = response.data;

      setSuggestions((prev) => ({ ...prev, [rowIndex]: data }));

      const exactMatch = data.some(
        (medicine) => medicine.name.toLowerCase() === query.toLowerCase(),
      );

      setShowAddNewOption((prev) => ({
        ...prev,
        [rowIndex]: !exactMatch && query.trim().length > 0,
      }));
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions((prev) => ({ ...prev, [rowIndex]: [] }));
      setShowAddNewOption((prev) => ({ ...prev, [rowIndex]: true }));
    } finally {
      setIsLoading((prev) => ({ ...prev, [rowIndex]: false }));
    }
  };

  // Add new medicine to database
  const addNewMedicine = async (index, medicineName) => {
    setIsLoading((prev) => ({ ...prev, [index]: true }));

    try {
      const uniqueId = await generateUniqueId();

      const newMedicine = {
        id: uniqueId,
        name: medicineName,
        type: medicines[index].type || "Tablet",
      };

      const response = await axios.post(
        `${API_BASE_URL}/medicines`,
        newMedicine,
      );

      if (response.data) {
        const savedMedicine = response.data;

        handleInputChange(index, "name", savedMedicine.name);
        handleInputChange(index, "code", savedMedicine.id);

        setSuggestions((prev) => ({ ...prev, [index]: [] }));
        setShowAddNewOption((prev) => ({ ...prev, [index]: false }));
        setSearchQuery((prev) => ({ ...prev, [index]: savedMedicine.name }));

        // Show success message
        alert(
          `New medicine "${savedMedicine.name}" added with ID: ${savedMedicine.id}`,
        );
      }
    } catch (error) {
      console.error("Error adding new medicine:", error);
      alert(
        error.response?.data?.error ||
          "Failed to add new medicine. Please try again.",
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  // Debounced search handler
  const handleNameSearch = (index, value) => {
    handleInputChange(index, "name", value);
    setSearchQuery((prev) => ({ ...prev, [index]: value }));

    if (searchTimeoutRef.current[index]) {
      clearTimeout(searchTimeoutRef.current[index]);
    }

    searchTimeoutRef.current[index] = setTimeout(() => {
      searchMedicines(value, index);
    }, 300);
  };

  // Select medicine from suggestions
  const selectMedicine = (index, medicine) => {
    const updatedMedicines = medicines.map((item, i) => {
      if (i !== index) return item;

      const updatedItem = {
        ...item,
        name: medicine.name,
        code: medicine.id.toString(),
      };

      // Recalculate totalBuy if quantity and buyPrice exist
      if (updatedItem.quantity && updatedItem.buyPrice) {
        updatedItem.totalBuy = updatedItem.quantity * updatedItem.buyPrice;
      }

      return updatedItem;
    });

    setMedicines(updatedMedicines);
    setSuggestions((prev) => ({ ...prev, [index]: [] }));
    setShowAddNewOption((prev) => ({ ...prev, [index]: false }));
    setSearchQuery((prev) => ({ ...prev, [index]: medicine.name }));
    setActiveSuggestionIndex((prev) => ({ ...prev, [index]: -1 }));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    const suggestionList = suggestions[index] || [];
    const showAddNew = showAddNewOption[index];

    const totalOptions = suggestionList.length + (showAddNew ? 1 : 0);

    if (totalOptions === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => ({
        ...prev,
        [index]: Math.min((prev[index] || -1) + 1, totalOptions - 1),
      }));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => ({
        ...prev,
        [index]: Math.max((prev[index] || 0) - 1, -1),
      }));
    } else if (e.key === "Enter" && activeSuggestionIndex[index] >= 0) {
      e.preventDefault();
      if (
        showAddNew &&
        activeSuggestionIndex[index] === suggestionList.length
      ) {
        addNewMedicine(index, searchQuery[index]);
      } else if (activeSuggestionIndex[index] < suggestionList.length) {
        selectMedicine(index, suggestionList[activeSuggestionIndex[index]]);
      }
    } else if (e.key === "Escape") {
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
      setShowAddNewOption((prev) => ({ ...prev, [index]: false }));
      setActiveSuggestionIndex((prev) => ({ ...prev, [index]: -1 }));
    }
  };

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
      setSuggestions((prev) => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
      setSearchQuery((prev) => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
      setShowAddNewOption((prev) => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least one medicine is added
    const validMedicines = medicines.filter(
      (med) => med.name && med.quantity > 0,
    );
    if (validMedicines.length === 0) {
      alert("Please add at least one medicine with valid name and quantity");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare inventory items and buy history items
      const inventoryItems = [];
      const buyHistoryItems = [];
      const currentDate = new Date();

      for (const medicine of medicines) {
        if (!medicine.name || medicine.quantity === 0) continue;

        // Check if medicine exists in medicine_list to get the ID
        let medicineId = medicine.code;

        if (!medicineId) {
          // Search for the medicine to get its ID
          const searchResponse = await axios.get(
            `${API_BASE_URL}/medicines/search`,
            {
              params: { q: medicine.name },
            },
          );

          if (searchResponse.data.length > 0) {
            medicineId = searchResponse.data[0].id;
          } else {
            // Create new medicine if not found
            const newMedicineResponse = await axios.post(
              `${API_BASE_URL}/medicines`,
              {
                name: medicine.name,
                type: medicine.type,
                id: await generateUniqueId(),
              },
            );
            medicineId = newMedicineResponse.data.id;
          }
        }

        // Prepare inventory item
        inventoryItems.push({
          medicineId: medicineId,
          medicineName: medicine.name,
          type: medicine.type,
          quantity: medicine.quantity,
          buyPrice: medicine.buyPrice,
          sellPrice: medicine.sellPrice,
          expiry: medicine.expiry,
          location: medicine.location,
          user: user?.email,
          createdAt: currentDate,
          updatedAt: currentDate,
        });

        // Prepare buy history item
        buyHistoryItems.push({
          medicineId: medicineId,
          medicineName: medicine.name,
          quantity: medicine.quantity,
          buyPrice: medicine.buyPrice,
          totalPrice: medicine.quantity * medicine.buyPrice,
          expiry: medicine.expiry,
          location: medicine.location,
          user: user?.email,
          purchaseDate: currentDate,
          commission: commission,
          grandTotal: totals.grandTotal,
        });
      }

      // Submit inventory and buy history
      const response = await axios.post(`${API_BASE_URL}/inventory/bulk-add`, {
        inventoryItems,
        buyHistoryItems,
        user: user?.email,
        commission,
        subTotal: totals.subTotal,
        grandTotal: totals.grandTotal,
        purchaseDate: currentDate,
      });

      if (response.data.success) {
        alert(
          `Successfully added ${response.data.inventoryCount} items to inventory and ${response.data.buyHistoryCount} items to buy history!`,
        );

        // Reset form
        setMedicines([
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
        setCommission(0);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error.response?.data?.error ||
          "Failed to save inventory. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(suggestionRefs.current).forEach((index) => {
        if (
          suggestionRefs.current[index] &&
          !suggestionRefs.current[index].contains(event.target)
        ) {
          setSuggestions((prev) => ({ ...prev, [index]: [] }));
          setShowAddNewOption((prev) => ({ ...prev, [index]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mx-auto my-10">
      <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-1">
        <Plus className="bg-[#053528] text-white rounded-lg p-1.5" size={32} />
        Update Stock Inventory
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="rounded-xl border border-gray-100">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-gray-50">
              <tr className="text-[11px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="p-4 w-12 text-center">SL</th>
                <th className="p-4 w-28">Type</th>
                <th className="p-4 min-w-[200px]">Medicine Name</th>
                <th className="p-4 w-28">Code</th>
                <th className="p-4 w-36">Expiry</th>
                <th className="p-4 w-20 text-center">QTY</th>
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
                  <td className="p-1 text-center text-xs font-bold text-gray-400">
                    {index + 1}
                  </td>

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
                      <option value="P/D">P/D</option>
                      <option value="Capsul">Capsul</option>
                      <option value="E/d">E/d</option>
                      <option value="Pot">Pot</option>
                      <option value="Ointment">Ointment</option>
                      <option value="Cream">Cream</option>
                      <option value="Suspension">Suspension</option>
                      <option value="Selain">Selain</option>
                    </select>
                  </td>

                  <td
                    className="p-1 relative"
                    ref={(el) => (suggestionRefs.current[index] = el)}
                  >
                    <div className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) =>
                            handleNameSearch(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onFocus={() => {
                            if (med.name.length >= 2) {
                              searchMedicines(med.name, index);
                            }
                          }}
                          className="w-full p-2.5 pr-8 border border-gray-200 rounded-xl text-sm focus:ring-2 ring-green-500/20 outline-none"
                          placeholder="Search medicine..."
                          autoComplete="off"
                          required
                        />
                        {isLoading[index] ? (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <Search
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        )}
                      </div>

                      {(suggestions[index]?.length > 0 ||
                        showAddNewOption[index]) && (
                        <div
                          className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
                          style={{ zIndex: 9999 }}
                        >
                          {suggestions[index]?.map((medicine, sIndex) => (
                            <div
                              key={medicine._id}
                              onClick={() => selectMedicine(index, medicine)}
                              className={`px-4 py-2.5 cursor-pointer transition-colors border-b border-gray-100 ${
                                activeSuggestionIndex[index] === sIndex
                                  ? "bg-green-50 text-green-700"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {medicine.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Code: {medicine.id}
                              </div>
                            </div>
                          ))}

                          {showAddNewOption[index] && (
                            <div
                              onClick={() =>
                                addNewMedicine(index, searchQuery[index])
                              }
                              className={`px-4 py-2.5 cursor-pointer transition-colors border-b border-gray-100 last:border-0 ${
                                activeSuggestionIndex[index] ===
                                (suggestions[index]?.length || 0)
                                  ? "bg-blue-50 text-blue-700"
                                  : "hover:bg-blue-50 text-blue-600"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Plus size={16} />
                                <div>
                                  <div className="font-medium text-sm">
                                    Add "{searchQuery[index]}" as new medicine
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Will generate a unique 5-digit ID
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-1">
                    <input
                      type="text"
                      value={med.code}
                      onChange={(e) =>
                        handleInputChange(index, "code", e.target.value)
                      }
                      className="w-full p-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 bg-gray-50"
                      placeholder="Code"
                      readOnly
                    />
                  </td>

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
                      required
                    />
                  </td>

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
                      required
                    />
                  </td>

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
                      required
                    />
                  </td>

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

                  <td className="p-1 text-right font-black">
                    ৳ {med.totalBuy.toLocaleString()}
                  </td>

                  <td className="p-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between flex-wrap gap-4">
          <div>
            <button
              type="button"
              onClick={addMoreRow}
              className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-2xl font-bold cursor-pointer hover:bg-green-100 transition-colors"
            >
              <Plus size={20} /> Add New Medicine
            </button>
          </div>

          <div className="w-96 p-6 bg-gray-50 rounded-3xl space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Sub Total</span>
              <span className="font-bold">৳ {totals.subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Commission</span>
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                className="w-24 text-right border rounded-lg px-2 py-1 outline-none focus:border-green-500"
              />
            </div>

            <div className="flex justify-between font-black text-lg pt-2 border-t border-gray-200">
              <span>Grand Total</span>
              <span>৳ {totals.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-16 py-4 bg-[#053528] text-white rounded-2xl font-black flex gap-5 justify-center items-center hover:bg-[#0a4a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Send size={20} /> Save Inventory
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;
