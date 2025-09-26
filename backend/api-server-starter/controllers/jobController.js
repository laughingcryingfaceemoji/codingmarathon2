const Job = require('../models/jobModel');
const mongoose = require('mongoose');

// Get all jobs (Public)
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

// Get a single job by ID (Public)
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

// Create a new job (Protected - requires authentication)
exports.createJob = async (req, res) => {
    try {
        // Associate the job with the logged-in user
        const job = new Job({ ...req.body, user_id: req.user._id });
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        console.error('Create job error:', err.message);
        res.status(400).json({ message: 'Failed to create job', error: err.message });
    }
};

// Update an existing job (Protected - requires ownership)
exports.updateJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid job ID' });
    }

    try {
        const job = await Job.findOneAndUpdate(
            { _id: id, user_id: req.user._id }, // Ensure the user owns the job
            req.body, 
            { new: true, runValidators: true }
        );
        if (!job) {
            return res.status(404).json({ message: 'Job not found or user not authorized' });
        }
        res.json(job);
    } catch (err) {
        console.error('Update job error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a job (Protected - requires ownership)
exports.deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid job ID' });
    }

    try {
        const job = await Job.findOneAndDelete({ _id: id, user_id: req.user._id }); // Ensure the user owns the job
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found or user not authorized' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Delete job error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
