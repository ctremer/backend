const Job = require('../models/jobs');

module.exports.fetch = async (req, res) => {
  const allJobs = await Job.find({});
  res.send(allJobs);
};

module.exports.create = async (req, res) => {
  const newJob = await Job.create({ ...req.body });
  res.send(newJob);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const deletedJob = await Job.findByIdAndDelete({ _id: id });
  res.send(deletedJob);
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const jobData = req.body;

  // Remove empty fields from jobData
  Object.keys(jobData).forEach(key => {
    if (!jobData[key]) {
      delete jobData[key];
    }
  });

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, jobData, { new: true });
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
