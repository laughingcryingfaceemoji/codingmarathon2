const Job = require('../models/jobModel');

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const limit = parseInt(req.query._limit);
        const query = Job.find({}).sort({ createdAt: -1 });
        const jobs = Number.isFinite(limit) ? await query.limit(limit) : await query;
        res.json(jobs);
    } catch (err) {
        console.error('Get all jobs error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.error('Get job error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        console.error('Create job error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing job
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.error('Update job error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Delete job error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
