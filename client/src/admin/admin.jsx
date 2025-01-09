import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

import axios from 'axios';
import {
    Alert,
    Snackbar,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const AdminPropertyManager = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const navigate = useNavigate();

    // State variables
    const [properties, setProperties] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formMode, setFormMode] = useState("add");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        description: "",
        size: "",
        images: []  // Changed to an array to hold multiple images
    });
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const axiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true, // Add this line
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('jwtCookie')}` // Add this line

        }
    });

    // 'Authorization': `Bearer ${Cookies.get('jwtCookie')}` // Add this line



    // Fetch properties
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/api/property');
                setProperties(response.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            let propertyData = { ...formData };

            // Handle images
            if (Array.isArray(formData.images)) {
                const processedImages = [];

                let index = 1;
                const uniqueId = uuidv4(); // Generate a unique ID for each upload


                for (let image of formData.images) {
                    // If it's a File object, upload it
                    if (image instanceof File) {
                        const reader = new FileReader();
                        const imageData = await new Promise((resolve, reject) => {
                            reader.onloadend = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(image);
                        });

                        try {
                            let uniquePublicId = `${uniqueId}-${index++}`;
                            const uploadResponse = await axiosInstance.post(`/api/property/upload/${uniquePublicId}`, {
                                data: imageData
                            });
                            processedImages.push(uploadResponse.data.url);
                        } catch (uploadError) {
                            console.error('Upload error:', uploadError);
                            throw new Error('Failed to upload image');
                        }
                    } else {
                        // If it's already a URL, keep it
                        processedImages.push(image);
                    }
                }

                propertyData.images = processedImages;
                console.log('propertyData', propertyData);
            }

            if (formMode === "add") {
                await axiosInstance.post(`/api/property/create`, propertyData);
            } else {

                await axiosInstance.put(`/api/property/${selectedPropertyId}`, propertyData);
            }

            // Refresh properties list
            const response = await axiosInstance.get('/api/property');
            setProperties(response.data);

            setOpenDialog(false);
            setFormData({
                title: "",
                location: "",
                price: "",
                description: "",
                size: "",
                images: []
            });
        } catch (error) {
            console.error('Error saving property:', error);
            setError(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };


    // Frontend - Add a delete handler
    const handleDelete = async (propertyId) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        try {
            setLoading(true);
            await axiosInstance.delete(`/api/property/${propertyId}`);

            // Refresh properties list after deletion
            const response = await axiosInstance.get('/api/property');
            setProperties(response.data);

            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting property:', error);
            setError(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };



    const handleOpenDialog = (property) => {
        if (property) {
            setFormMode("edit");
            setFormData({
                title: property.title || "",
                location: property.location || "",
                price: property.price || "",
                description: property.description || "",
                size: property.size || "",
                images: property.images || []
            });
            setSelectedPropertyId(property._id); // Here's where the ID gets set
        } else {
            setFormMode("add");
            setFormData({
                title: "",
                location: "",
                price: "",
                description: "",
                size: "",
                images: []
            });
            setSelectedPropertyId(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({ title: "", location: "", price: "", description: "", size: "", images: [] });
        setError(null);
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleNavigateToDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <Container>
            <div className="flex justify-end mb-4">

                <Button
                    className="text-white text-xl bg-[#6465f1] hover:bg-[#5051c9] dark:bg-gray-800 dark:hover:bg-gray-700"
                    variant="contained"
                    onClick={() => handleOpenDialog(null)}
                >
                    Add Property
                </Button>
            </div>
            {loading && <CircularProgress style={{ margin: "20px" }} />}
            <TableContainer component={Paper} style={{ marginTop: "20px", borderRadius: "8px", boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Table style={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={headerCellStyle}>Title</TableCell>
                            <TableCell style={headerCellStyle}>Location</TableCell>
                            <TableCell style={headerCellStyle}>Price</TableCell>
                            <TableCell style={headerCellStyle}>Size</TableCell>
                            <TableCell style={headerCellStyle}>Description</TableCell>
                            <TableCell style={headerCellStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property, index) => (
                            <TableRow
                                key={property._id}
                                style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}
                                hover
                            >
                                <TableCell>{property.title}</TableCell>
                                <TableCell>{property.location}</TableCell>
                                <TableCell>{property.price}</TableCell>
                                <TableCell>{property.size}</TableCell>
                                <TableCell>{property.description}</TableCell>

                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleNavigateToDetails(property._id)}
                                        disabled={loading}
                                        style={actionButtonStyle}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenDialog(property)}
                                        disabled={loading}
                                        style={{ ...actionButtonStyle, marginLeft: "10px" }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(property._id)}
                                        style={{ ...actionButtonStyle, marginLeft: "10px" }}
                                        disabled={loading}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{formMode === 'add' ? 'Add Property' : 'Edit Property'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        type="number"
                    />
                    <TextField
                        label="Size"
                        name="size"
                        value={formData.size}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        style={{ marginTop: '1rem' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
};

// Styles
const headerCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#6465f1',
    color: '#fff',
    padding: '16px 20px',
    textAlign: 'center',
    fontSize: '16px'
};

const rowStyleEven = {
    backgroundColor: '#f5f5f5',
    '&:hover': {
        backgroundColor: '#e3e3e3'
    }
};

const rowStyleOdd = {
    backgroundColor: '#fff',
    '&:hover': {
        backgroundColor: '#e3e3e3'
    }
};

const actionButtonStyle = {
    marginTop: '8px',
    padding: '6px 12px',
    borderRadius: '5px',
    textTransform: 'none',
};

export default AdminPropertyManager;
