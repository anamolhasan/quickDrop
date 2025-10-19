// 'use client';
// import { useState, useEffect } from 'react';
// import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaImage } from 'react-icons/fa';

// const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export default function OfferManagement() {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingOffer, setEditingOffer] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: '',
//     buttonText: 'Learn More',
//     buttonLink: '#',
//     expiresAt: ''
//   });

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/offers`);
//       const data = await response.json();
      
//       if (data.success) {
//         setOffers(data.offers.filter(offer => !offer.isDeleted));
//       }
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const url = editingOffer 
//         ? `${apiUrl}/api/offers/${editingOffer._id}`
//         : `${apiUrl}/api/offers`;
      
//       const method = editingOffer ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         alert(editingOffer ? 'Offer updated successfully!' : 'Offer created successfully!');
//         setShowForm(false);
//         setEditingOffer(null);
//         setFormData({
//           title: '',
//           description: '',
//           image: '',
//           buttonText: 'Learn More',
//           buttonLink: '#',
//           expiresAt: ''
//         });
//         fetchOffers();
//       } else {
//         alert(data.error || 'Something went wrong!');
//       }
//     } catch (error) {
//       console.error('Error saving offer:', error);
//       alert('Failed to save offer');
//     }
//   };

//   const handleEdit = (offer) => {
//     setEditingOffer(offer);
//     setFormData({
//       title: offer.title,
//       description: offer.description,
//       image: offer.image || '',
//       buttonText: offer.buttonText,
//       buttonLink: offer.buttonLink,
//       expiresAt: offer.expiresAt ? new Date(offer.expiresAt).toISOString().split('T')[0] : ''
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (offerId) => {
//     if (!confirm('Are you sure you want to delete this offer?')) return;
    
//     try {
//       const response = await fetch(`${apiUrl}/api/offers/${offerId}`, {
//         method: 'DELETE',
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         alert('Offer deleted successfully!');
//         fetchOffers();
//       } else {
//         alert(data.error || 'Failed to delete offer');
//       }
//     } catch (error) {
//       console.error('Error deleting offer:', error);
//       alert('Failed to delete offer');
//     }
//   };

//   const handleToggleStatus = async (offerId, currentStatus) => {
//     try {
//       const response = await fetch(`${apiUrl}/api/offers/${offerId}/toggle`, {
//         method: 'PATCH',
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         alert(`Offer ${data.isActive ? 'activated' : 'deactivated'} successfully!`);
//         fetchOffers();
//       } else {
//         alert(data.error || 'Failed to toggle offer status');
//       }
//     } catch (error) {
//       console.error('Error toggling offer status:', error);
//       alert('Failed to toggle offer status');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Offer Management</h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Create and manage special offers for your customers
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               setShowForm(true);
//               setEditingOffer(null);
//               setFormData({
//                 title: '',
//                 description: '',
//                 image: '',
//                 buttonText: 'Learn More',
//                 buttonLink: '#',
//                 expiresAt: ''
//               });
//             }}
//             className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
//           >
//             <FaPlus />
//             Create New Offer
//           </button>
//         </div>

//         {/* Offer Form Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//                 {editingOffer ? 'Edit Offer' : 'Create New Offer'}
//               </h2>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Offer Title *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="Enter offer title"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     required
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     rows="3"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="Enter offer description"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Image URL
//                   </label>
//                   <input
//                     type="url"
//                     value={formData.image}
//                     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Button Text
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.buttonText}
//                       onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
//                       placeholder="Learn More"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Button Link
//                     </label>
//                     <input
//                       type="url"
//                       value={formData.buttonLink}
//                       onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
//                       placeholder="https://example.com/offer"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Expiry Date (Optional)
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.expiresAt}
//                     onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="submit"
//                     className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
//                   >
//                     {editingOffer ? 'Update Offer' : 'Create Offer'}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowForm(false)}
//                     className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Offers Grid */}
//         {offers.length === 0 ? (
//           <div className="text-center py-12">
//             <FaImage className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
//               No offers created yet
//             </h3>
//             <p className="text-gray-400 dark:text-gray-500">
//               Create your first offer to show to customers
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {offers.map((offer) => (
//               <div
//                 key={offer._id}
//                 className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 ${
//                   offer.isActive ? 'border-yellow-500' : 'border-gray-200 dark:border-gray-700'
//                 } overflow-hidden`}
//               >
//                 {offer.image && (
//                   <img
//                     src={offer.image}
//                     alt={offer.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}
                
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       {offer.title}
//                     </h3>
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         offer.isActive
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                           : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//                       }`}
//                     >
//                       {offer.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </div>
                  
//                   <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
//                     {offer.description}
//                   </p>
                  
//                   {offer.expiresAt && (
//                     <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
//                       Expires: {new Date(offer.expiresAt).toLocaleDateString()}
//                     </p>
//                   )}
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleToggleStatus(offer._id, offer.isActive)}
//                       className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
//                         offer.isActive
//                           ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
//                           : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
//                       }`}
//                     >
//                       {offer.isActive ? <FaToggleOff /> : <FaToggleOn />}
//                       {offer.isActive ? 'Deactivate' : 'Activate'}
//                     </button>
                    
//                     <button
//                       onClick={() => handleEdit(offer)}
//                       className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 rounded"
//                     >
//                       <FaEdit />
//                       Edit
//                     </button>
                    
//                     <button
//                       onClick={() => handleDelete(offer._id)}
//                       className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 rounded"
//                     >
//                       <FaTrash />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }















'use client';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaImage, FaUpload } from 'react-icons/fa';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY || '8de64de6c9bb339ff0ca5f06730d46d9';

export default function OfferManagement() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    buttonText: 'Learn More',
    buttonLink: '#',
    expiresAt: ''
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/offers`);
      const data = await response.json();
      
      if (data.success) {
        setOffers(data.offers.filter(offer => !offer.isDeleted));
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  // IMGBB Image Upload Function
  const uploadImageToIMGBB = async (file) => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.data.url; // Return the direct image URL
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image to IMGBB:', error);
      alert('Image upload failed: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }

    const imageUrl = await uploadImageToIMGBB(file);
    if (imageUrl) {
      setFormData({ ...formData, image: imageUrl });
      alert('Image uploaded successfully!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingOffer 
        ? `${apiUrl}/api/offers/${editingOffer._id}`
        : `${apiUrl}/api/offers`;
      
      const method = editingOffer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(editingOffer ? 'Offer updated successfully!' : 'Offer created successfully!');
        setShowForm(false);
        setEditingOffer(null);
        setFormData({
          title: '',
          description: '',
          image: '',
          buttonText: 'Learn More',
          buttonLink: '#',
          expiresAt: ''
        });
        fetchOffers();
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Failed to save offer');
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      image: offer.image || '',
      buttonText: offer.buttonText,
      buttonLink: offer.buttonLink,
      expiresAt: offer.expiresAt ? new Date(offer.expiresAt).toISOString().split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (offerId) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/api/offers/${offerId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Offer deleted successfully!');
        fetchOffers();
      } else {
        alert(data.error || 'Failed to delete offer');
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Failed to delete offer');
    }
  };

  const handleToggleStatus = async (offerId, currentStatus) => {
    try {
      const response = await fetch(`${apiUrl}/api/offers/${offerId}/toggle`, {
        method: 'PATCH',
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`Offer ${data.isActive ? 'activated' : 'deactivated'} successfully!`);
        fetchOffers();
      } else {
        alert(data.error || 'Failed to toggle offer status');
      }
    } catch (error) {
      console.error('Error toggling offer status:', error);
      alert('Failed to toggle offer status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Offer Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage special offers for your customers
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingOffer(null);
              setFormData({
                title: '',
                description: '',
                image: '',
                buttonText: 'Learn More',
                buttonLink: '#',
                expiresAt: ''
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
          >
            <FaPlus />
            Create New Offer
          </button>
        </div>

        {/* Offer Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Offer Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter offer title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter offer description"
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Offer Image
                  </label>
                  
                  {/* Image Upload Button */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg cursor-pointer transition-colors w-fit">
                      <FaUpload />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports JPG, PNG, WebP (Max 10MB)
                    </p>
                  </div>

                  {/* Image URL Input (Manual) */}
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Or enter image URL directly"
                  />

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Learn More"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Link
                    </label>
                    <input
                      type="url"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                      placeholder="https://example.com/offer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold rounded-lg transition-colors"
                  >
                    {uploading ? 'Uploading...' : (editingOffer ? 'Update Offer' : 'Create Offer')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={uploading}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Offers Grid */}
        {offers.length === 0 ? (
          <div className="text-center py-12">
            <FaImage className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
              No offers created yet
            </h3>
            <p className="text-gray-400 dark:text-gray-500">
              Create your first offer to show to customers
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 ${
                  offer.isActive ? 'border-yellow-500' : 'border-gray-200 dark:border-gray-700'
                } overflow-hidden`}
              >
                {offer.image && (
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {offer.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        offer.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {offer.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {offer.description}
                  </p>
                  
                  {offer.expiresAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                      Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(offer._id, offer.isActive)}
                      className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
                        offer.isActive
                          ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {offer.isActive ? <FaToggleOff /> : <FaToggleOn />}
                      {offer.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(offer)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 rounded"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDelete(offer._id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 rounded"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}