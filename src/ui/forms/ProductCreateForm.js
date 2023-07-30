import React from 'react';
import Select from 'react-select'

const ProductCreateForm = ({
                               handleSubmit,
                               setValues,

                               handleChange,
                               handleCategoryChange,
                               values,
                               showSub,
                               loading,
                               subOptions,
                               setSubOptions,
                               selectedSub,
                               setSelectedSub
                           }) => {
    const {
        title,
        description,
        price,
        type,
        categories,
        shipping,
        category,
        subs,
        quantity,
        images,
        unit,
        brand
    } = values


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Title</label>
                <input
                    type="text"
                    name='title'
                    className="form-control"
                    value={title}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Description</label>
                <textarea rows={5}
                          name='description'
                          className="form-control"
                          value={description}
                          onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label>Type/Species</label>
                <input
                    type="text"
                    name='type'
                    className="form-control"
                    value={type}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number"
                    name='price'
                    className="form-control"
                    value={price}
                    onChange={handleChange}/>
            </div>


            <div className="mb-3">
                <label>Shipping</label>
                <select className="form-select "
                        name='shipping' onChange={handleChange} value={shipping}>
                    <option>Please select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="mb-3">
                <label>Quantity</label>
                <input
                    type="number"
                    name='quantity'
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Unit of Measurement</label>
                <select
                    className="form-select"
                    name="unit"
                    value={unit}
                    onChange={handleChange}
                >
                    <option value="">Please select</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="g">Gram (g)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="l">Liter (l)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="pcs">Pieces (pcs)</option>
                    {/* Add more units as needed */}
                </select>
            </div>


            <div className="mb-3">
                <label>Brand</label>
                <input
                    type="test"
                    name='brand'
                    className="form-control"
                    value={brand}
                    onChange={handleChange}/>
            </div>


            <div className="mb-3">
                <label>Categories</label>
                <select className="form-select mb-3 mt-3" name='category' onChange={handleCategoryChange}>
                    <option>Please select</option>
                    {categories.length > 0 && categories.map(category => {
                        return <option value={category._id} key={category._id}>{category.name}</option>
                    })}
                </select>
            </div>

            {showSub && category && subOptions.length > 0 && (
                <div className="mb-3">
                    <label>Sub Categories</label>
                    <Select
                        isMulti
                        name="subs"
                        value={selectedSub}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option._id}
                        options={subOptions}
                        onChange={(opt) => setSelectedSub(opt)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
            )
            }


            <div className="mb-3">
                <button type="submit" className="btn btn-outline-info">{loading ?
                    <div className="spinner-border small" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : 'Save'}</button>
            </div>

        </form>
    );
};

export default ProductCreateForm;