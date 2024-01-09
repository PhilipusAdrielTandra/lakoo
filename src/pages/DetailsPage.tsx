import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function DetailPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const fetchDataById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/products/${id}`); // Replace '/api/products' with your actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(response);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataById(id);
    }, [id])

    return (
        <div className='flex flex-col items-center justify-center '>
            {product && <>
                <table className='table-detail'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{product._id}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{product.description}</td>
                        </tr>
                        {/* <tr>
                            <th>Done</th>
                            <td>
                                {todo.done && <span style={{ color: 'transparent', textShadow: 'rgb(0, 128, 0) 0px 0px 0px' }}>&#10004;</span>}
                                {!todo.done && <span style={{ color: 'transparent', textShadow: 'rgb(232 81 24) 0px 0px 0px' }}>&#10006;</span>}
                            </td>
                        </tr> */}
                        <tr>
                            <th>Category</th>
                            <td>{product.category}</td>
                        </tr>
                        <tr>
                            <th>Brand</th>
                            <td>{product.brand}</td>
                        </tr>
                      
                    </tbody>
                </table>
                <div className='flex gap-1 mt-6'>
                    <Link to='/admin' className='min-w-[100px] py-3 btn btn-secondary'>Back</Link>
                </div>
            </>}
        </div>
    )
}