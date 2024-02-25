const ScholarShip = require('../models/scholarship');

module.exports.fetch = async (req, res) => {
  const allScholarShips = await ScholarShip.find({});
  res.send(allScholarShips);
};

module.exports.create = async (req, res) => {
  const newScholarShip = await ScholarShip.create({ ...req.body });
  res.send(newScholarShip);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const deleteScholarShip = await ScholarShip.findByIdAndDelete({ _id: id });
  res.send(deleteScholarShip);
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const scholarshipData = req.body;

  // Remove empty fields from scholarshipData
  Object.keys(scholarshipData).forEach(key => {
    if (!scholarshipData[key]) {
      delete scholarshipData[key];
    }
  });

  try {
    const updatedScholarship = await ScholarShip.findByIdAndUpdate(id, scholarshipData, { new: true });
    res.json(updatedScholarship);
  } catch (error) {
    console.error('Error updating scholarship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
