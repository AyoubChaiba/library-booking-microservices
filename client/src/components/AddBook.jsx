import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../store/ordersSlice';

const AddBook = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.orders);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', parseFloat(price));
        formData.append('image', imageFile);

        dispatch(addBook(formData));

        setTitle('');
        setAuthor('');
        setPrice('');
        setImage('');
        setImageFile(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImage(URL.createObjectURL(file));
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {image && <img src={image} alt="Book" className="mt-2 h-40 w-full object-cover" />}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default AddBook;
