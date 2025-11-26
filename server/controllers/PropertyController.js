// In-memory datastore
let properties = [];


const validation = (data) => {
    const { title, address, price } = data;
    if (!title || !address || price === undefined) {
        return "title, address, and price are required";
    }
    if (typeof price !== "number" || price <= 0) {
        return "price must be a positive number";
    }
    return null;
}

// Create a new property
exports.createProperty = (req, res) => {
    const {userId, userName, title, address, note, price} = req.body;

    // Validate required fields
    const error = validation({ title, address, price });
    if (error) {
        return res.status(400).json({ message: error });
    }

    const property = {
        id: properties.length + 1,
        userId,
        userName,
        title,
        price,
        address,
        note,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    properties.push(property);
    res.status(201).json(property);
};

// Get all properties
exports.getAllProperties = (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;
    let filtered = properties;


    // filter by status
    const {status} = req.query;
    if (status) {
        filtered = filtered.filter(p => p.status === status);
    }

    // slice by pagination
    // filtered = filtered.splice(offset, offset + limit)

    res.json(filtered);
};

// Get a property by ID
exports.getPropertyById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const property = properties.find(p => p.id === id);

    if (!property) {
        return res.status(404).json({message: "Property not found"});
    }

    res.json(property);
};

// Update a property
exports.updateProperty = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const property = properties.find(p => p.id === id);

    if (!property) {
        return res.status(404).json({message: "Property not found"});
    }

    const {userId, userName, address, note, title, price} = {...property, ...req.body};

    // Validate required fields
    const error = validation({ title, address, price });
    if (error) {
        return res.status(400).json({ message: error });
    }

    if (title) property.userId = title;
    if (price) property.userId = price;
    if (userId) property.userId = userId;
    if (userName) property.userName = userName;
    if (address) property.address = address;
    if (note) property.note = note;

    property.updatedAt = new Date();

    res.json(property);
};

// Delete a property
exports.deleteProperty = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = properties.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({message: "Property not found"});
    }

    const deletedProperty = properties.splice(index, 1)[0];

    res.json({
        message: "Property deleted",
        property: deletedProperty
    });
};
