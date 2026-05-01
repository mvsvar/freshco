"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Package, ShoppingBag } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex gap-4 border-b border-sand mb-8 pb-4">
        <button 
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition-colors ${activeTab === "products" ? "bg-ocean text-white" : "text-ocean hover:bg-sand/30"}`}
        >
          <Package size={20} /> Products
        </button>
        <button 
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition-colors ${activeTab === "orders" ? "bg-ocean text-white" : "text-ocean hover:bg-sand/30"}`}
        >
          <ShoppingBag size={20} /> Orders
        </button>
      </div>

      {activeTab === "products" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-ocean">Inventory Management</h2>
            <button className="bg-gold text-ocean px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-gold-light transition-colors">
              <Plus size={18} /> Add Product
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-sand/50 overflow-hidden">
            {loading ? (
              <div className="p-12 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-ocean text-white">
                    <tr>
                      <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase">Product</th>
                      <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase">Category</th>
                      <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase">Price</th>
                      <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand/50">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-sand/10 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                            <span className="font-medium text-ocean">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-ocean/80">{product.category}</td>
                        <td className="px-6 py-4 font-bold text-ocean">₹{product.price}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-ocean hover:text-gold mr-3 p-2 transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-ocean/60">
                          No products found. Add your first product!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h2 className="font-serif text-2xl font-bold text-ocean mb-6">Recent Orders</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-12 text-center text-ocean/60">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
            <p>No orders yet. They will appear here once customers start checking out.</p>
          </div>
        </div>
      )}
    </div>
  );
}
