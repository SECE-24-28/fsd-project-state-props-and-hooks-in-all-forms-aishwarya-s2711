import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await api.get('/packages');
      setPackages(res.data.packages || res.data || []);
    } catch (err) {
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await api.delete(`/packages/${id}`);
      toast.success('Package deleted');
      fetchPackages();
    } catch (err) {
      toast.error('Failed to delete package');
    }
  };

  if (loading) return <div>Loading packages...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Tour Packages</h1>
        <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <FiPlus size={16} /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg._id} className="modern-card bg-white overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-44 w-full bg-slate-100">
                <img src={pkg.image || pkg.images?.[0] || 'https://via.placeholder.com/400x300'} alt={pkg.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 line-clamp-1">{pkg.title}</h3>
                <p className="text-xs text-slate-500">{pkg.destination}</p>
                <div className="mt-3 text-lg font-bold text-blue-600">${pkg.price}</div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 flex items-center gap-2">
              <button className="btn bg-blue-50 text-blue-600 text-xs py-2 flex-1 flex justify-center gap-1">
                <FiEdit size={12} /> Edit
              </button>
              <button onClick={() => handleDelete(pkg._id)} className="btn bg-rose-50 text-rose-600 hover:bg-rose-100 py-2 px-3 rounded-lg">
                <FiTrash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
