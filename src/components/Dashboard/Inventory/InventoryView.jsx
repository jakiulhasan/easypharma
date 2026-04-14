import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Package,
  AlertCircle,
  X,
} from "lucide-react";
import { AuthContext } from "../../../context/auth/AuthContext";
import axios from "axios";

const API_BASE_URL = "http://localhost:4242/api";

const InventoryView = () => {
  const { user } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch all inventory items
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/all`);
      setInventory(response.data);
      setFilteredInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      alert("Failed to load inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter(
        (item) =>
          item.medicineName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.medicineId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredInventory(filtered);
    }
  }, [searchTerm, inventory]);

  // View medicine details
  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
    setEditMode(false);
  };

  // Edit medicine
  const handleEdit = (medicine) => {
    setEditData({ ...medicine });
    setEditMode(true);
    setShowModal(true);
  };

  // Update medicine
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/inventory/${editData._id}`,
        {
          quantity: editData.quantity,
          buyPrice: editData.buyPrice,
          sellPrice: editData.sellPrice,
          expiry: editData.expiry,
          location: editData.location,
          type: editData.type,
        },
      );

      if (response.data.success) {
        alert("Medicine updated successfully!");
        fetchInventory();
        setShowModal(false);
        setEditMode(false);
        setEditData(null);
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert("Failed to update medicine. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Delete medicine
  const handleDelete = async (id, medicineName) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${medicineName}" from inventory?`,
      )
    ) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/inventory/${id}`);
        if (response.data.success) {
          alert("Medicine deleted successfully!");
          fetchInventory();
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
        alert("Failed to delete medicine. Please try again.");
      }
    }
  };

  // Check if medicine is expired
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  // Check if medicine is near expiry (within 30 days)
  const isNearExpiry = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysDiff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("bn-BD");
  };

  // Calculate total stock value
  const totalStockValue = inventory.reduce(
    (sum, item) => sum + item.quantity * item.buyPrice,
    0,
  );

  // Total items count
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);

  // Unique medicine types
  const uniqueTypes = [...new Set(inventory.map((item) => item.type))];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mx-auto my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
          <Package
            className="bg-[#053528] text-white rounded-lg p-1.5"
            size={32}
          />
          Inventory Management
        </h2>

        <button
          onClick={fetchInventory}
          className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
          <div className="text-blue-600 text-sm font-semibold">Total Items</div>
          <div className="text-2xl font-bold text-blue-900">{totalItems}</div>
          <div className="text-xs text-blue-600 mt-1">Units in stock</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
          <div className="text-green-600 text-sm font-semibold">
            Stock Value
          </div>
          <div className="text-2xl font-bold text-green-900">
            ৳ {totalStockValue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">Total buy price</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
          <div className="text-purple-600 text-sm font-semibold">Products</div>
          <div className="text-2xl font-bold text-purple-900">
            {inventory.length}
          </div>
          <div className="text-xs text-purple-600 mt-1">
            Different medicines
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl">
          <div className="text-orange-600 text-sm font-semibold">
            Categories
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {uniqueTypes.length}
          </div>
          <div className="text-xs text-orange-600 mt-1">Medicine types</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by medicine name, code, type, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ring-green-500/20 outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Inventory Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredInventory.length === 0 ? (
        <div className="text-center py-20">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No medicines found in inventory</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-black text-gray-500 uppercase tracking-wider">
                <th className="p-4 w-16">SL</th>
                <th className="p-4">Medicine Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4 text-right">Buy Price</th>
                <th className="p-4 text-right">Sell Price</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInventory.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-xs font-bold text-gray-400">
                    {index + 1}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {item.medicineName}
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-mono">
                    {item.medicineId}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`font-bold ${
                        item.quantity < 10 ? "text-red-500" : "text-gray-800"
                      }`}
                    >
                      {item.quantity}
                    </span>
                  </td>
                  <td className="p-4 text-right">৳ {item.buyPrice}</td>
                  <td className="p-4 text-right">৳ {item.sellPrice}</td>
                  <td className="p-4">
                    {item.expiry ? (
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs font-medium ${
                            isExpired(item.expiry)
                              ? "text-red-500 line-through"
                              : isNearExpiry(item.expiry)
                                ? "text-orange-500"
                                : "text-gray-600"
                          }`}
                        >
                          {formatDate(item.expiry)}
                        </span>
                        {isExpired(item.expiry) && (
                          <AlertCircle size={14} className="text-red-500" />
                        )}
                        {isNearExpiry(item.expiry) &&
                          !isExpired(item.expiry) && (
                            <AlertCircle
                              size={14}
                              className="text-orange-500"
                            />
                          )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                      {item.location || "Not set"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        onClick={() => handleView(item)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(item._id, item.medicineName)
                        }
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editMode ? "Edit Medicine" : "Medicine Details"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setEditData(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {editMode ? (
                // Edit Form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      value={editData?.medicineName || ""}
                      disabled
                      className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Type
                      </label>
                      <select
                        value={editData?.type || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, type: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl"
                      >
                        <option value="Tablet">Tablet</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Injection">Injection</option>
                        <option value="Insulin">Insulin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={editData?.quantity || 0}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            quantity: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Buy Price (৳)
                      </label>
                      <input
                        type="number"
                        value={editData?.buyPrice || 0}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            buyPrice: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Sell Price (৳)
                      </label>
                      <input
                        type="number"
                        value={editData?.sellPrice || 0}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            sellPrice: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={editData?.expiry?.split("T")[0] || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, expiry: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editData?.location || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl"
                        placeholder="e.g., A1, B2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleUpdate}
                      disabled={updating}
                      className="flex-1 py-3 bg-[#053528] text-white rounded-xl font-semibold hover:bg-[#0a4a3a] disabled:opacity-50"
                    >
                      {updating ? "Updating..." : "Update Medicine"}
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditMode(false);
                      }}
                      className="px-6 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Details
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">
                        Medicine Name
                      </label>
                      <p className="font-semibold text-lg">
                        {selectedMedicine?.medicineName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">
                        Medicine Code
                      </label>
                      <p className="font-mono text-lg">
                        {selectedMedicine?.medicineId}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Type</label>
                      <p>
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm">
                          {selectedMedicine?.type}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Quantity</label>
                      <p
                        className={`text-xl font-bold ${
                          selectedMedicine?.quantity < 10
                            ? "text-red-500"
                            : "text-gray-800"
                        }`}
                      >
                        {selectedMedicine?.quantity} units
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Buy Price</label>
                      <p className="text-lg">৳ {selectedMedicine?.buyPrice}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">
                        Sell Price
                      </label>
                      <p className="text-lg">৳ {selectedMedicine?.sellPrice}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">
                        Expiry Date
                      </label>
                      <p
                        className={`flex items-center gap-2 ${
                          isExpired(selectedMedicine?.expiry)
                            ? "text-red-500 line-through"
                            : isNearExpiry(selectedMedicine?.expiry)
                              ? "text-orange-500"
                              : ""
                        }`}
                      >
                        {formatDate(selectedMedicine?.expiry)}
                        {isExpired(selectedMedicine?.expiry) && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                            Expired
                          </span>
                        )}
                        {isNearExpiry(selectedMedicine?.expiry) &&
                          !isExpired(selectedMedicine?.expiry) && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                              Near Expiry
                            </span>
                          )}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Location</label>
                      <p className="font-mono">
                        {selectedMedicine?.location || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Last Updated
                    </label>
                    <p className="text-sm">
                      {formatDate(selectedMedicine?.updatedAt)}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleEdit(selectedMedicine)}
                      className="w-full py-3 bg-[#053528] text-white rounded-xl font-semibold hover:bg-[#0a4a3a]"
                    >
                      Edit Medicine
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
