import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { NumericFormat } from 'react-number-format';
import Select from 'react-select';

const UserProfile = () => {
  const userId = 'user_id_here'; // Replace with the actual user ID
  const [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({
    _id: '',
    address: '',
    number: '',
    firstname: '',
    lastname: '',
    city: '',
    state: '',
    zip: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from backend
    const fetchProfileData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            navigate('/');
            return;
          }
  
          const response = await fetch('http://localhost:8081/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const profileData = await response.json();
            console.log(profileData);
            setProfile(profileData);
            // Update the formData state with the fetched profile data
            setFormData({
                _id: profileData._id || '',
                address: profileData.address || '',
                number: profileData.number || '',
                firstname: profileData.firstname || '',
                lastname: profileData.lastname || '',
                city: profileData.city || '',
                state: profileData.state || '',
                zip: profileData.zip || '',
            });
        }
            else {
            // Handle errors
            console.error('Error fetching profile:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchProfileData()
  } , [navigate]);

  const provinceCity: {[key: string]: string[]} = {
    'Aceh': ['Banda Aceh', 'Langsa', 'Lhokseumawe','Sabang','Subulussalam'],
    'Bali': ['Denpasar'],
    'Bangka Belitung': ['Pangkalpinang'],
    'Banten': ['Cilegon','Serang','Tangerang Selatan','Tangerang'],
    'Bengkulu': ['Bengkulu'],
    'Daerah Istimewa Yogyakarta': ['Yogyakarta'],
    'Gorontalo': ['Gorontalo'],
    'Jakarta': ['Kota Administrasi Jakarta Barat','Kota Administrasi Jakarta Pusat','Kota Administrasi Jakarta Selatan','Kota Administrasi Jakarta Timur','Kota Administrasi Jakarta Utara'],
    'Jambi': ['Sungai Penuh','Jambi'],
    'Jawa Barat': ['Bandung','Bekasi','Bogor','Cimahi','Cirebon','Depok','Sukabumi','Tasikmalaya','Banjar'],
    'Jawa Tengah': ['Magelang', 'Pekalongan', 'Salatiga', 'Semarang', 'Surakarta', 'Tegal'],
    'Jawa Timur': ['Batu', 'Blitar', 'Kediri', 'Madiun', 'Malang', 'Mojokerto', 'Pasuruan', 'Probolinggo', 'Surabaya'],
    'Kalimantan Barat': ['Pontianak', 'Singkawang'],
    'Kalimantan Selatan': ['Banjarbaru', 'Banjarmasin'],
    'Kalimantan Tengah': ['Palangka Raya'],
    'Kalimantan Timur': ['Balikpapan', 'Bontang', 'Samarinda', 'Nusantara'],
    'Kalimantan Utara': ['Tarakan'],
    'Kepulauan Riau': ['Batam', 'Tanjungpinang'],
    'Lampung': ['Bandar Lampung', 'Metro'],
    'Maluku Utara': ['Ternate', 'Tidore Kepulauan'],
    'Maluku': ['Ambon', 'Tual'],
    'Nusa Tenggara Barat': ['Bima', 'Mataram'],
    'Nusa Tenggara Timur': ['Kupang'],
    'Papua Barat Daya': ['Sorong'],
    'Papua': ['Jayapura'],
    'Riau': ['Dumai', 'Pekanbaru'],
    'Sulawesi Selatan': ['Makassar', 'Palopo', 'Parepare'],
    'Sulawesi Tengah': ['Palu'],
    'Sulawesi Tenggara': ['Baubau', 'Kendari'],
    'Sulawesi Utara': ['Bitung', 'Kotamobagu', 'Manado', 'Tomohon'],
    'Sumatera Barat': ['Bukittinggi', 'Padang', 'Padang Panjang', 'Pariaman', 'Payakumbuh', 'Sawahlunto', 'Solok'],
    'Sumatera Selatan': ['Lubuklinggau', 'Pagar Alam', 'Palembang', 'Prabumulih'],
    'Sumatera Utara': ['Binjai', 'Gunungsitoli', 'Medan', 'Padangsidimpuan', 'Pematangsiantar', 'Sibolga', 'Tanjungbalai', 'Tebing Tinggi']
}

  const provinceOptions = Object.keys(provinceCity).map((provinceKey) => ({
      label: provinceKey,
      value: provinceKey,
  }));

  const cityOptions = formData.state && provinceCity[formData.state]
  ? provinceCity[formData.state].map((city) => ({
      label: city,
      value: city,
  }))
  : [];

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User updated successfully');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Internal Server Error');
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = (selectedOption: { label: string; value: string } | null) => {
      setFormData({
          ...formData,
          state: selectedOption?.value || '',
          city: '', // Reset city field when a new province is selected
      });
  };

  const handleCityChange = (selectedOption: { label: string; value: string } | null) => {
      setFormData({ ...formData, city: selectedOption?.value || '' });
  };

  // const handleSubmit = async (e: { preventDefault: () => void; }) => {
  //     e.preventDefault();

  // if (formData.password !== confirmPass) {
  //     alert("Passwords do not match.");
  //     return;
  // }

  // try {
  //   const response = await fetch('http://3.27.136.233:8081/users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await response.json();

  //   if (data.success) {
  //     console.log('Registration successful:', data);
  //     // Handle login success (e.g., store the token, redirect, etc.)
  //     alert("Registration successful. Please login to continue.");
  //     navigate('/');
  //   } else {
  //     console.error('Registration failed:', data.error)
  //     // Handle login failure
  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  //   // Handle network error
  // }
  // };

return (
  <>
    {/* BIG CONTAINER */}
    <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
    <div className="flex items-center justify-center h-screen ">
        <div className="mx-auto overflow-auto lg:max-w-screen-xl rounded-lg bg-white shadow-lg md:shadow-xl" style={{ height: '90%', width: '55%'}}>
            {/* TITLE */}
            <div className="flex min-h-full flex-1 flex-col px-6 py-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    className="mx-auto h-20 w-auto"
                    src="src/assets/images/logo_circle.png"
                    alt="Lakoo Logo"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Update Your Account
                    </h2>
                </div>

            <div>
                <form className="space-y-6" onSubmit={updateUser}>
                        <div>
                            <div className="flex items-center justify-between mt-4">
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            </div>
                            <div className="mt-2">
                            <input
                                id="firstname"
                                name="firstname"
                                type="firstname"
                                autoComplete="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                // onChange={(e) => setFirstName(e.target.value)}
                                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mt-4">
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="lastname"
                                    autoComplete="lastname"
                                    required
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    // onChange={(e) => setLastName(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
            
                        <div>
                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>

                            <div className="mt-2 flex">
                                <NumericFormat 
                                    value={formData.number}
                                    prefix="+62" 
                                    type="tel"
                                    maxLength={14}
                                    onValueChange={() => handleChange}
                                    required
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {/* <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    pattern="^(?:\\+62\\d{8,12})|(?:0\\d{8,12})$"
                                    maxLength={13}
                                    autoComplete="number"
                                    required
                                    value={formData.number}
                                    onChange={handleChange}
                                    // onChange={(e) => setNumber(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                /> */}
                            </div>
                        </div>
        
                        <div>
                            <div className="flex items-center justify-between mt-4">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street Address
                                </label>
                            </div>
                            
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="address"
                                    autoComplete="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    // onChange={(e) => setAddress(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mt-4">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                State/Province
                            </label>
                            </div>
                            <div className="mt-1.5">
                            <Select
                                id="state"
                                name="state"
                                options={provinceOptions}
                                value={provinceOptions.find((option) => option.value === formData.state)}
                                onChange={handleProvinceChange}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />

                            {/* <input
                                id="state"
                                name="state"
                                type="state"
                                autoComplete="state"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                // onChange={(e) => setState(e.target.value)}
                                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            /> */}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mt-4">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            </div>
                            <div className="mt-1.5">
                            <Select
                                id="city"
                                name="city"
                                options={cityOptions}
                                value={cityOptions.find((option) => option.value === formData.city) || null}
                                onChange={handleCityChange}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                                {/* <input
                                    id="city"
                                    name="city"
                                    type="city"
                                    autoComplete="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    // onChange={(e) => setCity(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                /> */}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mt-4">
                            <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP/Postal Code
                            </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="zip"
                                    name="zip"
                                    type="text"
                                    pattern="[0-9]*"
                                    maxLength={5}
                                    autoComplete="zip"
                                    placeholder="Must contain only 5 numbers, e.g. 12403"
                                    required
                                    value={formData.zip}
                                    onChange={handleChange}
                                    // onChange={(e) => setZip(e.target.value)}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    
                    <div className="flex justify-center">
                        <button
                        className="flex justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        style={{ width: '100%'}}
                        type="submit"
                        >
                        Update Account
                        </button>
                    </div>
                </form>
    
                <p className="mt-5 text-center text-sm text-black">
                Changed your mind?{' '}
                <a href="/form" className="font-semibold leading-6 text-red-700 hover:text-red-900 hover:underline">
                    Go back.
                </a>
                </p>
            </div>
            </div>
            </div>
            </div>
        </div>
  </>
  );
};

export default UserProfile;